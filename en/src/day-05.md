# Day 5: Logic Gates to CPUs
## How Billions of Dumb Switches Learn to Think

Yesterday we traced Moore's Law — the exponential engine that crammed ever more transistors onto chips. But here's the thing nobody tells you: a transistor, by itself, is profoundly stupid. It's a switch. On or off. A light switch in your hallway has the same computational power as a single transistor. Zero.

The magic happens when you *connect* them. And the story of how a few transistors wired together can add numbers, remember things, and eventually run the software you're reading this on — that's one of the most beautiful intellectual constructions in human history. It's also surprisingly simple once you see it.

## From Switches to Logic: The Gate That Eats the World

Let's start with the most important circuit in computing: the NAND gate.

Take two PMOS transistors and wire them in parallel between the power supply (V_DD) and an output node. Then take two NMOS transistors and wire them in *series* between that same output node and ground. Feed one input signal to the gates of one PMOS and one NMOS pair, and the second input to the other pair. What you get is a circuit where the output is LOW (logic 0) *only* when both inputs are HIGH (logic 1). Every other combination of inputs gives you a HIGH output.

That's NAND — "NOT AND." And here's the mind-bending fact: **NAND alone is sufficient to build any digital computation that has ever been conceived or ever will be.** Every CPU, every GPU, every neural network accelerator, every digital watch — you could build all of them using nothing but NAND gates. Mathematicians call this property "functional completeness," and it was proven by Henry Sheffer in 1913, decades before anyone built an electronic computer.

Why NAND and not AND? Because CMOS transistors are naturally inverting. When you build the simplest possible CMOS circuit — one PMOS and one NMOS transistor with their gates tied together — you get an inverter (NOT gate). The output is always the opposite of the input. Building a non-inverting buffer actually takes *more* transistors. So NAND (which includes the inversion) costs just 4 transistors in CMOS, while AND costs 6 (a NAND followed by an inverter). In a world where transistors were once expensive and are still power-hungry, that 33% savings matters.

NOR gates are NAND's mirror twin — output goes LOW if *either* input is HIGH. Also functionally complete. Also 4 transistors in CMOS. In practice, NAND gates are slightly preferred in most process technologies because NMOS transistors (which drive the output low in a NAND) have about 2-3x the carrier mobility of PMOS transistors, making NAND gates inherently faster for the same silicon area. This is why flash memory is called "NAND flash" — its storage cells are wired in a NAND configuration.

## Building Up: From Gates to Arithmetic

Now let's do something useful. Let's add two one-bit numbers.

If you add 0+0 you get 0. If you add 0+1 or 1+0 you get 1. If you add 1+1 you get... 10 in binary. That's a sum bit of 0 and a carry bit of 1. Look closely: the sum bit is an XOR operation (output is 1 when inputs differ), and the carry bit is an AND operation (output is 1 only when both inputs are 1). This two-gate circuit is called a **half adder**, and you can build it from 5 NAND gates.

But half adders can't chain. When you're adding multi-bit numbers, each position needs to account for the carry coming in from the position below. A **full adder** takes three inputs (A, B, and carry-in) and produces a sum and carry-out. It takes about 9 NAND gates. Chain 64 of these together, and you have a 64-bit adder — the fundamental arithmetic unit inside every modern CPU.

There's a brutal problem though: the carry has to **ripple**. The full adder at bit position 63 can't produce its output until it gets the carry from position 62, which is waiting on position 61, and so on all the way down to position 0. In a naive "ripple carry" adder, the worst-case delay scales linearly with the bit width. For a 64-bit adder at modern clock speeds, that's unacceptable — it would consume the entire clock cycle just to add two numbers.

The solution, invented by John Sklansky and others in the 1960s, is the **carry-lookahead adder**. Instead of waiting for carries to ripple, it pre-computes them in parallel using "generate" and "propagate" signals. Position *i* generates a carry if both A_i and B_i are 1. It propagates an incoming carry if either A_i or B_i is 1. Using these signals, you can compute all 64 carry bits in O(log₂ n) gate delays instead of O(n). A 64-bit carry-lookahead adder settles in about 12 gate delays instead of 128. Modern CPUs use hybrid designs — Kogge-Stone adders, Brent-Kung adders, or Ling adders — that trade off between speed, area, and power in various clever ways. Intel's Alder Lake cores use adders that complete a 64-bit addition in a single clock cycle at 5+ GHz, meaning the carry computation finishes in roughly **200 picoseconds** — the time it takes light to travel 6 centimeters.

## Subtraction, Multiplication, and the Two's Complement Trick

Here's an elegant shortcut the hardware designers figured out early: you don't need a separate subtractor circuit. In **two's complement** representation (the universal standard for signed integers in modern hardware), you subtract B from A by flipping all the bits of B, adding 1, and then adding the result to A. That "flip and add 1" operation is trivially cheap in hardware — just XOR each bit of B with a control signal and set the carry-in of the adder to 1. So one adder circuit does both addition and subtraction, depending on a single mode bit.

Multiplication is harder. At its core, binary multiplication is just shifting and adding — the same algorithm you learned for decimal multiplication in grade school, but simpler because each digit is either 0 or 1. Multiply 1011 × 1101? That's (1011 × 1) + (1011 × 0, shifted left 1) + (1011 × 1, shifted left 2) + (1011 × 1, shifted left 3). Each partial product is either zero or a shifted copy of the multiplicand.

A naive multiplier for two 64-bit numbers would need 64 partial products and a massive tree of adders to sum them. Andrew Booth at Birkbeck College, London, invented **Booth encoding** in 1951, which reduces the number of partial products by encoding runs of ones more efficiently. Modern multipliers use **Wallace trees** or **Dadda trees** — carefully structured adder trees that compress partial products in parallel. A high-performance 64-bit multiplier in a modern CPU takes about 3 clock cycles and consumes several thousand gates. The multiplier block in Apple's M-series chips is wide enough to do two 64-bit multiplications per cycle per core.

## Memory from Logic: The Flip-Flop Revolution

Arithmetic is useful, but it's stateless — feed it inputs, get an output, done. For actual computation, you need **memory**: the ability to store a result and use it later. This is where one of the most beautiful tricks in digital design comes in.

Take two NAND gates. Connect the output of the first to one input of the second, and the output of the second to one input of the first. This cross-coupled pair creates a **bistable circuit** — it has two stable states and will stay in whichever one it's pushed into. This is the **SR latch** (Set-Reset latch), and it is the atom of digital memory. It remembers one bit.

The SR latch has a flaw: if you set and reset simultaneously, the output is undefined — a metastable disaster. The **D flip-flop** solves this by adding gating logic and an edge trigger. A D flip-flop captures whatever value is at its input (D) at the precise moment the clock signal transitions from low to high, and holds that value stable until the next clock edge. It typically takes 6 transistors in a transmission-gate design, though modern implementations use 8-12 transistors for better performance and noise immunity.

The D flip-flop is the heartbeat of synchronous digital design. Every register in your CPU, every pipeline stage boundary, every piece of temporary storage — they're all D flip-flops clocked by the same signal. An Apple M3 CPU core has roughly **10-15 million flip-flops**. When you hear that a chip runs at 4 GHz, what that means physically is that 4 billion times per second, every one of those millions of flip-flops simultaneously samples its input and locks it in.

## Registers, Counters, and State Machines

Group 64 flip-flops together and you have a **64-bit register** — a tiny high-speed scratchpad that stores one number. A modern x86 CPU has 16 general-purpose registers visible to the programmer (RAX through R15), but the actual physical register file is much larger: Intel's Golden Cove core (found in Alder Lake) has about **280 physical integer registers** and **332 floating-point/vector registers**. The extras are used for register renaming — a trick we'll explore in Day 16 when we dive into CPU architecture.

Connect a series of flip-flops with feedback, and you get a **counter** — a circuit that increments its value by 1 on each clock edge. The program counter inside your CPU is exactly this: a register that counts through memory addresses, fetching one instruction after another. When you execute a jump or branch instruction, you're just loading a new value into this counter.

Combine flip-flops with combinational logic (gates), and you can build a **finite state machine** (FSM) — a circuit that transitions between a defined set of states based on inputs and its current state. Traffic light controllers, elevator logic, USB protocol handlers, DRAM refresh controllers — these are all FSMs. The *control unit* inside a CPU is itself a massive FSM (or a collection of FSMs) that sequences through the steps of each instruction: fetch, decode, execute, write-back.

## The Big Leap: Programmability

Everything so far has been **fixed-function hardware**. An adder always adds. A counter always counts. The insight that transformed electronic circuits into *computers* came from John von Neumann (building on work by Alan Turing and the ENIAC team) in 1945: **store the instructions in the same memory as the data, and build a generic circuit that reads and executes them.**

This is the **stored-program concept**, and it's the dividing line between a calculator and a computer. A calculator has hardwired operations. A computer has a small set of primitive operations (add, subtract, load, store, compare, jump) and reads a sequence of coded instructions from memory that specify which operations to perform and on which data.

The hardware needed to execute a stored program is surprisingly modest:

1. **Program counter (PC):** A register that holds the memory address of the next instruction.
2. **Instruction register (IR):** A register that holds the current instruction being executed.
3. **Decoder:** Combinational logic that reads the instruction bits and figures out what operation to perform.
4. **ALU (Arithmetic Logic Unit):** The computational core — adders, shifters, comparators, and logic operations (AND, OR, XOR).
5. **Register file:** A small bank of fast storage for operands and results.
6. **Control unit:** The FSM that orchestrates everything — tells the ALU what to do, selects the right registers, manages memory reads and writes.

The original Intel 4004 (1971) had *exactly* these components, implemented in 2,300 transistors on a die measuring 12mm². It could do about 92,000 instructions per second. Fifty-five years later, an Apple M4 performance core — still fundamentally the same architecture pattern — executes roughly **6 billion instructions per second** per core, with 8 cores running simultaneously. Same concept, 400 million times faster.

## From One Instruction Per Cycle to Many: The Pipeline Insight

The simplest CPU design executes one instruction at a time: fetch, decode, execute, write-back, then start the next one. Each step takes one clock cycle, so one instruction takes 4 cycles. This is wasteful — while you're executing instruction N, the fetch unit sits idle.

The solution is **pipelining**, borrowed from factory assembly lines. While instruction N is in the execute stage, instruction N+1 is being decoded, and instruction N+2 is being fetched. Like a car factory where one car enters the paint shop while another enters the assembly shop — no station is ever idle.

The MIPS R2000 (1985), designed by John Hennessy at Stanford, was one of the first commercial CPUs with a clean 5-stage pipeline: Fetch, Decode, Execute, Memory, Write-back. It could sustain one instruction per clock cycle in the best case — a 5x improvement over the unpipelined design.

But pipelines introduce hazards. What if instruction N+1 needs the result of instruction N, which hasn't finished executing yet? That's a **data hazard**. What if instruction N is a conditional branch, and you don't know which instruction to fetch next until N finishes? That's a **control hazard**. These problems spawned an entire field of computer architecture research — forwarding, stalling, branch prediction, speculative execution — that we'll explore in detail on Day 16.

Modern high-performance CPUs take pipelining to extremes. Intel's Golden Cove microarchitecture has a pipeline roughly **20 stages deep** and can dispatch up to **6 instructions per clock cycle** simultaneously. ARM's Cortex-X4 has a pipeline of similar depth with up to 10-wide decode. These machines don't just pipeline — they find and exploit **instruction-level parallelism**, executing independent instructions out of order, speculatively executing down predicted branch paths, and fusing common instruction pairs into single operations. They're juggling hundreds of instructions in flight simultaneously, all while maintaining the *illusion* of executing them one at a time in program order.

## The Surprising Scale

Here's the part that should stop you in your tracks. Take a modern CPU — say, an AMD EPYC 9004 "Genoa" server processor. It has 96 cores, each containing hundreds of millions of gates. The entire chip contains **over 90 billion transistors**. Every single one of those transistors is a MOSFET — the same kind of device we studied on Day 1. Every logic gate is built from NAND, NOR, and inverter structures. Every flip-flop is a cross-coupled pair of gates. Every adder is a tree of full adders. Every pipeline register is a bank of flip-flops.

There is no magic middle layer. The gap between "a transistor is a switch" and "this chip runs Linux" is filled entirely by *composition* — simple things connected to make slightly less simple things, repeated up through dozens of abstraction layers until you reach a CPU.

This hierarchical composition is also why the semiconductor industry could ride Moore's Law so effectively. Shrinking transistors didn't just give you more switches — it gave you more flip-flops, more adder bits, wider pipelines, larger register files, bigger caches. The abstractions stacked, and each layer of the stack benefited from having more transistors to work with.

It's turtles all the way down. But they're NAND-gate turtles.

## Looking Ahead

We've gone from transistors to switches to logic gates to arithmetic to memory to programmable CPUs. Tomorrow, we'll confront the next layer of the semiconductor story: **process nodes**. When TSMC says "3nm" and Samsung says "3nm," what do those numbers actually mean? (Spoiler: they don't mean what you think. The marketing has almost completely decoupled from physical dimensions, and the real story is far more interesting — and more misleading — than a simple length measurement.)

---

<div id="quiz-container" data-quiz-path="quizzes/day-05.toml" style="margin-top: 2em;"></div>
