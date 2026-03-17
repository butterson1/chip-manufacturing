# Day 6: Process Nodes
## What "3nm" Actually Means (and Why It's Mostly Marketing)

Yesterday we built a CPU from scratch — NAND gates to adders to pipelines. Every step of that journey depended on one assumption: that we could make transistors *smaller*. Shrink the transistor, fit more on a chip, compute more per watt. Simple.

But here's the dirty secret of the semiconductor industry: **the number in a process node name hasn't corresponded to any physical measurement on the chip since roughly 2009.** When Intel says "Intel 4" or TSMC says "N3," those numbers are marketing labels — brand names, like "Grande" at Starbucks. They tell you approximately where a process fits in the generational pecking order, but if you pulled out an electron microscope and started measuring features on a "3nm" chip, you would not find anything that's 3 nanometers.

This isn't fraud. It's a story about how an industry's measurement system slowly diverged from physical reality — and why understanding that divergence is essential to making sense of modern semiconductors.

## The Golden Age: When the Number Meant Something

Let's rewind. In the 1970s and 1980s, process node names were delightfully literal. When Intel introduced its 3-micron process in 1979 for the 8086, the smallest feature you could print — typically the gate length of a transistor — was genuinely about 3 micrometers (3,000nm). The naming was descriptive. A 1.5µm process had 1.5µm gate lengths. A 0.8µm process had 0.8µm gate lengths. Engineers could look at a process name and immediately know the critical dimension.

This worked because photolithography had a straightforward relationship: the minimum printable feature was roughly proportional to the wavelength of light being used, divided by the numerical aperture of the lens. As fabs moved from mercury g-line (436nm) to i-line (365nm) to deep ultraviolet (248nm, then 193nm), features shrank proportionally.

Through the 1990s, the naming convention held. The 250nm node (introduced ~1997) really did have gate lengths close to 250nm. The 180nm node (~1999) had gate lengths near 180nm. Each generation shrank the critical dimension by roughly 0.7× — a factor that, when squared, gave you a 2× increase in transistor density per generation. This is the scaling factor baked into Moore's Law.

Then things got... creative.

## The Great Divergence: Gate Length vs. Node Name

Around the 130nm node (~2001), a gap began to open. Physical gate lengths started shrinking faster than the node name implied, because engineers discovered that the gate length didn't have to match the printable pitch. Through various tricks — over-etching, trimming techniques, and later immersion lithography — you could print a line at 130nm but etch the actual gate electrode down to 70nm. A shorter gate means faster switching, so fabs aggressively shortened gates while the node name tracked the lithographic pitch.

By the 65nm node (circa 2005-2006), the physical gate length had shrunk to about 35nm — roughly half the node name. At 45nm (~2007), gate lengths were around 25nm. The node name was becoming less a measurement and more a generation marker.

But the real break came at 22nm.

In 2012, Intel introduced its 22nm process with a revolutionary change: the FinFET transistor (which we covered on Day 1). Instead of a flat planar gate sitting on top of a silicon channel, the channel was carved into a thin vertical fin, and the gate wrapped around three sides. This was a fundamentally three-dimensional structure. The question "what is the gate length?" suddenly had an awkward answer — do you mean the fin height? The fin width? The distance the gate wraps along the channel direction? The concept of a single defining dimension no longer captured the complexity of the device.

Intel called it a 22nm process. The fin pitch was 60nm. The minimum metal pitch was 80nm. The "22" wasn't any of these numbers. It was just... the name.

## What Actually Defines a Process Today

If the node name doesn't correspond to a physical feature, what *does* differentiate one process from another? The industry tracks several real metrics:

**Transistor density** is the most honest measure. It's exactly what it sounds like: how many transistors can you fit per square millimeter of silicon. TSMC's N5 (5nm) process packs about 173 million transistors per mm². Their N3E (3nm enhanced) reaches approximately 291 million/mm². Intel's Intel 4 hits about 160 million/mm². For context, Apple's M2 Ultra die — fabricated on TSMC N5 — crams 134 billion transistors onto a 900mm² combined area.

But even transistor density can be gamed. The number depends heavily on the mix of logic cells used. A chip full of simple NAND gates will have higher density than one using complex multi-input gates with lots of routing. The industry consortium IEEE/IRDS tried to standardize this by defining logic density at a specific mix of gates, but each foundry still has latitude in how it reports numbers.

**Metal pitch** — the center-to-center spacing of the tightest metal interconnect layer — is probably the most physically meaningful metric. At TSMC's N3, the minimum metal pitch (M1) is about 23nm. At Intel 4, it's about 21nm. At Samsung's 3nm GAA process, roughly 25nm. These numbers correspond to real distances you could measure with an electron microscope, and they directly determine how densely you can route wires between transistors.

**Gate pitch** (also called CPP — contacted poly pitch) measures the repeating distance between adjacent transistor gates. TSMC's N5 has a gate pitch of 48nm. N3 tightens this to 48nm as well (they improved density through other means). Intel 4 uses a 50nm gate pitch. Intel 3 will push to 50nm too but add other density tricks.

**Fin pitch** (or, for Gate-All-Around nodes, nanosheet pitch) measures the spacing between the fins or nanosheets that form the transistor channel. TSMC N5: 25-27nm fin pitch. TSMC N3: 26nm. Intel 4: ~25nm.

So a "process node" is really a *bundle* of these dimensions plus the design rules (how close you can place different structures) and the number of metal layers available. It's less like a single measurement and more like a vintage year on wine — it tells you approximately when it was made and gives a rough quality signal, but the terroir matters more than the year.

## The Naming Arms Race

Here's where it gets cynically fascinating. Around 2016, the foundries realized that node names had become a marketing weapon. Customers — the Apples, Qualcomms, and NVIDIAs of the world — used them to market their own chips. "Built on cutting-edge 7nm technology!" sounds impressive to consumers, analysts, and investors. There was enormous competitive pressure to have the smallest number.

The result was a bizarre naming arms race. In 2018, TSMC shipped its "7nm" process (N7). Intel was still shipping "14nm" (14nm++). If you looked purely at the names, Intel appeared two full generations behind. But if you measured transistor density, Intel's 14nm delivered about 100 million transistors/mm² — within shouting distance of TSMC's N7 at about 96 million transistors/mm². Intel's "14nm" was roughly comparable to TSMC's "7nm" in actual transistor density.

This made Intel furious, and understandably so. They eventually capitulated and renamed their processes: "10nm Enhanced SuperFin" became "Intel 7." "Intel's 7nm" became "Intel 4." The old numbering might have been more honest, but it was commercial suicide to sell "Intel 10nm" against "TSMC 5nm" when the transistor densities were comparable.

Samsung added fuel to the fire. Their "3nm" GAA (Gate-All-Around) process, introduced in 2022, had a transistor density of roughly 150-170 million/mm² depending on the variant — which was comparable to or even lower than TSMC's "5nm" at 173 million/mm². Samsung essentially slapped a "3nm" label on a process that, by density metrics, was a 5nm-class product. They could justify it because they introduced GAA transistor architecture (a genuine innovation), but the number was pure marketing.

## A Surprising Truth: Bigger Node, Better Product?

Here's the counterintuitive fact that trips up even technically literate people: **a chip manufactured on a "larger" process node can absolutely outperform one on a "smaller" node.**

Consider the AMD EPYC 9654 server processor (launched 2022, TSMC N5) versus the Intel Xeon w9-3595X (launched 2024, Intel 3). Intel 3's transistor density (~200M/mm²) is higher than TSMC N5's (~173M/mm²), despite "Intel 3" sounding like it should be larger than "5nm." The naming implies Intel is a generation behind; the physics say otherwise.

Or consider analog and RF chips. Texas Instruments' best-selling products are manufactured on 65nm and 130nm processes — nodes that digital designers abandoned 15-20 years ago. But for power management, sensor interfaces, and radio frequency circuits, those older processes are *superior*. They handle higher voltages, have lower noise, and cost a fraction of leading-edge digital processes. TI operates some of its 130nm fabs at nearly 100% utilization. A "130nm" power management IC can be a more profitable product than a "3nm" digital chip, because the $2 billion fab that produces it was paid off a decade ago.

## The Real Physics: What Sets the Floor

If the names are marketing, where are the actual physical limits? What determines how small you can really make things?

The answer comes back to a handful of hard physics constraints:

**Quantum tunneling** sets a floor on gate oxide thickness. The gate oxide (now high-k dielectric, typically hafnium dioxide, HfO₂) must be thin enough for the gate's electric field to control the channel, but thick enough that electrons don't quantum-tunnel straight through it. Modern gate oxides are about 1-2nm of equivalent oxide thickness — roughly 5-10 atoms thick. You genuinely cannot go much thinner without electrons tunneling through, which causes gate leakage current and wastes power.

**Short-channel effects** set a floor on how short the gate (channel length) can be. When the channel becomes too short (currently around 5-12nm in production), the source and drain electric fields start to interfere with each other, and the gate loses control of the channel. This is called drain-induced barrier lowering (DIBL), and it's why the industry moved from planar transistors (where the gate only touches one side of the channel) to FinFETs (three sides) and now to Gate-All-Around nanosheets (all four sides). More gate contact = more electrostatic control = shorter channels work.

**Line edge roughness (LER)** becomes proportionally more damaging as features shrink. When you print a line that's supposed to be 20nm wide, the edges aren't perfectly smooth — they wiggle by ±1-2nm due to the statistical nature of photoresist chemistry (individual photoacid molecules are ~1-2nm). At 200nm, a ±2nm wobble is 1% of the width — irrelevant. At 20nm, that same wobble is 10% — it significantly changes the transistor's electrical characteristics from one device to the next. This random variation is one of the reasons why yields drop and design becomes harder at smaller nodes.

**Electromigration** limits how much current you can push through the tiny copper (or now cobalt and ruthenium) interconnect wires. Below about 20nm wire width, copper atoms get physically shoved by the electron current, like tiny bowling balls being pushed by a stream of marbles. Eventually the wire develops voids (open circuits) or hillocks (short circuits). This is why the industry is actively exploring ruthenium and molybdenum for the tightest wire layers — they resist electromigration better than copper.

## The Economics: Why Naming Matters More Than Physics

Behind the marketing absurdity lies a deadly serious economic reality. Each process node is staggeringly expensive to develop.

TSMC spent approximately $36 billion in capital expenditure in 2023 alone, the majority aimed at N3 and N2 development. A single EUV scanner from ASML costs $350-400 million (the new High-NA EUV machines will cost $380+ million *each*). A leading-edge fab costs $20-28 billion to build (TSMC's Arizona Fab 21 is budgeted at $40+ billion for two phases).

The design costs are equally eye-watering. Designing a complex chip on a 3nm process costs $500-800 million in engineering effort, according to IBS estimates. On 5nm, it's about $400-500 million. On 28nm — a mature node — it's about $40-50 million. This 10× cost gap means that only a handful of products have enough volume to justify leading-edge design: smartphone SoCs (billions of units), datacenter processors, and high-end GPUs.

This is why process node naming is so consequential. When Apple announces the A18 Pro is built on "3nm," that marketing claim reverberates through the entire supply chain. It justifies the premium price of the iPhone. It justifies TSMC's capital expenditure. It justifies ASML's R&D spending on EUV. The names are marketing, yes, but they're marketing that underpins a $600 billion industry's investment logic.

## A Rosetta Stone for Node Names

Here's a practical cheat sheet for cutting through the naming fog (approximate, as of 2025):

| Foundry Node | Transistor Density (M/mm²) | Min Metal Pitch | Gate Pitch | Transistor Type |
|---|---|---|---|---|
| Intel 7 (old "10nm ESF") | ~100 | 36nm | 54nm | FinFET |
| TSMC N7 | ~96 | 40nm | 54nm | FinFET |
| TSMC N5 | ~173 | 28nm | 48nm | FinFET |
| Intel 4 (old "7nm") | ~160 | 21nm | 50nm | FinFET |
| Samsung 3nm GAA | ~150-170 | 25nm | 48nm | GAA |
| TSMC N3E | ~291 | 23nm | 48nm | FinFET |
| Intel 18A (~"2nm") | ~250+ | 18nm | 45nm | GAA (RibbonFET) |
| TSMC N2 (2025) | ~350+ | ~21nm | 45nm | GAA |

Notice that Intel 4 and TSMC N7 have similar density despite the name implying a two-generation gap. And TSMC N3E has nearly double Samsung 3nm GAA's density, despite sharing the "3nm" label. The names are, at best, a rough ordinal ranking within a single foundry's lineup.

## The Future: Will Naming Ever Make Sense Again?

Probably not — but it might matter less. The industry is shifting from pure transistor scaling to *system-level* scaling. Chiplet architectures (which we'll explore in Week 2) let you mix and match process nodes: put the high-performance compute on 3nm, the I/O on 5nm, the analog on 28nm, and package them together. In this world, bragging about a single node name becomes less meaningful.

ASML's new High-NA EUV lithography (0.55 NA, versus 0.33 NA for current EUV) will enable tighter pitches — potentially sub-20nm metal pitch and below 40nm gate pitch. This will power TSMC's A14 (1.4nm class) and Intel's 14A processes around 2027-2028. But even these will be named in the same arbitrary way.

The honest metric — cost per transistor — tells the real story. For decades, each node made transistors cheaper. That trend broke around 28nm. Below 28nm, cost per transistor started *increasing* at advanced nodes due to EUV costs, multi-patterning complexity, and abysmal early yields. The 28nm node remains the sweet spot for cost-per-transistor, which is why it's the world's most widely manufactured process and why fabs keep building new 28nm capacity.

## What to Take Away

Process node names are generational labels, not measurements. The real metrics — transistor density, metal pitch, gate pitch — tell you what a process can actually do. And the economics of each node determine which products can afford to use it.

Tomorrow, we'll step inside the most extraordinary manufacturing environment humans have ever created: the semiconductor fab itself. A place where the air is 10,000 times cleaner than a hospital operating room, where a single speck of dust is a catastrophe, and where the machines cost more than commercial jetliners. We'll see how all these process technologies come together in a $20 billion cathedral of precision — and why the logistics of running a fab are almost as challenging as the physics.

---

<div id="quiz-placeholder" data-quiz-path="quizzes/day-06.toml"></div>
