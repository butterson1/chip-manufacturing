# Day 15: RTL to GDSII
## How a Chip Is Designed — From Code to Silicon Blueprint

For the past fourteen days, you've been deep in the physical world: photons blasting through masks, plasma carving trenches into silicon, copper atoms electroplating into nanoscale channels. You've learned *how* chips are manufactured. Today, we flip the entire perspective. Before a single photon hits a wafer, before a single atom is deposited, someone has to *design* the chip — and that process is, in its own way, just as extraordinary as the manufacturing.

Here's what might surprise you: **modern chips are written in code**. Not C, not Python, but specialized hardware description languages like Verilog and VHDL. An engineer doesn't draw transistors by hand any more than a novelist chisels letters into stone. They write something that looks remarkably like software, press "compile," and a chain of software tools — collectively worth more than $15 billion in annual revenue — transforms that code into the physical blueprint that tells ASML's scanners exactly where to place every feature on a 300 mm wafer.

This transformation, from Register Transfer Level (RTL) description to GDSII file (the industry-standard format for mask data), is one of the most computationally intense engineering workflows on the planet. Designing Apple's M2 Ultra, with its **134 billion transistors**, required an estimated **10-15 million CPU-hours** of compute. Synopsys and Cadence, the two companies whose software makes this possible, have a combined market capitalization exceeding **$150 billion** — larger than most semiconductor companies themselves. The tools *that design* chips are worth more than many of the companies *that make* them.

Let's walk through the entire pipeline, from the first line of Verilog to the tape-out party.

---

## Step 1: Writing the chip — RTL and hardware description languages

The journey begins with RTL code, and understanding what "Register Transfer Level" means unlocks the whole abstraction. At this level, a designer describes hardware in terms of **data flowing between registers** (flip-flops that store bits) and the **combinational logic** that transforms that data between clock cycles. You're not thinking about individual transistors — you're thinking about function.

Here's what a simple 8-bit counter looks like in Verilog:

```verilog
module counter (
    input  wire       clk,
    input  wire       reset,
    output reg [7:0]  count
);
    always @(posedge clk) begin
        if (reset)
            count <= 8'b0;
        else
            count <= count + 1;
    end
endmodule
```

This is ten lines of code. It describes a register (`count`) that increments by one on every rising clock edge. But when this gets synthesized into actual gates and wires, it becomes roughly **80-100 transistors** — an 8-bit adder, eight flip-flops, reset logic, clock distribution buffers. The RTL abstraction lets a single engineer describe behavior that would take days to draw at the transistor level.

Now scale that up. Apple's A17 Pro has about **19 billion transistors**. The RTL for a chip like that comprises **tens of millions of lines** of Verilog/SystemVerilog code, written by teams of **hundreds of engineers** over 2-3 years. The CPU core alone might be 500,000-1,000,000 lines. The GPU, the Neural Engine, the image signal processor, the display controller, the PCIe and USB controllers, the memory interfaces — each is a major subsystem designed by a specialized team.

One critical distinction: **RTL is not software**. When you write `count <= count + 1`, you're not telling a processor to execute an addition instruction. You're describing **physical hardware that will exist in silicon** — an actual adder circuit made of actual transistors that will perform this addition in a single clock cycle, every clock cycle, for the lifetime of the chip, whether anyone asks it to or not. Everything in RTL executes simultaneously. Every `always` block fires on every clock edge, in parallel. This is the fundamental mental shift that separates hardware engineers from software engineers, and why experienced RTL designers are among the most sought-after engineers in tech — commanding salaries of $300,000-$500,000+ at companies like Apple, NVIDIA, and AMD.

---

## Step 2: Verification — The 70% that nobody talks about

Here's the dirty secret of chip design: **verification consumes 60-70% of the entire project effort**. More engineers verify the chip than design it. The reason is simple but terrifying: you can't patch silicon. Once you tape out a design and TSMC prints it on a wafer — a process that costs **$300-500 million** at the 3nm node — you're committed. A bug in a GPU shader pipeline or a race condition in the memory controller doesn't get a hotfix. It gets a respin — another 3-6 months and another $300-500 million.

The industry's most famous verification failure? Intel's 1994 **Pentium FDIV bug**, where a lookup table error in the floating-point divider produced incorrect results for certain rare divisor pairs. Intel initially dismissed it, then had to take a **$475 million** write-off to replace affected processors. Adjusted for inflation, that's about $1 billion today — from a bug in a table with 1,066 entries where five were wrong.

Modern verification uses a layered approach:

**Simulation** is the workhorse. Tools like Synopsys VCS and Cadence Xcelium compile the RTL into a software model and run test cases against it. But here's the problem: even a modest CPU core has a state space so vast that exhaustive simulation would take longer than the age of the universe. An out-of-order core with 200 architectural registers, a 256-entry reorder buffer, and a multi-level cache hierarchy has more possible states than atoms in the observable universe. You can't test them all.

**Constrained random verification** (CRV) attacks this by generating millions of pseudo-random stimulus patterns within defined constraints. Instead of writing each test case by hand, engineers describe the *space* of valid inputs and let the tool explore. A SystemVerilog testbench might generate random instruction sequences, random memory access patterns, random interrupt timing — and then check that the RTL produces correct results against a reference model. Coverage metrics track which states, transitions, and corner cases have been exercised. Teams typically target **>95% functional coverage** before tape-out.

**Formal verification** takes a completely different approach: mathematical proof. Tools like Synopsys VC Formal and Cadence JasperGold use SAT solvers and model checking to *prove* that certain properties hold for all possible inputs, not just the ones you tested. For example, you can formally prove that an arbiter never grants two masters simultaneously, or that a FIFO never overflows under the protocol's timing constraints. Formal verification is incredibly powerful for control logic and protocols, but it doesn't scale well to datapath-heavy designs — proving properties about a 64-bit floating-point multiplier can overwhelm even modern SAT solvers.

**Emulation and FPGA prototyping** provide a middle ground between simulation speed and silicon accuracy. Synopsys ZeBu and Cadence Palladium are massive emulation systems — server-rack-sized machines costing **$5-20 million** — that map RTL onto specialized hardware to run at speeds 1,000-10,000× faster than software simulation. This lets teams boot an operating system on the design months before silicon arrives. FPGA prototyping (using Xilinx/AMD Versal or Intel Agilex FPGAs) offers even higher speed but less debugging visibility.

---

## Step 3: Logic synthesis — From behavior to gates

Once the RTL is verified, **logic synthesis** transforms the behavioral description into a netlist of specific logic gates from the foundry's **standard cell library**. This is the first moment where the abstract design meets the physical reality of a specific manufacturing process.

A standard cell library is a catalog of pre-designed, pre-characterized logic functions: NAND2, NOR3, inverters, flip-flops, multiplexers, adders, and more exotic cells — typically **500-1,000 different cells** per library. Each cell has been designed at the transistor level, simulated across voltage and temperature corners, and characterized for timing, power, and area. TSMC's N3E library might include a NAND2 gate with a drive strength of 1× that's 0.051 µm tall and 0.040 µm wide, delays a signal by 12 picoseconds, and consumes 0.3 femtowatts of leakage power.

The synthesis tool — typically Synopsys Design Compiler or Cadence Genus — reads the RTL and a set of **constraints**: target clock frequency, maximum area, power budget. It then performs a series of transformations:

1. **Elaboration**: parses the RTL and builds a technology-independent Boolean network
2. **Technology mapping**: maps generic operations onto specific standard cells
3. **Optimization**: iteratively restructures the logic to meet timing, area, and power goals

The optimization is where synthesis earns its keep. The tool might realize that a chain of four 2-input NAND gates can be replaced by a single 4-input AND-OR-Invert (AOI) complex gate, saving area and improving speed. It might duplicate logic along a critical path to reduce fan-out delay. It might insert buffer trees to distribute a heavily loaded signal. These are decisions no human could make efficiently across a design with billions of gates.

Synthesis output is a **gate-level netlist**: a massive text file listing every gate instance and every wire connecting them. For a design like Apple's M2, this netlist contains on the order of **5-10 billion** gate instances. The file itself can be tens of gigabytes.

---

## Step 4: Floorplanning — The architect's blueprint

Before placing individual cells, the chip needs a **floorplan** — a high-level layout that assigns major blocks to specific regions of the die. This is part engineering, part art, and it has enormous consequences.

The floorplanner must consider:

- **Data flow**: blocks that communicate heavily should be adjacent. Placing the L2 cache far from the CPU core it serves would add wire delay that ruins performance.
- **Power distribution**: high-power blocks (CPU cores, GPU shader arrays) must be spread across the die to avoid thermal hot spots. NVIDIA's Blackwell B200 GPU dissipates **1,000W** across about 800 mm² — that's 1.25 W/mm², and localized hot spots can exceed 3-4 W/mm², approaching **400°C/cm²** heat flux densities that challenge even advanced cooling solutions.
- **I/O placement**: pads for power, ground, and signals must be at the die edge, and the blocks they serve should be nearby.
- **Clock distribution**: the clock signal must reach every flip-flop within a tight timing window (clock skew), which favors centralized clock sources and symmetrical layouts.

The floorplan also defines the **power grid** — a mesh of wide metal lines on the upper metal layers that distribute VDD and VSS across the die. A modern SoC might dedicate **30-40% of its upper metal layers** purely to power delivery. Intel's PowerVia technology (which we covered on Day 11) moves this grid to the backside of the wafer, freeing up valuable routing resources on the front side.

---

## Step 5: Place and route — Filling in the blueprint

This is where the brute-force computation happens. **Placement** takes those billions of standard cells from the synthesized netlist and assigns each one a physical location on the die. **Routing** then connects them with metal wires across 12-15+ metal layers.

Modern place-and-route (PnR) tools — Synopsys IC Compiler II and Cadence Innovus — are arguably the most computationally demanding EDA tools. Placing a design with 5 billion cells is, at its core, a combinatorial optimization problem that makes traveling salesman look trivial. The tools use a cascade of algorithms:

1. **Global placement**: distributes cells across the die to minimize total wire length, using analytical methods that treat cells as charged particles repelling each other while being attracted to their optimal positions
2. **Legalization**: snaps cells onto the discrete standard cell rows, resolving overlaps
3. **Detailed placement**: local perturbations — swapping adjacent cells, shifting small groups — to improve timing on critical paths
4. **Clock tree synthesis** (CTS): builds a balanced tree of buffers to distribute the clock signal with minimal skew. On a modern SoC running at 3+ GHz, the clock tree might contain **500,000-1,000,000 buffers**, and the skew budget might be as tight as **5-10 picoseconds** — the time it takes light to travel 1.5-3 millimeters.
5. **Global routing**: plans rough paths for each net across the chip's routing grid
6. **Detailed routing**: assigns specific metal tracks and vias, resolving conflicts where multiple nets compete for the same routing resources

The routing step is where physical design meets the interconnect physics from Day 11. Each wire has resistance and capacitance determined by its length, width, metal layer, and spacing to neighbors. The tool must ensure that every signal arrives at its destination within the clock period — and at 3nm, with 13+ metal layers and **billions of routed nets**, this is a staggeringly complex constraint satisfaction problem.

A full PnR run for a large SoC can take **2-4 weeks of wall-clock time** on a compute farm with **thousands of CPU cores** and **terabytes of RAM**. Cadence and Synopsys have both introduced **machine learning** into their PnR engines: Synopsys DSO.ai uses reinforcement learning to explore the space of tool settings, reportedly achieving results in some cases that match or beat what human engineers would reach after weeks of manual tuning.

---

## Step 6: Timing closure — The make-or-break moment

The design isn't done until it **passes timing**. Static Timing Analysis (STA) — performed by tools like Synopsys PrimeTime — checks every path from every flip-flop through every gate to every other flip-flop, ensuring the signal arrives before the next clock edge.

But here's the subtlety: timing isn't a single number. It varies with:

- **Process**: manufacturing variation means some transistors are faster, others slower
- **Voltage**: VDD droops under heavy load, slowing gates
- **Temperature**: hotter transistors are slower (mostly — there's actually an inversion point at advanced nodes)

STA analyzes timing across dozens of **PVT corners** — combinations like {slow process, low voltage, high temperature} for setup checks and {fast process, high voltage, low temperature} for hold checks. A design must pass timing at **all** corners simultaneously.

When paths fail timing — called **timing violations** — the team enters the iterative agony of **timing closure**: adjusting placement, resizing gates, inserting buffers, restructuring logic, sometimes even changing the RTL. On a complex SoC, timing closure can consume **40-50% of the total physical design schedule**. It's not uncommon for teams to be closing timing violations at 3 AM in the weeks before tape-out.

---

## Step 7: Physical verification and tape-out

The final gauntlet before sending data to the foundry involves two critical checks:

**Design Rule Checking (DRC)** verifies that every geometric shape in the layout complies with the foundry's manufacturing rules — minimum wire widths, minimum spacing between features, minimum enclosure of vias by metal, and hundreds of other constraints. TSMC's N3 DRC rule deck contains **thousands of rules**. A single violation is a potential yield killer. Modern designs can start with **millions of DRC violations** after initial routing, which the tools iteratively fix.

**Layout Versus Schematic (LVS)** extracts the actual circuit from the physical layout — identifying every transistor, every wire, every connection — and compares it to the original netlist from synthesis. LVS must confirm that what you drew is what you designed. An LVS-clean design means the layout faithfully represents the intended circuit. Getting to "LVS clean" on a billion-transistor design is a milestone that teams celebrate.

Once DRC and LVS are clean, parasitic extraction tools (like Synopsys StarRC) pull out the resistance and capacitance of every wire in the layout, and a final STA run confirms timing still passes with these real parasitics. Then comes **signoff**: the formal declaration that the design is ready.

The final output is a **GDSII** file (or increasingly, its modern successor **OASIS**), containing the geometric shapes for every layer of the chip. For a modern SoC, this file can be **1-2 terabytes** in size. It's transmitted to the foundry over a secure, dedicated network link — not emailed, not put on a USB drive. This moment is called **tape-out**, a term that dates back to the 1970s when mask data was literally written to magnetic tape. At major semiconductor companies, tape-out is marked with a team celebration — because the next milestone is **silicon back**, months later, when the first physical chips return from the fab.

---

## The counterintuitive truth: Why EDA is a duopoly

You might wonder: if the tools that design chips are so critical — if a $500 billion semiconductor industry depends on them — why are there only two major EDA companies? Synopsys and Cadence together control roughly **70% of the $15+ billion EDA market**, with Siemens EDA (formerly Mentor Graphics) holding most of the rest.

The answer is **switching costs and integration**. The PnR tool doesn't work in isolation — it feeds timing data to the STA tool, which reads parasitic data from the extraction tool, which consumes the physical design database generated by the PnR tool. Each tool is calibrated against the foundry's process models and DRC decks. Switching from Synopsys to Cadence for even one tool in the flow can require **6-12 months** of requalification. And because foundries co-develop their process design kits (PDKs) with specific EDA vendors, you can't just plug in an alternative. TSMC and Synopsys have been co-developing N3 and N2 tool flows for years before those nodes reach production.

This is why Synopsys's $35 billion acquisition of Ansys in 2024 made strategic sense: integrating power, thermal, and electromagnetic simulation into the RTL-to-GDSII flow creates an even deeper moat.

---

## The numbers that matter

Let's ground this in concrete economics. Designing a leading-edge chip at the 3nm node costs an estimated **$500-800 million** in total — and a huge fraction of that is EDA licenses and the compute to run them. A single Synopsys PrimeTime seat might cost **$100,000-$200,000 per year**. A large design team might need 500-1,000 tool licenses across the flow. The compute farm for PnR, simulation, and verification might consist of **50,000-100,000 CPU cores** running around the clock for years.

This cost explosion is one of the key reasons only a handful of companies can afford to design at the leading edge: Apple, Qualcomm, NVIDIA, AMD, MediaTek, and a few others. Even Google, Amazon, and Microsoft — trillion-dollar companies — started their custom chip efforts (TPU, Graviton, Maia) knowing the design costs alone would run into the hundreds of millions.

---

## What's coming tomorrow

You now understand the full journey from code to silicon blueprint. But what does the chip *do* once it's built? Tomorrow, we dive into **CPU architecture** — the art of making a single core execute instructions as fast as possible through pipelines, caches, branch prediction, and out-of-order execution. You'll see why a 3 GHz processor doesn't execute 3 billion instructions per second (it can actually do *more*), and why predicting the future is the single most important thing a CPU does.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/day-15.toml"></div>
