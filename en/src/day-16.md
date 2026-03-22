# Day 16: CPU Architecture — Pipelines, Caches, Branch Prediction, and Out-of-Order Execution

*How a chip executes billions of instructions per second by cheating the laws of physics with clever bookkeeping.*

---

Yesterday we traced a chip design from RTL code to GDSII tape-out — the journey from a designer's intent to a file that tells a fab where to place every transistor. Today we zoom into what those transistors actually *do* once they're built. Specifically, we're going to understand the architecture of a modern CPU core: the tricks, the illusions, and the breathtaking complexity that lets a processor like Apple's M4 execute over 300 billion operations per second while pretending to your software that it's running instructions one at a time, in order, like it's 1975.

This is the story of four interlocking ideas — pipelining, caches, branch prediction, and out-of-order execution — that collectively represent perhaps the greatest engineering sleight-of-hand in history.

## The Sequential Lie

Every CPU maintains a fiction. Your program thinks instructions execute one after another: fetch an instruction, decode it, execute it, write the result. Done. Next instruction. This is the *programmer's model*, and it's a beautiful abstraction. It's also catastrophically slow if taken literally.

Consider a single instruction — say, adding two numbers. On a modern processor at 3.5 GHz, one clock cycle is about 286 picoseconds. Light travels roughly 86 millimeters in that time. But executing even a simple ADD requires multiple steps: reading the instruction from memory, figuring out what it means, fetching the operand values from registers, performing the arithmetic, and writing the result back. If each step takes one cycle, you've spent five cycles on one instruction. At 3.5 GHz, that's a throughput of 700 million instructions per second — sounds impressive until you realize modern CPUs sustain 5-8 billion.

The gap between the naive approach and reality is filled by four decades of architectural innovation. Let's trace how each piece evolved.

## Pipelining: The Assembly Line Inside Your Chip

The first great insight came in the early 1980s, borrowed directly from Henry Ford. If building a car has 100 steps, you don't wait for one car to finish before starting the next — you set up 100 stations and move cars through them. At any moment, 100 cars are in various stages of completion. One rolls off the line every step, not every 100 steps.

CPU pipelining works identically. The classic RISC pipeline has five stages:

1. **Fetch** — Read the next instruction from memory
2. **Decode** — Figure out what operation it is and which registers it needs
3. **Execute** — Perform the arithmetic or logic operation
4. **Memory** — Access data memory if it's a load or store
5. **Writeback** — Write the result to the destination register

With a five-stage pipeline, five instructions are in-flight simultaneously. Once the pipeline is full, one instruction completes every cycle — a 5× throughput improvement over the naive model. The MIPS R2000 (1986) and Sun SPARC (1987) were early commercial chips built around this principle.

But real pipelines are much deeper. Intel's Pentium 4 "Prescott" (2004) pushed to 31 pipeline stages — a decision that became infamous. The logic was seductive: more stages means each stage does less work, which means you can clock higher. Prescott hit 3.8 GHz when competitors were at 2.2 GHz. But deeper pipelines have a dark side that we'll encounter shortly.

Modern designs have settled on a middle ground. Apple's Firestorm cores (M1/M2/M3/M4) use roughly 12-14 pipeline stages. AMD's Zen 5 uses about 19. Intel's recent P-cores run around 20-22. These numbers represent hard-won engineering wisdom about where the sweet spot lies.

The problem with pipelining is that instructions aren't independent. If instruction 2 needs the result of instruction 1, it can't proceed through the Execute stage until instruction 1 finishes writeback. This is a **data hazard**, and it stalls the pipeline — empty bubbles propagate through the machine like air in a fuel line.

Early solutions were simple: **forwarding** (also called bypassing) routes results directly from one stage's output to another stage's input, skipping the register file entirely. This eliminates many stalls but not all. For the rest, the CPU needs bigger guns.

## Caches: Hiding the Memory Wall

Here's a number that should shock you: a modern CPU core at 5 GHz executes a cycle every 200 picoseconds. Accessing main memory (DDR5 DRAM) takes about 60-80 nanoseconds. That's a ratio of roughly **300 to 1**. If the processor had to wait for main memory on every instruction fetch or data load, it would spend 99.7% of its time idle. The pipeline would be a beautifully engineered ghost town.

This is the **memory wall**, a term coined by Wm. Wulf and Sally McKee in 1995, and it's only gotten worse since. CPU speeds have improved ~10,000× since 1980. DRAM latency has improved maybe 10×. The gap is an abyss.

Caches bridge it. A cache is a small, fast memory built from SRAM (the same six-transistor cells we discussed in Day 5) that sits between the processor and main memory, storing recently accessed data on the bet that you'll need it again soon. This bet pays off astonishingly well because of two properties of real programs:

- **Temporal locality**: If you accessed address X, you'll probably access X again soon (think loop variables)
- **Spatial locality**: If you accessed X, you'll probably access X+1, X+2 soon (think arrays)

Modern CPUs use a **hierarchy** of caches, each level larger and slower:

| Level | Typical Size | Latency (cycles) | Technology |
|-------|-------------|-------------------|------------|
| L1 Instruction | 32-64 KB per core | 3-5 | SRAM, same clock as core |
| L1 Data | 32-64 KB per core | 3-5 | SRAM, same clock as core |
| L2 | 256 KB - 2 MB per core | 10-15 | SRAM, slightly slower |
| L3 | 16-256 MB shared | 30-50 | SRAM, ring/mesh interconnect |
| Main Memory | 16-128 GB | 150-300+ | DRAM, off-chip |

Apple's M4 dedicates 192 KB of L1 (128 KB instruction + 64 KB data) per performance core — the largest L1 instruction cache in any commercial CPU. This is a deliberate design trade-off: bigger L1 means fewer cache misses, which means fewer pipeline stalls, but it also means the cache takes more area and more power, and its access time might push from 3 cycles to 4 or 5.

AMD's Zen 4 (Ryzen 7000 series) introduced **3D V-Cache**: an extra 64 MB SRAM chiplet bonded directly on top of the CCD using TSMC's SoIC technology. This gives the L3 cache a total of 96 MB per CCD. In gaming workloads, where cache hit rates are critical, the Ryzen 7 5800X3D with V-Cache outperformed the much higher-clocked 5800X by 15-20%. More cache, not more frequency, was the winning move.

Cache **associativity** determines flexibility. A direct-mapped cache (1-way) is fast but fragile: two addresses that map to the same slot evict each other repeatedly (a **conflict miss**). A fully associative cache checks every slot but needs expensive comparison logic. Modern L1 caches are typically 8-way or 12-way set-associative — a compromise that keeps hit rates above 95% while maintaining single-cycle access.

The replacement policy — which line to evict when the cache is full — matters more than you'd think. Most caches approximate **LRU** (Least Recently Used), but true LRU for an 8-way cache requires tracking 8! = 40,320 orderings. Real implementations use pseudo-LRU (tree-based approximations) or **RRIP** (Re-Reference Interval Prediction), which AMD and Intel adopted after research papers showed it outperforms LRU on many workloads by 5-10%.

Here's the counterintuitive fact: **a larger cache can sometimes be slower overall.** If doubling L1 data cache from 32 KB to 64 KB increases access latency from 4 to 5 cycles, and your workload already had a 97% hit rate, those extra cycles on 97% of accesses cost more than you save from the improved hit rate. Cache design is a razor-thin optimization game where every parameter interacts with every other.

## Branch Prediction: Betting on the Future

Now we confront the deepest problem with pipelining. Consider this code:

```
if (x > 0) {
    y = x + 1;
} else {
    y = x - 1;
}
```

This compiles to a conditional branch instruction. When the processor fetches this branch, it's in pipeline stage 1. It won't know whether `x > 0` until stage 3 or 4 (Execute). But the pipeline needs to fetch *something* for the next cycle. What?

If you guess wrong, every instruction you fetched after the branch is garbage. You flush the pipeline and start over. On a 20-stage pipeline, that's 20 wasted cycles. Given that roughly **20% of all instructions are branches** (a remarkably stable statistic across workloads), even a 5% misprediction rate means you're flushing the pipeline once every 100 instructions — devastating for performance.

This is why Prescott's 31-stage pipeline was a disaster. The misprediction penalty was so severe that higher clock speeds couldn't compensate. Intel learned this lesson painfully and never went that deep again.

Modern branch predictors are marvels of pattern recognition, essentially tiny neural networks in hardware. Here's how they evolved:

**Bimodal predictors** (early 1990s) used a table of 2-bit saturating counters indexed by the branch address. Each counter tracks: strongly not taken, weakly not taken, weakly taken, strongly taken. Simple, but ~85-90% accurate.

**Two-level adaptive predictors** (1991, Yale Patt and Tse-Yu Yeh) observed that branches correlate with the *history of other branches*. If the last three branches went taken-taken-not-taken, that pattern predicts what this branch will do. Accuracy jumped to ~95%.

**TAGE (TAgged GEometric history length) predictors** (2006, André Seznec at INRIA) are the current state of the art, used in virtually every high-performance CPU. TAGE maintains multiple prediction tables indexed by different history lengths — 4 branches back, 8 back, 16 back, 64 back, 512 back — geometrically spaced. The predictor consults all tables and uses the one with the longest matching history. This elegantly captures both short and long patterns.

Apple's Firestorm and newer cores achieve branch prediction accuracy estimated at **99.5-99.8%** — meaning they mispredict roughly 2-5 branches per thousand. AMD's Zen 4 and Intel's Raptor Lake are in the **99.0-99.5%** range. That half-percent difference sounds tiny, but it translates to measurable IPC (Instructions Per Clock) advantages in real workloads.

The prediction must also handle **indirect branches** (where the target address itself is variable — common in virtual function calls and switch statements) and **return addresses** (predicted via a hardware **Return Address Stack**, or RAS, typically 16-64 entries deep). Getting any of these wrong triggers the same costly flush.

One dark consequence of branch prediction: **Spectre** (disclosed January 2018). Researchers Jann Horn (Google Project Zero) and Paul Kocher independently discovered that speculative execution — the CPU executing instructions past a mispredicted branch before realizing the mistake — leaves observable traces in the cache. An attacker can train the branch predictor to mispredict, causing the CPU to speculatively read secret data, which changes cache state, which the attacker can then measure. The fix required software patches, microcode updates, and new hardware barriers, collectively costing 2-8% performance depending on workload. Spectre proved that performance optimizations have security implications — a lesson the industry is still absorbing.

## Out-of-Order Execution: Controlled Chaos

The final piece is the most ambitious. Consider three instructions:

```
A: r1 = load [address1]    // might take 300 cycles if cache miss
B: r2 = r1 + 5             // depends on A
C: r3 = r4 * r6            // independent of A and B
```

An in-order processor executes A, then waits 300 cycles, then executes B, then C. An **out-of-order (OoO)** processor says: "A is waiting for memory. C doesn't depend on A. Let me execute C *now* while A's load is in flight." When A's data arrives, B executes. Total time: ~300 cycles instead of ~302. Scale this across billions of instructions and the gains are enormous.

The breakthrough architecture is Robert Tomasulo's algorithm, invented at IBM in 1967 for the System/360 Model 91. Modern implementations are vastly more complex, but the core ideas remain:

**Renaming registers.** The CPU's instruction set might specify 16 or 32 architectural registers, but the physical register file has far more — Apple's M4 performance cores are estimated to have **300+ physical registers**. The processor *renames* architectural registers to physical ones, eliminating false dependencies. If instruction X writes to register r1, and later instruction Y also writes to r1, they don't actually conflict — X writes to physical register p47, Y writes to p112. Now they can execute in parallel.

**The Reorder Buffer (ROB).** Instructions enter the ROB in program order and can execute out of order, but they **retire** (commit their results) in order. This preserves the illusion of sequential execution. If a mispredicted branch is detected, everything after it in the ROB is simply discarded. Intel's Golden Cove (Alder Lake P-cores) has a ROB of 512 entries. Apple's Firestorm has approximately 630. AMD's Zen 4 has 320.

**Reservation stations / Scheduling.** Instructions wait in scheduling queues until their operands are ready. When the data arrives (via forwarding), the scheduler dispatches them to execution units. A modern core might have 6-10 execution ports: two integer ALUs, two floating-point/SIMD units, two load ports, one store port, a branch unit. The scheduler's job is to keep all of these busy simultaneously.

The width of the machine — how many instructions it can process per cycle — is a critical metric. Modern high-performance cores are **6-wide** (AMD Zen 4, Intel Golden Cove) or **8-wide** (Apple Firestorm) at decode, meaning they can crack open 6-8 instructions every single cycle and send them into the OoO engine. Apple's M4 performance cores reportedly push to **10-wide decode**, the widest in any commercial CPU. Sustaining that width requires massive buffers, wide register files, and a branch predictor accurate enough to keep the pipeline full.

The total "in-flight" instruction window — instructions the CPU is juggling simultaneously — can reach **600-700 instructions** in Apple's designs. Imagine a juggler keeping 700 balls in the air, each one dependent on specific others, and you begin to appreciate what the control logic is doing at 3+ GHz.

## How It All Fits Together

Let's trace what actually happens when your code runs:

1. The **branch predictor** guesses the next 20-30 instructions worth of control flow
2. The **fetch unit** reads those instructions from the **L1 instruction cache** (hopefully hitting)
3. The **decoder** cracks 6-10 instructions per cycle into micro-operations (µops)
4. The **register renamer** eliminates false dependencies by mapping to physical registers
5. The **reorder buffer** assigns each µop a slot in program order
6. **Reservation stations** hold µops until their operands are ready
7. The **scheduler** dispatches ready µops to execution units — out of order
8. Results are written to physical registers and forwarded to waiting µops
9. The **ROB** retires completed µops in order, updating architectural state
10. If a branch misprediction is detected, everything after it is flushed and we restart from step 1

All of this happens **billions of times per second**, orchestrated by control logic that itself comprises hundreds of millions of transistors. The execution units that do actual arithmetic are a small fraction of a modern core's transistor budget — perhaps 5-10%. The rest is prediction, scheduling, buffering, and bookkeeping. The CPU is less a calculator and more an elaborate logistics operation that occasionally does math.

## The Width vs. Frequency Trade-Off

This brings us to a fundamental architectural tension. You can get more performance by:

1. **Clocking higher** — more cycles per second (but power scales as frequency cubed due to dynamic power, and deeper pipelines increase misprediction penalties)
2. **Going wider** — more instructions per cycle (but complexity scales roughly quadratically with width, because every new instruction must check dependencies against every other in-flight instruction)

Intel historically favored frequency (Pentium 4 hit 3.8 GHz in 2004). Apple favors width (Firestorm is 8-10 wide but clocks at "only" 3.5-4.5 GHz). AMD's Zen splits the difference. Each approach has merits depending on the workload and power budget.

Apple's advantage is partly manufacturing: TSMC's N3E process at 3nm gives them the transistor budget to build enormously wide cores with huge caches and massive buffers. When your phone isn't thermally constrained (brief bursts), that width delivers stunning single-thread performance. Apple's M4 matches or beats desktop x86 cores on many benchmarks while consuming a fraction of the power — precisely because width is more power-efficient than frequency at the margin.

## The Numbers That Matter

Let's put concrete numbers to a modern flagship core — AMD's Zen 5 (Ryzen 9000 series, 2024):

- **Decode width:** 6 µops/cycle (2 pipelines of 4, fused)
- **ROB size:** 448 entries
- **Physical registers:** ~224 integer, ~192 FP/vector
- **L1I cache:** 32 KB, 8-way
- **L1D cache:** 48 KB, 12-way
- **L2 cache:** 1 MB per core, 16-way
- **L3 cache:** 32 MB per CCD (8 cores)
- **Branch prediction:** TAGE-based, 96%+ accuracy (improved in Zen 5)
- **Execution ports:** 6 (2 ALU + 2 AGU + 2 FP/SIMD, simplified)
- **Clock speed:** Up to 5.7 GHz boost
- **IPC improvement over Zen 4:** ~16%

That 16% IPC gain comes not from any single change but from dozens of small improvements: wider windows, better prediction, faster cache access, improved prefetching. Modern CPU architecture is the art of diminishing returns — each generation fights for 10-20% because the easy gains were captured decades ago.

## Looking Ahead

Tomorrow we leave the realm of sequential processing entirely and ask: what if instead of making one core really fast, you made *thousands* of simpler cores? That's the GPU architecture story — why NVIDIA's H100 has 16,896 CUDA cores, why they're individually much weaker than a CPU core, and why for certain workloads (graphics, AI, scientific computing), this massively parallel approach isn't just faster but *fundamentally more efficient*. The answer lies in the difference between latency-optimized and throughput-optimized design — and it will change how you think about computation itself.

---

<div style="margin-top: 2em; padding: 1.5em; border: 2px solid #4a9eff; border-radius: 8px; background: #f0f7ff;">

## 📝 Quiz Time

Test your understanding of CPU architecture with today's quiz:

<a href="quizzes/day-16.toml" class="quiz-embed">Start Quiz</a>

</div>
