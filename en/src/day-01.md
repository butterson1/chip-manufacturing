# Day 1: What Is a Transistor?
## From Vacuum Tubes to MOSFETs — The Switches That Think

Every computation your phone, laptop, or car has ever performed comes down to one act: flipping a tiny electrical switch. That switch is the **transistor**, and it is, without exaggeration, the most mass-produced artifact in human history. In 2024 alone, the semiconductor industry manufactured roughly **1.4 × 10²¹** transistors — that's about 175 trillion for every human on Earth. To put it differently: humanity now produces more transistors per second than grains of rice per year.

This lesson traces the transistor's arc from room-sized vacuum tubes to structures smaller than a strand of DNA, and explains *why* this single device made the modern world possible.

---

## The Problem Before Transistors: Vacuum Tubes

In the 1940s, "computing" meant rooms full of glass vacuum tubes — devices that look like elongated light bulbs and work on a surprisingly simple principle. Heat a metal filament until electrons boil off its surface (thermionic emission), then use a charged metal grid between that filament and a plate to control whether those electrons flow or stop. Grid positive? Current flows. Grid negative? Current is blocked. A switch.

**ENIAC**, completed in 1945, used **17,468** vacuum tubes and consumed **150 kilowatts** of power — enough to run about 50 modern homes. It filled a room 50 feet long and 30 feet wide, weighed 30 tons, and could perform roughly 5,000 additions per second. The machine had a mean time between failures of about 5.6 hours because tubes burned out constantly, like light bulbs on overdrive. Technicians spent more time replacing tubes than scientists spent computing.

Vacuum tubes had three fatal flaws:

1. **Heat.** Each tube dissipated 1–2 watts. With thousands of them, the room became an oven.
2. **Size.** A single tube was about the size of your thumb. Scaling to millions was physically absurd.
3. **Reliability.** Hot filaments age and crack. The more tubes you added, the more often something failed.

The world needed a switch that didn't burn, didn't break, and could be made microscopically small. It needed a *solid-state* switch — one with no vacuum, no filament, no moving parts.

---

## December 23, 1947: The Point-Contact Transistor

At Bell Labs in Murray Hill, New Jersey, physicists **John Bardeen** and **Walter Brattain**, under the theoretical guidance of **William Shockley**, demonstrated the first working transistor. It was a crude device: a slab of germanium crystal with two gold point contacts pressed against its surface, separated by about 50 micrometers (roughly the width of a human hair). When they applied a small current to one contact, it controlled a larger current flowing through the other. Amplification — the same trick vacuum tubes performed, but in a chunk of crystal barely bigger than a pencil eraser.

The trio won the 1956 Nobel Prize in Physics. But the point-contact transistor was finicky and hard to manufacture. It was Shockley's follow-up invention — the **bipolar junction transistor (BJT)**, described in 1948 — that proved practical. Instead of fragile point contacts, the BJT used three layers of semiconductor material sandwiched together: an NPN or PNP stack. Current flowing into the thin middle layer (the "base") controlled a much larger current between the outer layers (collector and emitter).

BJTs dominated electronics through the 1960s and are still used today in analog circuits, RF amplifiers, and power electronics. But for digital computing — the world of ones and zeros — a different type of transistor would prove far more important.

---

## The MOSFET: The Transistor That Ate the World

In 1959, **Mohamed Atalla** and **Dawon Kahng**, also at Bell Labs, invented the **Metal-Oxide-Semiconductor Field-Effect Transistor**, or MOSFET. It is not an overstatement to call this the most important invention of the 20th century. Every processor, every memory chip, every GPU — virtually every digital integrated circuit made since the 1980s — is built from MOSFETs.

Here's how a MOSFET works, and this is worth understanding deeply because the rest of this entire course builds on it.

![MOSFET diagram: gate-controlled channel between source and drain](assets/day-01-mosfet.svg)

### The Structure

Imagine a flat slab of silicon — let's say it's **p-type** silicon, meaning it's been lightly contaminated ("doped") with atoms like boron that create an excess of positively charged "holes." Into this slab, two small regions of **n-type** silicon are implanted, doped with phosphorus or arsenic to create an excess of negatively charged electrons. These two n-type regions are called the **source** and the **drain**. Between them sits a thin channel of the original p-type silicon.

Now, directly above that channel, deposit an extraordinarily thin layer of **silicon dioxide** (SiO₂) — an insulator, like glass. On top of that oxide, place a conductive electrode: the **gate**. In early MOSFETs this gate was metal (hence "Metal-Oxide-Semiconductor"), though modern transistors use polysilicon or metal alloys.

The gate sits above the channel but is electrically isolated from it by the oxide layer. This is crucial.

### The Magic: Field Effect

With no voltage applied to the gate, current cannot flow between source and drain. Why? Because the p-type channel between them acts like two back-to-back diodes — electrons from the n-type source hit a wall of p-type silicon and stop. The switch is **off**.

Now apply a positive voltage to the gate. The electric field from the gate penetrates through the thin oxide and into the silicon below. This field repels the holes in the p-type channel and attracts electrons from the source and drain regions. If the voltage is high enough (the **threshold voltage**, typically 0.2–0.7 volts in modern chips), a thin layer of electrons accumulates at the surface of the channel, effectively converting it from p-type to n-type. Now there's an unbroken n-type path from source to drain. Current flows. The switch is **on**.

Remove the gate voltage, the electrons disperse, and the channel reverts to p-type. Switch off.

This is the field effect: a voltage on the gate controls current through the channel *without any current flowing through the gate itself*. The gate is insulated. It's like controlling a water valve by waving a magnet near it — influence without contact. This near-zero gate current is why MOSFETs are so power-efficient compared to BJTs, where the base *does* draw current.

### Why MOSFETs Won

Three properties made the MOSFET king:

1. **Scalability.** A MOSFET is essentially a flat, planar structure — source, drain, gate, oxide. It can be shrunk photographically. Make the pattern smaller, and the transistor gets smaller. This is the foundation of Moore's Law, which we'll cover in Day 4.

2. **Low static power.** Because the gate is insulated, a MOSFET in the "off" state draws almost no current (in practice there's a tiny leakage, but it's minuscule). A BJT's base always bleeds a little current. When you have *billions* of transistors, the difference matters enormously.

3. **CMOS: The Complementary Trick.** In 1963, Frank Wanlass at Fairchild Semiconductor patented **Complementary MOS (CMOS)**, which pairs an NMOS transistor (n-type channel in p-type substrate) with a PMOS transistor (p-type channel in n-type substrate) in a push-pull arrangement. In a CMOS gate, one transistor is always off while the other is on, meaning current flows only during switching — not while holding a steady state. This dropped static power consumption to nearly zero and is *the* reason your phone's battery lasts all day despite containing billions of transistors.

---

## From Switch to Logic: How Transistors Compute

A single transistor is just a switch: on or off, 1 or 0. But combine a few transistors, and you get **logic gates** — circuits that perform Boolean operations.

Take the simplest example: a **CMOS inverter** (a NOT gate). Wire a PMOS transistor on top and an NMOS transistor on the bottom, connect their gates together as the input, and take the output from the junction between them. Input high (1)? The NMOS turns on, the PMOS turns off, and the output is pulled low (0). Input low (0)? The PMOS turns on, the NMOS turns off, output goes high (1). Two transistors, one inversion.

A **NAND gate** — which outputs 0 only when *both* inputs are 1 — requires just four transistors in CMOS: two NMOS in series and two PMOS in parallel. NAND is "functionally complete," meaning you can build *any* Boolean function from NAND gates alone. In theory, you could construct an entire processor using nothing but NAND gates (and in practice, standard cell libraries are heavily NAND-based).

We'll go deep on logic gates and how they compose into CPUs in Day 5. For now, the key insight is: **complex computation is just billions of simple switches, flipping on and off in choreographed patterns, billions of times per second.**

---

## How Small Are We Talking?

The transistors in Atalla and Kahng's 1959 MOSFET had gate lengths measured in **millimeters**. By 1971, Intel's 4004 — the first commercial microprocessor — packed 2,300 transistors with a gate length of **10 micrometers** (10,000 nanometers). Each transistor was about the width of a red blood cell.

Fast forward to 2024. Apple's M4 processor, fabricated by TSMC on its "3nm" process (N3E), contains approximately **28 billion transistors**. The actual gate length is around **12 nanometers** — not 3nm, as we'll explain in Day 6. For scale: a silicon atom is about 0.2 nanometers in diameter. The gate oxide in these transistors is roughly **1.2 nanometers thick** — a stack of just 5 atoms.

Here's the counterintuitive part: **the transistor switch itself is now so small that quantum mechanical effects start to matter.** Electrons can "tunnel" through the gate oxide if it's too thin, like a ball rolling through a wall instead of over it. Below about 1.5 nanometers of SiO₂, tunneling leakage becomes catastrophic. This is why, starting around the 45nm node in 2007, the industry replaced SiO₂ with **high-k dielectrics** — materials like hafnium dioxide (HfO₂) that provide the same capacitive coupling in a physically thicker layer, keeping the quantum gremlins at bay. Intel's Gordon Moore and his colleagues saw this coming decades earlier; solving it was one of materials science's great achievements.

---

## The Surprising Economics of a Transistor

Here's a number that should stop you in your tracks: a single transistor on TSMC's N3 process costs approximately **$0.000000005** — five billionths of a dollar. Transistors are, per unit, the cheapest manufactured objects on Earth. Cheaper than grains of rice. Cheaper than a single bacterium-sized droplet of ink.

But this cheapness is deceptive. The *factory* that makes those transistors — TSMC's Fab 18 in Tainan, Taiwan — cost over **$19.5 billion** to build. The lithography machines inside, made by ASML in the Netherlands, cost **$380 million each** and require three Boeing 747s to ship. Each one contains over 100,000 components, including a laser system that fires 50,000 droplets of molten tin per second to generate extreme ultraviolet light.

The transistor is cheap only because you make unfathomably many of them. The fixed costs are titanic; the marginal cost is almost zero. This economic structure — enormous capital expenditure amortized over billions of units — defines the entire semiconductor industry and explains why only three companies (TSMC, Samsung, Intel) can still afford to manufacture at the cutting edge. More on this in Day 27.

---

## Where Transistors Are Headed

The classic planar MOSFET — a flat gate sitting over a flat channel — ran into scaling limits around 2011. At the 22nm node, Intel introduced **FinFET** transistors, where the channel sticks up like a fin and the gate wraps around it on three sides. This gives the gate better control over the channel, reducing leakage and enabling further shrinking. Every leading-edge chip since then has used FinFETs.

But FinFETs are approaching their own limits. Starting in 2025, Samsung and TSMC are introducing **Gate-All-Around (GAA)** transistors, where the channel is a stack of thin silicon nanosheets completely surrounded by the gate on all four sides. Samsung calls theirs "MBCFET" (Multi-Bridge Channel FET); TSMC and Intel use variations under the "nanosheet" banner. GAA transistors will power the 2nm generation and beyond.

Further out, researchers are exploring **2D channel materials** like molybdenum disulfide (MoS₂), which could be thinned to a single atomic layer — about 0.7 nanometers thick — enabling channels far thinner than silicon can achieve. At MIT, labs led by **Tomás Palacios** have demonstrated functional transistors with 2D channels. We're not there yet for mass production, but the roadmap exists.

---

## Key Takeaways

- **A transistor is an electrically controlled switch.** Gate voltage controls current between source and drain. No mechanical parts.
- **The MOSFET dominates** because it scales beautifully, uses near-zero static power (especially in CMOS), and can be fabricated photographically.
- **The gate oxide is the hero.** That thin insulating layer between gate and channel is what makes field-effect control possible — and quantum tunneling through it is what keeps engineers awake at night.
- **Transistors are the cheapest objects ever mass-produced**, but the factories that make them are the most expensive ever built. This paradox shapes the entire industry.
- **We've gone from millimeter-scale to atom-scale in 65 years.** The next frontier — GAA, 2D materials — pushes into territory where "how many atoms wide?" is a real engineering question.

---

## Coming Tomorrow

If transistors are the bricks, silicon wafers are the foundation they're built on. But where does that silicon come from? Tomorrow, we'll trace the journey from **ordinary beach sand to the most chemically pure material humans have ever produced** — a crystal so perfect that if you scaled it up to the size of Earth, the largest impurity would be smaller than a tennis ball. The process involves temperatures above 1,400°C, acid baths, and a crystal-growing technique borrowed from 19th-century mineralogy. See you in Day 2.

---

{{#quiz quizzes/day-01.toml}}
