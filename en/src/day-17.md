# Day 17: GPU Architecture — Why Thousands of Weak Cores Beat a Few Strong Ones

*The chip that was built for pixels accidentally became the engine of artificial intelligence.*

---

Yesterday we dissected the CPU — a marvel of serial execution, with branch predictors that guess the future, reorder buffers that juggle hundreds of in-flight instructions, and caches that paper over the memory wall. A modern CPU core is perhaps the most sophisticated sequential reasoning machine ever built. It can handle *anything* you throw at it, fast.

But here's the thing: the universe doesn't always need reasoning. Sometimes it needs brute force. When you're shading 8.3 million pixels 60 times a second, or multiplying two 16,384×16,384 matrices to train a neural network, you don't need one genius core that thinks deeply about each operation. You need an army. An army of small, dumb, obedient cores — thousands of them — all doing the same thing to different data, in lockstep.

That's a GPU. And the story of how a chip designed to draw triangles on screen became the most strategically important piece of silicon on Earth is one of the great accidents of technological history.

## The Pixel Problem That Started Everything

In the early 1990s, 3D graphics was coming to PCs, and the math was brutal. To render a single frame of *Quake* (1996), the CPU had to: transform 3D vertex coordinates through matrices, clip polygons to the view frustum, rasterize triangles into pixels, compute lighting at each pixel, sample textures, blend results, and write to the framebuffer. For a 640×480 display at 30 fps, that's about 9.2 million pixels per second, each requiring 10-50 floating-point operations. A Pentium Pro could do maybe 200 MFLOPS on a good day. The math didn't work.

The solution was obvious in hindsight: build dedicated hardware that does nothing *but* this math, in massive parallel. In 1999, NVIDIA released the GeForce 256, which they boldly marketed as the world's first "GPU" — a *graphics processing unit*. It could transform and light 15 million vertices per second and fill 480 million pixels per second, liberating the CPU to do game logic while the GPU chewed through geometry and pixels.

But the GeForce 256 was fixed-function. Its transistors were hardwired for specific graphics operations. You couldn't ask it to do general-purpose math any more than you could ask a toaster to make coffee. The revolution came when GPUs became *programmable*.

## From Fixed Pipes to Programmable Shaders

The turning point was 2001. NVIDIA's GeForce 3 introduced programmable vertex and pixel shaders — tiny programs that ran on each vertex or pixel. At first, these programs were laughably limited: 12 instructions maximum for pixel shaders in DirectX 8. But game developers are relentless optimizers, and they pushed for more. By 2004, shader programs could be hundreds of instructions long, with branching and loops.

The problem was that GPUs had separate hardware for vertex shaders and pixel shaders. A scene heavy on geometry would saturate vertex units while pixel units sat idle, and vice versa. This was wasteful.

In 2006, NVIDIA made a bet that changed everything. With the GeForce 8800 GTX (codenamed G80) and its Tesla architecture, they *unified* the shader cores. Instead of dedicated vertex and pixel units, the GPU had 128 identical "streaming processors" (SPs) that could run any type of shader program. This was the birth of the modern GPU architecture — and it's essentially the same idea, massively scaled, inside an NVIDIA H100 today.

## The SIMT Execution Model: One Instruction, Thirty-Two Threads

To understand why GPUs look the way they do, you need to understand their fundamental execution model: **Single Instruction, Multiple Threads (SIMT)**.

A CPU core is MIMD — Multiple Instruction, Multiple Data. Each core runs its own instruction stream, making independent decisions every cycle. This is maximally flexible but maximally expensive. Each core needs its own fetch unit, decoder, branch predictor, reorder buffer, and scheduler. On Apple's M4, a single performance core contains roughly 3-4 billion transistors' worth of control logic — for *one* instruction stream.

A GPU takes the opposite approach. It groups threads into bundles — NVIDIA calls them **warps** (32 threads), AMD calls them **wavefronts** (32 or 64 threads). Every thread in a warp executes the *same instruction* at the *same time*, just on different data. One fetch unit. One decoder. One program counter. Thirty-two datapaths doing the actual math.

Think of it this way: a CPU core is a brilliant professor working through a complex proof alone. A GPU warp is a drill sergeant commanding 32 soldiers to "drop and give me twenty" — all at once, no debate. The sergeant's overhead is minimal. One set of orders serves 32 executors.

This is why GPUs can pack so many cores onto a die. NVIDIA's H100 contains 16,896 CUDA cores, but they're organized into 528 warps running on 132 Streaming Multiprocessors (SMs). The control overhead is shared across 32 threads at a time, so the transistor budget goes overwhelmingly to execution units and register files rather than to prediction, speculation, and reordering.

The tradeoff is savage: **if threads within a warp need to do different things, performance collapses.** When a warp hits an `if/else` statement and 16 threads go left while 16 go right, the GPU must execute *both* paths sequentially, masking off the threads that shouldn't participate in each branch. This is **warp divergence**, and it can cut throughput in half or worse. GPUs aren't just bad at branchy code — they're architecturally allergic to it.

## Anatomy of a Streaming Multiprocessor

Let's zoom into one SM of NVIDIA's Ada Lovelace architecture (RTX 4090). Each SM contains:

- **128 CUDA cores** (FP32) — basic floating-point math units
- **4 tensor cores** — specialized matrix-multiply units (more on these shortly)
- **1 RT core** — ray-triangle intersection hardware
- **4 warp schedulers** — each managing one warp of 32 threads
- **65,536 × 32-bit registers** — a register file of 256 KB per SM
- **128 KB of shared memory / L1 cache** — configurable split between the two

That register file number should make you do a double-take. A single SM has *256 KB of registers* — that's more register storage than most CPUs have L1 cache. Across the full AD102 die (the chip inside the RTX 4090), the total register file is over 32 MB. Why so many?

The answer is **latency hiding**. A CPU hides memory latency with caches and out-of-order execution — sophisticated, transistor-hungry tricks. A GPU hides latency with a radically simpler approach: **when one warp is waiting for memory, just switch to another warp.** Each SM can have up to 48 warps resident simultaneously (1,536 threads). Their register state is *already in the register file* — no save/restore needed. When warp #7 issues a memory load that will take 400 cycles to return, the scheduler instantly switches to warp #8, then #9, and so on. If you have enough warps in flight, you can completely hide the memory latency with zero-cost context switching.

This is why GPU programs need **massive parallelism** to run well. If you only have 32 threads, you fill one warp on one SM, and the GPU spends most of its time idle. You need tens of thousands of threads to keep all the SMs busy and all the warps cycling through the schedulers.

## The Memory System: Bandwidth Over Latency

A CPU's memory system is optimized for *latency* — getting one piece of data as fast as possible. That's why CPUs have huge, multi-level cache hierarchies. An AMD Ryzen 9 9950X has 80 MB of L3 cache (plus 64 MB of 3D V-Cache in the X3D variant) precisely because cache hits at ~10ns beat DRAM accesses at ~70ns.

A GPU's memory system is optimized for *bandwidth* — moving as much data as possible per second, even if each individual access is slow. The RTX 4090 has a 384-bit memory bus running GDDR6X at 21 Gbps per pin, delivering **1,008 GB/s** of memory bandwidth. NVIDIA's H100 SXM pushes this further with **3.35 TB/s** using HBM3 (High Bandwidth Memory) — six stacks of DRAM dies connected to the GPU via a silicon interposer with thousands of through-silicon vias, as we covered on Day 13.

For comparison, a high-end desktop CPU gets about 50-90 GB/s from dual-channel DDR5. The H100 has roughly **50× more memory bandwidth** than a Ryzen. This isn't a small edge — it's a fundamentally different regime.

Why does bandwidth matter so much? Because when you have 16,896 cores all executing simultaneously, they all need to be fed data. The arithmetic intensity — the ratio of compute operations to memory operations — determines whether your workload is "compute-bound" or "memory-bound." Neural network training tends to be compute-bound (lots of matrix multiplies with high data reuse), which is perfect for GPUs. But inference, especially for large language models, is often memory-bound — you're reading billions of weight parameters for each token generated, which is why HBM bandwidth directly translates to tokens-per-second.

## Tensor Cores: The Matrix Multiply Accelerator

In 2017, NVIDIA introduced **tensor cores** with the Volta architecture, and this single addition is arguably why NVIDIA became a $3 trillion company.

A tensor core performs one specific operation: a **matrix multiply-accumulate** on small matrices. On Hopper (H100), each tensor core computes a 16×16×16 FP16 matrix multiply in a single clock cycle. That's 4,096 fused multiply-add operations — 8,192 FLOPS — per tensor core per cycle. The H100 has 528 tensor cores, and at 1.98 GHz boost clock, that delivers roughly **990 TFLOPS of FP16** throughput (with sparsity, it's advertised at 1,979 TFLOPS).

To put that in perspective: the CUDA cores on the same H100 deliver about 67 TFLOPS of FP32. The tensor cores are **30× faster** at the specific operation that matters for AI — matrix multiplication. And as we'll explore on Day 19, essentially all of deep learning reduces to matrix multiplication.

Tensor cores also support lower-precision formats that trade accuracy for speed: FP8, INT8, even FP4 on Blackwell. The H100's successor, the B200, pushes to **2.25 PFLOPS** of FP4 — over two quadrillion operations per second from a single chip. This precision-flexibility is why the same GPU architecture can train models in FP16/BF16 and then run inference in INT8 or FP4, squeezing 2-4× more throughput out of the same hardware.

## The GPU Software Stack: CUDA's Unassailable Moat

Raw hardware is necessary but not sufficient. NVIDIA's most powerful weapon isn't silicon — it's **CUDA**, the parallel computing platform they launched in 2007 alongside the G80.

CUDA lets programmers write GPU code in something close to C++. You write a **kernel** — a function that will execute on the GPU — and specify how many threads to launch in a **grid** of **thread blocks**. The runtime maps thread blocks to SMs. Here's the crucial hierarchy:

- **Thread**: one execution unit, has private registers and local memory
- **Warp**: 32 threads executing in lockstep (hardware scheduling unit)
- **Thread block**: up to 1,024 threads that can share fast on-chip shared memory and synchronize with each other
- **Grid**: all the thread blocks for one kernel launch

This hierarchy maps directly to the hardware. Shared memory within a thread block maps to the SM's shared memory (128 KB on Ada Lovelace). Synchronization within a block is fast (hardware barrier, ~20 cycles). Synchronization across blocks is expensive and generally avoided.

Over 17 years, NVIDIA has built a software ecosystem around CUDA that is staggeringly deep: cuDNN for neural network primitives, cuBLAS for linear algebra, NCCL for multi-GPU communication, TensorRT for inference optimization, Triton for compiler-level kernel generation. Every major ML framework — PyTorch, TensorFlow, JAX — has CUDA as its primary backend. Researchers don't just use NVIDIA GPUs because they're fast; they use them because the entire software infrastructure assumes CUDA.

AMD's ROCm and Intel's oneAPI are technically capable alternatives. AMD's MI300X has competitive specs on paper — 153 billion transistors, 192 GB of HBM3, 5.3 TB/s bandwidth. But the software gap remains enormous. Porting a CUDA codebase to ROCm isn't just a recompile; it's months of debugging subtle differences in memory models, synchronization behavior, and library support. This software moat is arguably worth more than the hardware lead.

## The Numbers That Define a GPU

Let's put an NVIDIA RTX 4090 (a consumer GPU) next to an H100 (a data center GPU) and an Apple M4 GPU to see how the landscape splits:

| Metric | RTX 4090 | H100 SXM | M4 (10-core GPU) |
|--------|----------|----------|-------------------|
| CUDA/shader cores | 16,384 | 16,896 | 1,280 |
| Tensor/matrix cores | 512 | 528 | 10 (AMX units) |
| Transistors | 76.3B | 80B | ~28B (full SoC) |
| TDP | 450W | 700W | ~10W (GPU portion) |
| Memory bandwidth | 1,008 GB/s | 3,350 GB/s | 120 GB/s |
| FP16 tensor TFLOPS | 661 | 990 | ~4.6 |
| Die size | 609 mm² | 814 mm² | ~75 mm² (GPU) |
| Price | $1,599 | ~$30,000 | Part of $1,199 SoC |

The H100 costs 20× more than an RTX 4090 for seemingly similar core counts because it has: 3.3× the memory bandwidth (HBM3 vs GDDR6X), NVLink 4.0 for connecting multiple GPUs at 900 GB/s each, 80 GB of HBM3 vs 24 GB of GDDR6X, and firmware/driver support for ECC, MIG partitioning, and datacenter reliability. The hardware premium is really a *systems* premium.

## AMD, Intel, and the GPU Competitive Landscape

NVIDIA commands roughly 80-90% of the data center GPU market as of 2025, but competition is heating up.

**AMD** has clawed back meaningfully with CDNA 3 (MI300X). By using chiplets — the same trick AMD used to upend Intel in CPUs — AMD stacks eight 5nm compute dies on top of four HBM3 stacks, creating a monster with 153 billion transistors (the largest ever at launch). The MI300X offers 192 GB of HBM3, crucial for running large language models whose weights don't fit in the H100's 80 GB. Microsoft, Meta, and Oracle have all deployed MI300X clusters.

**Intel** entered with Arc (consumer) and Gaudi (data center), though neither has gained significant traction. The Ponte Vecchio GPU packed 100 billion transistors with 47 chiplets but was late, power-hungry, and met with tepid adoption. Intel's Gaudi 3, an ASIC more than a traditional GPU, targets AI training specifically but lacks the software ecosystem depth.

**Apple** takes a fundamentally different approach with unified memory architecture. The M4 Ultra's GPU shares its 192 GB of memory with the CPU — no PCIe bus bottleneck, no separate memory pool. For workloads that fit in Apple Silicon's memory, the bandwidth efficiency can surprise: the M4 Max delivers 546 GB/s from a 30W power envelope. For local LLM inference, where you're memory-bandwidth-bound, Apple Silicon's performance-per-watt is competitive with discrete GPUs.

## Why GPUs Conquered AI

Here's the counterintuitive part: GPUs weren't *designed* for AI. The architectural properties that make them good at shading pixels — massive parallelism, high memory bandwidth, tolerance for latency, lockstep execution — happen to align almost perfectly with the computational demands of neural network training.

Training a neural network is, at its core, three operations repeated billions of times: **forward pass** (matrix multiplies), **loss computation** (element-wise operations), and **backward pass** (more matrix multiplies, transposed). Each operation applies the same computation to millions of independent data elements. This is exactly what SIMT was built for.

When Alex Krizhevsky trained AlexNet on two GTX 580s in 2012 and won the ImageNet competition by a landslide, it wasn't because he had a fundamentally better algorithm. Convolutional neural networks had existed since the 1980s. It was because GPUs finally made them *tractable* — what would have taken weeks on CPUs took days on GPUs. That moment cracked open the deep learning revolution.

Today, training a frontier model like GPT-4 or Gemini requires clusters of 10,000-25,000 H100 GPUs running for months, consuming megawatts of power, at a cost of $100-500 million per training run. NVIDIA's monopoly on this workload — hardware, software, interconnect (NVLink + NVSwitch) — is why they briefly became the most valuable company on Earth.

## The Strange Future: Specialization vs. Generality

The GPU is in a fascinating evolutionary moment. NVIDIA's Blackwell generation (B200) devotes an ever-larger fraction of die area to tensor cores, transformer engines, and interconnect — features that serve AI and barely touch graphics. AMD's MI300X doesn't even *have* a display output; it's a GPU in name only. Google's TPUs and Amazon's Trainium are pure AI accelerators with no graphics heritage at all.

Are we witnessing the GPU's metamorphosis from a graphics chip into something else entirely? The tension between generality (CUDA runs anything) and specialization (tensor cores for one operation) will define the next decade of chip architecture. As we'll see tomorrow when we explore the **memory hierarchy** — SRAM, DRAM, HBM, and the bandwidth wall — the limiting factor isn't compute anymore. It's feeding the beast with data fast enough.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/day-17.toml"></div>
