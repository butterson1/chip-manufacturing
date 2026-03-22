# Day 19: AI Accelerators — TPUs, NPUs, and Why Matrix Multiplication Is All You Need

*Every breakthrough in artificial intelligence ultimately reduces to one absurdly simple operation: multiplying matrices. The chips that do this best are reshaping the entire semiconductor industry.*

---

## The Unreasonable Effectiveness of Multiply-Accumulate

In 2012, Alex Krizhevsky trained AlexNet on two NVIDIA GTX 580 GPUs — consumer graphics cards worth about $500 each. It took five days and won the ImageNet competition by a margin that stunned the machine learning community. Fast forward to 2024, and training a frontier large language model requires 16,000 to 32,000 NVIDIA H100 GPUs running for 3-4 months at an estimated cost of $100-200 million in compute alone. The compute demands of AI have been increasing by roughly **4× per year** since 2012 — a pace that makes Moore's Law look leisurely.

What's remarkable is that despite the dizzying complexity of modern AI models — transformers with hundreds of billions of parameters, attention mechanisms, layer normalization, activation functions — the actual computation boils down overwhelmingly to one operation: **multiply-accumulate (MAC)**. Take two numbers, multiply them, add the result to a running sum. That's it. A single forward pass through GPT-4-class model performs roughly 1.8 trillion of these operations. Training involves doing this thousands of billions of times over, adjusting weights slightly each iteration.

The reason is linear algebra. A neural network layer is fundamentally a matrix multiplication: take an input vector, multiply it by a weight matrix, apply a nonlinearity. The attention mechanism in transformers? Three matrix multiplications (queries × keys, then scores × values) plus a softmax. Convolutions? They can be restructured as matrix multiplications using the im2col transform. When you strip away the conceptual complexity, an AI accelerator's job description is beautifully simple: **multiply enormous matrices as fast as physically possible, while moving data as efficiently as physics allows**.

This realization — that AI's core operation is fundamentally different from general-purpose computing — spawned an entirely new category of silicon. GPUs got there first by accident, but purpose-built **AI accelerators** are now the most consequential chips on Earth.

## Google's TPU: The Chip That Proved Custom Silicon Wins

In 2013, Google engineers ran the numbers on a terrifying projection: if every Android user used voice search for just three minutes a day, Google would need to **double its entire data center compute capacity** just to run the speech recognition neural networks. Buying that many CPUs was economically impossible. GPUs weren't yet well-suited for inference in data centers. So Google did something that seemed audacious at the time — they decided to design their own chip.

The result was the **Tensor Processing Unit (TPU)**, first deployed internally in 2015 and publicly announced in 2016. The TPU v1 was a pure inference accelerator, and its design philosophy was radical in its simplicity: strip away everything a chip does that isn't matrix multiplication, and dedicate the entire die to doing MAC operations as densely as possible.

The heart of the TPU v1 was a **systolic array** — a 256 × 256 grid of multiply-accumulate units. The name "systolic" comes from the heart: data pulses through the array rhythmically, like blood through arteries. In a systolic array, each processing element receives data from its neighbors, performs one MAC, and passes results along. No element needs to fetch from a central memory; data flows through the fabric. This eliminates the memory access overhead that cripples general-purpose processors and achieves extraordinary computational density.

That 256 × 256 array performed 65,536 MAC operations every clock cycle. At 700 MHz, the TPU v1 delivered **92 TOPS** (trillion operations per second) for 8-bit integer math — while consuming just 40 watts. For comparison, a contemporary Intel Haswell CPU achieved roughly 2.6 TOPS at similar power. The TPU was 35× more performant per watt for neural network inference.

The key architectural insight was **reduced precision**. Neural networks, unlike scientific computing, are remarkably tolerant of numerical imprecision. The TPU v1 operated on 8-bit integers, where a CPU insisted on 32-bit or 64-bit floating point. Since multiplier area and power scale roughly with the **square** of bit-width, an 8-bit multiplier is about 16× smaller and more efficient than a 32-bit one. Google was essentially trading precision that neural networks didn't need for throughput they desperately did.

### The TPU Evolution

Each TPU generation has scaled the systolic array concept while adding capabilities:

- **TPU v2** (2017): Added floating-point support (bfloat16) for training, not just inference. Two 128 × 128 systolic arrays per chip, 45 TFLOPS, 16 GB HBM. First deployed in "pods" of 64 chips with custom 2D torus interconnect delivering 17.5 TB/s bisection bandwidth.
- **TPU v3** (2018): 123 TFLOPS, liquid-cooled (Google's first liquid-cooled data center hardware), 32 GB HBM2. Pods scaled to 1,024 chips.
- **TPU v4** (2022): 275 TFLOPS bfloat16, 32 GB HBM2e. Pods of 4,096 chips connected by a **3D torus** optical interconnect — a topology borrowed from supercomputer design. A single v4 pod delivers over 1.1 exaflops.
- **TPU v5e** (2023): Optimized for inference efficiency, 393 TOPS INT8, designed for the explosion of LLM serving.
- **TPU v6e (Trillium)** (2024): 4.7× inference improvement over v5e, 67% energy efficiency gain.

What makes Google's approach architecturally significant isn't just the raw numbers — it's the **co-design of hardware and interconnect**. A single TPU is fast; 4,096 TPUs connected in a 3D torus that allows any chip to communicate with any other in a bounded number of hops is a fundamentally different beast. Training large models requires splitting them across hundreds or thousands of chips (model parallelism, data parallelism, pipeline parallelism), and the interconnect determines how much time is spent computing versus waiting for other chips. Google's custom ICI (Inter-Chip Interconnect) delivers ~4,800 Gbps per chip in v5p, dwarfing what InfiniBand offers between GPU servers.

## NVIDIA's Dominance: The CUDA Moat Deepens

While Google built TPUs for internal use, NVIDIA transformed from a gaming company into the world's most valuable semiconductor firm by recognizing that **GPUs were already AI accelerators** — they just needed a few targeted additions.

The pivotal hardware innovation was the **tensor core**, introduced with the Volta architecture (V100) in 2017. A standard CUDA core performs one floating-point multiply-add per cycle. A tensor core performs an entire **4×4×4 matrix multiply-accumulate** in a single cycle — 64 MAC operations at once. The H100 (Hopper architecture, 2022) contains 528 tensor cores that can execute **16×16×16** MMA operations, delivering 990 TFLOPS for FP16 and nearly 2,000 TFLOPS for FP8. The B200 (Blackwell, 2024) pushes to 2,250 TFLOPS FP16 and 4,500 TFLOPS FP8 with its two-die design packing 208 billion transistors.

But NVIDIA's real advantage isn't silicon — it's software. The **CUDA ecosystem**, built over 18 years since its 2006 launch, represents millions of person-hours of optimized libraries, frameworks, and institutional knowledge. Libraries like cuBLAS (linear algebra), cuDNN (neural network primitives), NCCL (multi-GPU communication), and TensorRT (inference optimization) mean that an AI researcher can write standard PyTorch code and get 80-90% of peak hardware utilization. Achieving the same on any competing platform requires months of specialized optimization.

This is the "CUDA moat" — and it's wider than any architectural advantage. AMD's MI300X offers competitive raw specifications (192 GB HBM3, 5.3 TB/s bandwidth), but AMD's ROCm software stack still trails CUDA in maturity, operator coverage, and debugging tools. Intel's Gaudi accelerators have struggled to gain traction for similar reasons. The lesson: in AI hardware, **software eats silicon**.

### The Transformer Engine: Hardware-Software Co-Design

The H100 introduced the **Transformer Engine**, a feature that illustrates how tightly modern AI accelerators co-design hardware and algorithms. The Transformer Engine dynamically switches between FP8 and FP16 precision on a **per-layer, per-tensor basis** during training. It monitors the statistical distribution of tensor values in real-time and chooses the lowest precision that maintains accuracy, doubling throughput for layers that can tolerate FP8 while preserving FP16 for sensitive operations like attention score computation.

This works because different parts of a neural network have different numerical requirements. Weight matrices in linear layers often have narrow value distributions that fit comfortably in FP8 (which has only 4-5 bits of mantissa). But softmax outputs and residual stream values can have wide dynamic ranges that need FP16. The Transformer Engine makes this decision automatically, in hardware, without programmer intervention. It's a perfect example of the accelerator philosophy: understand the workload's mathematical properties, then build silicon that exploits them.

## NPUs: AI in Your Pocket

While TPUs and GPUs battle in the data center, a quieter revolution is playing out in every smartphone, laptop, and tablet sold today: the **Neural Processing Unit (NPU)**.

Apple's A11 Bionic (2017) was the first smartphone SoC with a dedicated neural engine — a 2-core unit capable of 600 billion operations per second. By the A17 Pro (2023), this had grown to a 16-core neural engine delivering 35 TOPS. The M4 chip in the 2024 iPad Pro packs a 16-core NPU at 38 TOPS. Qualcomm's Snapdragon 8 Elite (2024) hits 75 TOPS from its Hexagon NPU. Intel's Lunar Lake laptop processors include an NPU rated at 48 TOPS — enough to earn Microsoft's "Copilot+" certification.

NPUs are architecturally simpler than data center accelerators but share the same core principle: arrays of MAC units operating on low-precision data (INT8 or INT4), with specialized on-chip SRAM buffers designed to minimize external memory access. Apple's neural engine, for instance, uses a **16-core design** where each core contains dedicated matrix multiply hardware, activation function units, and a pooling engine — the exact operations needed for convolution and transformer inference, with nothing else.

The power constraints on NPUs are severe. A data center GPU can burn 700 watts (the B200's TDP). A smartphone NPU gets a budget of roughly **1-5 watts** — and must share that with the CPU, GPU, display, and cellular modem. Achieving meaningful AI inference at milliwatt-scale power requires aggressive quantization (many phone models run at 4-bit precision), aggressive memory compression, and **sparsity exploitation** — skipping multiplications where one operand is zero, which is surprisingly common in neural networks (30-90% of activations in ReLU-based networks are zero).

### The On-Device AI Moment

Why put AI hardware in phones at all? Three reasons: **latency, privacy, and cost**.

Cloud inference for a single LLM query costs $0.01-0.10 and requires a round-trip over the network (50-200 ms). On-device inference is free per-query and happens in single-digit milliseconds. For always-on features like face detection (every camera frame), voice activity detection (continuous microphone monitoring), or real-time language translation, sending data to the cloud is either too slow, too expensive, or too privacy-invasive.

Apple's on-device AI strategy is architecturally telling: the entire Face ID pipeline (face detection, depth map processing, neural network matching) runs exclusively on the neural engine and secure enclave, with biometric data that **never leaves the device**. Google's Pixel phones run speech recognition, call screening, and live translation entirely on-device using their custom Tensor SoC (designed with Samsung, featuring a Google-designed TPU-derived AI core). Samsung's Galaxy AI features run a mix of on-device INT4 models and cloud-based larger models, with the phone's NPU handling the most latency-sensitive tasks.

The trajectory is clear: every computing device will have dedicated AI silicon. The global NPU market is projected to exceed $40 billion by 2028, growing at over 20% CAGR. We're in the early innings of a transition as fundamental as the shift from CPU-only computing to CPU+GPU.

## The Precision Revolution: How Low Can You Go?

One of the most counterintuitive aspects of AI hardware is the relentless drive toward **lower numerical precision**. In traditional computing, more precision is always better — you'd never willingly compute with fewer decimal places. In AI, less precision often works just as well and unlocks enormous efficiency gains.

The precision hierarchy in AI compute looks like this:

| Format | Bits | Mantissa Bits | Range | Typical Use |
|--------|------|---------------|-------|-------------|
| FP32 | 32 | 23 | ±3.4×10³⁸ | Scientific computing, reference training |
| TF32 | 19 | 10 | ±3.4×10³⁸ | Training (NVIDIA A100+, drop-in for FP32) |
| BF16 | 16 | 7 | ±3.4×10³⁸ | Standard training precision |
| FP16 | 16 | 10 | ±65,504 | Training & inference |
| FP8 (E4M3) | 8 | 3 | ±448 | Training forward pass |
| FP8 (E5M2) | 8 | 2 | ±57,344 | Training backward pass (gradients need range) |
| INT8 | 8 | — | -128 to 127 | Inference quantization |
| INT4 | 4 | — | -8 to 7 | Edge/mobile inference |

Notice something fascinating: **bfloat16** (BF16), invented by Google Brain specifically for AI training, keeps FP32's exponent range (8 bits of exponent) but slashes mantissa to 7 bits. This is the opposite of what IEEE 754's FP16 does (5-bit exponent, 10-bit mantissa). Google's insight was that neural networks care more about **dynamic range** (not overflowing or underflowing) than **precision** (exact decimal representation). This single design choice made mixed-precision training practical and is now the default training format across the industry.

The most extreme production quantization today is **GPTQ/AWQ 4-bit** — compressing a model's weights from 16 bits to 4 bits with minimal quality loss. This enables running a 7-billion-parameter language model on a smartphone with 4 GB of available memory. The math is simple: 7B parameters × 2 bytes (FP16) = 14 GB; 7B parameters × 0.5 bytes (INT4) = 3.5 GB. Quantization literally makes the impossible possible on edge devices.

Hardware is racing to support these formats natively. NVIDIA's Blackwell architecture supports FP4 (4-bit floating point) in its tensor cores, promising 2× throughput over FP8 for inference. Qualcomm's NPUs support mixed INT4/INT8 execution. The trend is unambiguous: **every halving of precision roughly doubles throughput and halves memory bandwidth** requirements, and the AI algorithms community keeps finding ways to make lower precision work.

## The Memory Bandwidth Crisis

If you internalized yesterday's lesson on memory hierarchy, you already see the fundamental problem for AI accelerators: **arithmetic is cheap; moving data is expensive**.

Consider the H100 GPU: 990 TFLOPS of FP16 compute, 3.35 TB/s of HBM3 bandwidth. To keep all those tensor cores busy, every byte of data fetched from HBM must be used in roughly 300 floating-point operations before the next byte arrives. This ratio — **compute intensity** divided by **memory bandwidth**, measured in FLOPs per byte — is called the **arithmetic intensity**, and it defines whether a workload is *compute-bound* (limited by processing speed) or *memory-bound* (limited by data delivery).

Large matrix multiplications are compute-bound: multiplying two 4096 × 4096 matrices requires 137 billion MACs but only 134 MB of data — an arithmetic intensity of ~1,000 FLOPs/byte. The tensor cores stay fed and happy.

But many AI operations are catastrophically memory-bound. **Attention in transformers** for long sequences, **element-wise operations** (activation functions, layer normalization), and **autoregressive decoding** (generating one token at a time, requiring a full model forward pass per token) have low arithmetic intensity. During LLM inference, generating each token requires reading the model's entire weight matrix — potentially hundreds of gigabytes — to produce a single output token. For a 175B-parameter model at FP16, that's 350 GB of weights read for each token. At 3.35 TB/s, you get roughly 9.5 tokens per second. The tensor cores sit idle 95% of the time, waiting for data.

This is why **HBM capacity and bandwidth** have become the primary selling points for AI chips, even more than TFLOPS. It's why NVIDIA's stock price tracks HBM availability from SK Hynix and Samsung. It's why the B200's 8 TB/s of HBM3E bandwidth is arguably more important than its 4,500 TFLOPS of compute. And it's why clever algorithmic optimizations like **Flash Attention** (developed by Tri Dao at Stanford/Princeton) — which restructures the attention computation to maximize data reuse in SRAM before touching HBM — delivered a 2-4× speedup without any hardware changes.

## The Competitive Landscape: Beyond NVIDIA

NVIDIA's dominance (estimated 80-95% market share for AI training accelerators in 2024) has catalyzed an unprecedented wave of competition:

**AMD** is NVIDIA's most credible challenger. The MI300X (2023) uses a chiplet architecture — 12 active dies (8 HBM3 stacks + 4 compute dies) on a single package with 192 GB HBM3 and 5.3 TB/s bandwidth. For large model inference where memory capacity matters, it's competitive. AMD's acquisition of Xilinx (2022, $49B) and its growing ROCm ecosystem investment signal serious commitment.

**Intel's** Gaudi 3 (2024) targets price-performance, typically offered at 60-70% the cost of equivalent NVIDIA parts. Intel's strategy hinges on its open Ethernet-based interconnect (avoiding NVIDIA's proprietary NVLink lock-in) and Habana Labs' compiler stack. Market adoption has been modest.

**Custom silicon from hyperscalers** represents a structural shift. Beyond Google's TPUs, Amazon's **Trainium 2** (2024) powers AWS AI services with 2× the compute of Trainium 1 and UltraServer configurations linking 64 chips. Microsoft is developing **Maia 100**, its first custom AI chip, manufactured at TSMC's N5. Meta reportedly has custom inference chips in development. These hyperscalers collectively account for 50-60% of all AI chip purchases; every chip they build themselves is a chip they don't buy from NVIDIA.

**Startups** continue to attract billions despite the capital intensity. Cerebras built the world's largest chip — the WSE-3 (2024), an entire wafer-scale die at 46,225 mm² containing 4 trillion transistors, 900,000 AI-optimized cores, and 44 GB of on-chip SRAM (eliminating the HBM bottleneck entirely). Groq's LPU (Language Processing Unit) uses a deterministic dataflow architecture with no HBM at all, achieving blazing inference throughput for medium-sized models. SambaNova, Graphcore (acquired by SoftBank), and Tenstorrent (led by Jim Keller, legendary CPU architect) represent different architectural bets.

## A Surprising Truth: Software Matters More Than Hardware

Here's the counterintuitive fact that defines this entire space: **most AI workloads run at 30-50% of peak hardware utilization**. The gap between theoretical TFLOPS on a spec sheet and actually achieved TFLOPS in production is enormous — and it's almost entirely a software problem.

Getting a matrix multiplication to run at 85-90% of peak on a single GPU is a solved problem (cuBLAS does it). But real training involves thousands of GPUs, where collective communication (all-reduce, all-gather), pipeline bubble overhead, memory fragmentation, and load imbalance conspire to waste 50-70% of potential compute. Meta reported that training Llama 3 405B on 16,384 H100 GPUs achieved roughly 38-43% model FLOPs utilization (MFU). Google's PaLM training on 6,144 TPU v4 achieved 46-57% MFU, with their interconnect advantage partly explaining the higher number.

This means doubling your software efficiency — through better parallelism strategies, smarter communication scheduling, or compiler optimizations — can be worth more than doubling your hardware. It's why NVIDIA's compiler team and CUDA libraries are arguably more valuable than their hardware design team, and why every serious AI lab now employs teams of "systems" researchers whose sole job is extracting more useful work from existing silicon.

---

## What's Next

Tomorrow, we'll explore **RISC-V** — the open-source instruction set architecture that's challenging ARM and x86's decades-long duopoly. Born as a teaching project at UC Berkeley, RISC-V has become the most significant architectural movement in computing since ARM went mobile. We'll see how a free, extensible ISA is reshaping everything from microcontrollers to AI accelerators — and why the incumbents are nervous.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/day-19.toml" data-quiz-day="19"></div>
