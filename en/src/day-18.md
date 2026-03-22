# Day 18: Memory Hierarchy — SRAM, DRAM, HBM, and the Bandwidth Wall

*The fastest processor ever built is useless if it can't get data fast enough. Welcome to the real bottleneck of modern computing.*

---

## The Dirty Secret of Computing

Here's a fact that should bother you: a modern CPU can execute roughly 200 billion operations per second. But main memory can only deliver about 50 billion bytes per second. Do the math and you'll see the problem — the processor can *think* about four times faster than memory can *feed* it. This mismatch, called the **memory wall**, has been the dominant constraint in computer architecture for over three decades, and it's getting worse every year.

In 1980, processor cycle times and DRAM access times were roughly matched — both around 100 nanoseconds. By 2025, processors operate at sub-nanosecond cycle times while DRAM still needs 50-70 nanoseconds to deliver a single random access. That's a gap of roughly 200:1, papered over by one of the most elegant hacks in all of engineering: the **memory hierarchy**.

Understanding this hierarchy isn't just academic. It's the reason your M4 MacBook feels snappy. It's why NVIDIA's H100 costs $30,000 and has 80GB of memory stacked *on top* of the chip. It's why AMD added a second die of nothing but cache to their gaming processors. Every major architectural decision in modern computing — from data center GPUs to smartphone SoCs — is fundamentally a negotiation with the memory wall.

## SRAM: The Gold Standard You Can't Afford

At the top of the hierarchy sits **Static Random-Access Memory (SRAM)**, and it earns its throne through raw speed. An SRAM cell can be read in under 1 nanosecond — literally the time it takes light to travel 30 centimeters. It holds its data as long as power is applied, with no need for refresh. It's the closest thing we have to memory that operates at processor speed.

The catch? An SRAM cell requires **six transistors** (the classic 6T cell). Compare that to a DRAM cell, which needs just one transistor and one capacitor. This means SRAM consumes roughly 50× more silicon area per bit than DRAM. At TSMC's N3 process, an SRAM bitcell measures about 0.0199 µm² — extraordinarily small in absolute terms, but enormous relative to what DRAM achieves. You simply cannot build gigabytes of SRAM at any reasonable cost.

This is why SRAM lives *on the processor die itself* as cache memory, arranged in layers:

- **L1 cache**: 32-80 KB per core, accessed in 3-5 clock cycles (~1-2 ns). Split into instruction cache (L1i) and data cache (L1d). This is the processor's scratch pad — absurdly fast but tiny.
- **L2 cache**: 256 KB to 2 MB per core, accessed in 10-15 cycles (~4-7 ns). Acts as a staging area, large enough to hold the working set of most inner loops.
- **L3 cache**: 16-96 MB shared across all cores, accessed in 30-50 cycles (~10-20 ns). The last line of defense before you have to go off-chip to DRAM.

The real genius of caching is that it exploits **temporal locality** (data accessed recently will likely be accessed again) and **spatial locality** (data near recently accessed data will likely be needed too). These aren't assumptions — they're empirically measured properties of virtually every program humans write. When a cache fetches a **64-byte cache line** (the standard unit on x86), it's betting that you'll want the neighboring bytes too. That bet pays off over 90% of the time.

### The V-Cache Revolution

AMD did something audacious with their **3D V-Cache** technology. Starting with the Ryzen 7 5800X3D in 2022, they bonded an additional 64 MB SRAM die *on top of* the existing CCD (Core Complex Die) using **hybrid bonding** — the same copper-to-copper direct bonding technique we discussed in Day 13's packaging lesson. The result: 96 MB of total L3 cache per CCD, triple the original amount.

The performance impact was startling. In gaming workloads — which are notoriously cache-sensitive because game engines chase pointers through complex scene graphs — the 5800X3D matched or beat Intel's i9-12900KS despite having fewer cores and lower clock speeds. AMD proved that for many workloads, **more cache beats more frequency**.

The latest Ryzen 9 9950X3D pushes this to 144 MB of L3 per CCD. Intel has responded with their own version — "Adamantine" L4 cache — in server parts. The cache arms race is real, and it's driven entirely by the memory wall.

But even 144 MB is a rounding error compared to the gigabytes an application needs. Eventually, you have to leave the chip.

## DRAM: The Vast, Slow Warehouse

If SRAM is a workbench where you keep your most-used tools, DRAM is the warehouse across town. **Dynamic Random-Access Memory** stores each bit as a charge on a tiny capacitor — roughly 20-30 femtofarads in modern processes. That's about 125,000 electrons when charged. This minimalism (one transistor, one capacitor per bit) is why DRAM achieves densities of 8-16 Gb per die, orders of magnitude beyond SRAM.

The "dynamic" in the name is the catch: those capacitors leak. A charged DRAM cell loses enough electrons through junction leakage and subthreshold currents that it becomes unreadable within about **64 milliseconds**. Every DRAM cell must be read and rewritten — **refreshed** — at least once during this retention window. A typical DDR5 module refreshes all 8,192 rows of each bank every 32-64 ms, requiring roughly 8,000-16,000 refresh operations per second per bank. This refresh tax steals about 5-10% of available bandwidth and adds latency unpredictably.

### DDR5: The Current State of the Art

Modern DDR5-5600 memory, the standard in 2025 desktops, delivers about **44.8 GB/s** per channel (5,600 MT/s × 8 bytes per transfer). A dual-channel desktop system gets ~90 GB/s. A quad-channel server with DDR5-4800 reaches ~153 GB/s. These sound like big numbers until you consider that an Intel Xeon with 60 cores can demand hundreds of gigabytes per second when running memory-intensive workloads.

DDR5 introduced several clever tricks over DDR4:

- **Two independent 32-bit sub-channels** instead of one 64-bit channel, improving bus utilization
- **On-die ECC** (Error-Correcting Code), fixing single-bit errors within each DRAM chip before data even reaches the memory controller
- **Same-bank refresh** that lets other banks continue operating during refresh cycles
- **Decision Feedback Equalization (DFE)** on the I/O to clean up signal integrity at higher data rates

But the fundamental problem remains: a DDR5 **Column Access Strobe (CAS) latency** of ~13-14 ns, plus the time to activate a row (~13 ns), means a cold random access takes roughly 50-70 ns. For a 5 GHz processor, that's 250-350 wasted cycles — cycles during which the core sits idle, twiddling its metaphorical thumbs, unless the out-of-order execution engine (Day 16) can find something else to do.

### The DRAM Manufacturing Monopoly

Here's a fact that should make geopolitical strategists nervous: three companies manufacture essentially **all** of the world's DRAM. Samsung (40% market share), SK Hynix (34%), and Micron (25%). That's it. Three companies, two countries (South Korea and the United States), supply a component that goes into every phone, every server, every car, every smart toaster.

DRAM fabrication uses processes around 12-15 nm (though with high-aspect-ratio capacitor structures that require extraordinary etch capabilities — capacitor aspect ratios exceed **60:1** in current designs). Each company manufactures at enormous scale: Samsung's Pyeongtaek campus alone produces millions of wafers per year across multiple fabs.

The total DRAM market was worth approximately **$90 billion** in 2024, and it's one of the most brutally cyclical industries in existence. Prices can swing 50% in a single year based on supply-demand dynamics.

## HBM: Memory Goes Vertical

When bandwidth matters more than anything — and in the age of AI, it does — you need a fundamentally different approach. Enter **High Bandwidth Memory (HBM)**, perhaps the most important memory technology of the 2020s.

The core insight behind HBM is deceptively simple: instead of sending data through a narrow, high-speed bus to DIMMs on a motherboard, **stack the DRAM dies vertically and connect them with thousands of short, slow wires**. Short wires use less power. Thousands of them deliver massive aggregate bandwidth. It's the memory equivalent of replacing a single fire hose with ten thousand drinking straws — counterintuitive, but the math works.

An HBM stack consists of 8-12 DRAM dies, each thinned to roughly **40-50 µm** (about half the thickness of a human hair), connected vertically through **Through-Silicon Vias (TSVs)** — tiny copper-filled holes drilled through the silicon. Each stack has a **1,024-bit wide** interface. Compare that to DDR5's 32-bit sub-channel and you begin to see why bandwidth explodes.

The current generation, **HBM3E** (manufactured primarily by SK Hynix and Samsung), delivers:

- **1.18 TB/s** bandwidth per stack (8-high, 36 Gb per die, up to 36 GB per stack)
- Operating at just **6.4 Gbps per pin** — far slower than DDR5's 5,600-8,400 Mbps — but with 1,024 pins instead of 32
- Power consumption of roughly **20 pJ/bit**, about 3-5× more energy-efficient than DDR5 for the same data transferred

NVIDIA's H100 GPU uses five stacks of HBM3, totaling **80 GB at 3.35 TB/s**. The H200 bumps this to six stacks of HBM3E for **141 GB at 4.8 TB/s**. The upcoming B200 pushes to **192 GB at 8 TB/s** with HBM3E. For context, that single GPU has more memory bandwidth than a *rack full* of conventional servers.

### The Expensive Part

HBM's extraordinary performance comes at extraordinary cost. An HBM3E stack costs roughly **$100-120**, compared to $3-5 for an equivalent capacity DDR5 chip. An H100's 80 GB of HBM3 represents approximately **$500-600** in memory cost alone — and that's wholesale to NVIDIA. The cost comes from multiple factors: the TSV drilling process, die thinning (which risks cracking and reduces yield), the precision stacking and bonding, and the limited number of manufacturers.

SK Hynix currently dominates HBM production with roughly **50-55% market share**, followed by Samsung at **40%** and Micron at **5-10%**. The entire HBM market was approximately **$20 billion** in 2024 and is projected to exceed **$100 billion** by 2028, driven almost entirely by AI accelerator demand. SK Hynix's Icheon fab reportedly cannot build HBM fast enough — their entire 2025 production is already allocated to NVIDIA and AMD.

## The Bandwidth Wall: Why This All Matters

The memory hierarchy exists because of a fundamental physical constraint: **moving data costs energy proportional to distance**. Reading a bit from an SRAM cell 1 mm away costs about **0.05 pJ**. Fetching it from DRAM 20 mm away via a DDR5 interface costs roughly **15-20 pJ** — a 300-400× increase. Reaching across to a different server over Ethernet costs **1,000-10,000 pJ** per bit.

This energy-distance relationship creates what architects call the **bandwidth wall**: you can always build more compute (transistors keep shrinking), but the energy cost of feeding that compute with data doesn't scale the same way. A modern data center spends roughly **40-60%** of its total energy just *moving data* — not computing, just moving bytes from where they are to where they're needed.

This is why every major architecture trend of the 2020s is really a memory story in disguise:

- **Chiplets and 2.5D packaging** (Day 13): Putting compute and memory closer together on a silicon interposer reduces data movement energy by 5-10×
- **In-memory computing**: Companies like Mythic, Syntiant, and research labs at IBM are exploring computing *inside* the memory array, eliminating data movement entirely for certain workloads
- **Processing-in-Memory (PIM)**: Samsung's HBM-PIM and SK Hynix's AiM add compute units to each DRAM die in the HBM stack
- **CXL (Compute Express Link)**: A new interconnect standard that creates a unified memory pool across multiple devices, allowing memory disaggregation

### The Surprising Math of Memory Access

Here's the counterintuitive fact that defines modern computing: a single **cache miss to DRAM** on a modern processor wastes enough energy and time to execute roughly **200-500 simple arithmetic operations**. This means that for many real-world workloads — databases, graph analytics, sparse neural networks — the *algorithm's memory access pattern* matters more than its computational complexity.

A perfectly optimized matrix multiplication that accesses memory in cache-friendly order can run **10-100× faster** than a naïve implementation that thrashes the cache — even though both perform exactly the same number of arithmetic operations. This is why high-performance computing experts obsess over **data layout** (struct-of-arrays vs. array-of-structs), **loop tiling** (processing data in cache-sized blocks), and **prefetching** (telling the processor to start loading data you'll need 100+ cycles from now).

NVIDIA understood this earlier than anyone. The entire CUDA programming model (Day 17) is fundamentally about managing the GPU's memory hierarchy — coalescing global memory accesses, maximizing shared memory reuse, keeping register pressure manageable. The GPU programmers who achieve peak performance aren't the ones who write the cleverest arithmetic; they're the ones who feed the machine most efficiently.

## SRAM vs. DRAM vs. HBM: The Numbers at a Glance

Let's make this concrete with 2025-era numbers:

| | SRAM (L1) | SRAM (L3) | DDR5-5600 | HBM3E |
|---|---|---|---|---|
| **Latency** | ~1 ns | ~10-15 ns | ~50-70 ns | ~80-120 ns |
| **Bandwidth (per unit)** | ~1-3 TB/s (on-die) | ~0.5-1 TB/s | ~45 GB/s (per channel) | ~1.2 TB/s (per stack) |
| **Capacity (typical)** | 32-80 KB | 16-144 MB | 16-64 GB (per DIMM) | 24-36 GB (per stack) |
| **Cost per GB** | ~$10,000-50,000 | ~$100-500 | ~$2-4 | ~$10-15 |
| **Energy per bit** | ~0.05 pJ | ~1-5 pJ | ~15-20 pJ | ~5-7 pJ |
| **Transistors/bit** | 6 | 6 | 1 + 1C | 1 + 1C |

Notice the pattern: every step down the hierarchy trades roughly **10× latency for 100-1,000× capacity**. This isn't coincidence — it's a reflection of the fundamental tradeoff between speed (which requires proximity and more transistors) and density (which requires minimal area per bit).

## The Future: What Comes After the DRAM Capacitor?

DRAM scaling is approaching fundamental limits. The capacitor aspect ratio problem is becoming extreme — imagine a tube 60-70 times taller than it is wide, etched into silicon with atomic precision. The capacitor dielectric has evolved from silicon oxide to hafnium oxide to zirconium oxide alloys, each offering higher permittivity to maintain capacitance as the structure shrinks.

Several contenders are vying to supplement or replace conventional DRAM:

- **MRAM (Magnetoresistive RAM)**: Uses magnetic tunnel junctions. Non-volatile, fast (~10 ns), but limited density. Already used as embedded memory in some SoCs.
- **RRAM/ReRAM (Resistive RAM)**: Changes resistance by forming/dissolving conductive filaments. Good density, but endurance (number of write cycles) is still 10-100× below DRAM.
- **IGZO-based DRAM**: Uses indium-gallium-zinc-oxide transistors with dramatically lower leakage, potentially eliminating the refresh problem. Samsung has demonstrated this in research.

None of these are close to displacing DRAM at scale. The incumbent's advantage in manufacturing infrastructure is staggering — the world has invested hundreds of billions of dollars in DRAM fabs optimized for the 1T-1C cell. Any replacement needs to be dramatically better, not just incrementally better, to justify rebuilding that infrastructure.

## Tomorrow's Preview

We've seen how memory feeds the processor and how bandwidth constrains everything. But there's a new class of chip that has turned the bandwidth wall into an existential design constraint: **AI accelerators**. Tomorrow, we'll explore **TPUs, NPUs, and why matrix multiplication is all you need** — how Google, Apple, and a wave of startups have designed chips purpose-built for the one operation that dominates modern AI, and why the memory hierarchy we just learned about is the single most important factor in their design.

---

<div style="text-align: center; margin: 2em 0;">

<div class="quiz-placeholder" data-quiz-path="quizzes/day-18.toml"></div>

</div>
