# Day 4: Moore's Law
## The 60-Year Bet That Built the Modern World — and Why It's Getting Harder to Win

In 1965, a 36-year-old chemist named Gordon Moore sat down to write an article for *Electronics* magazine. He'd been asked to predict what would happen to semiconductors over the next decade. His employer, Fairchild Semiconductor, was making chips with about 50 transistors on them. Moore plotted the number of components per chip against time, drew a line through the data points, and made a prediction so audacious it would have sounded delusional from anyone without his credentials: the number of transistors on a chip would double every year.

He was right. And that simple observation — later revised to doubling every two years — became the most consequential self-fulfilling prophecy in the history of technology.

## A Law That Isn't a Law

Here's the thing that trips people up: Moore's Law is not a law of physics. Gravity doesn't care about your quarterly earnings. Thermodynamics doesn't negotiate with product roadmaps. Moore's Law is an *economic* observation dressed up with the authority of a scientific one.

What Moore actually noticed was this: at any given moment, there's an optimal number of components to put on a chip — the sweet spot where the cost per transistor is lowest. Put too few transistors on a chip, and you're wasting expensive silicon real estate. Put too many, and your yields crash because defects kill the oversized dies. That sweet spot, Moore observed, was moving — and it was moving at a remarkably consistent exponential rate.

The original 1965 paper predicted a doubling every 12 months. A decade later, in 1975, Moore revised this to every 24 months as the easy gains in circuit design started to plateau and the heavy lifting shifted to manufacturing improvements. His Caltech colleague Carver Mead later coined the term "Moore's Law," and the semiconductor industry adopted it not merely as a forecast, but as a *target*.

This is the crucial insight. Moore's Law persisted for six decades not because physics demanded it, but because the industry *organized itself* to deliver it. The International Technology Roadmap for Semiconductors (ITRS), published from 1999 to 2015, literally codified the expected pace of progress. Equipment makers, materials suppliers, EDA tool companies, and foundries all synchronized their R&D to hit the same targets. If you were ASML and you knew TSMC needed a scanner that could print 7nm features by 2018, you worked backwards from that date to figure out what optics, light sources, and stages you needed to deliver. The entire $600 billion semiconductor supply chain functioned as a single, loosely coordinated organism marching to Moore's drumbeat.

## The Exponential That Changed Everything

To grasp why Moore's Law matters, you have to internalize what exponential growth actually means over long timescales. The Intel 4004 processor in 1971 had 2,300 transistors. Apple's M2 Ultra, released in 2023, has 134 billion. That's a factor of 58 million. If cars had improved at the same rate, a 1971 Volkswagen Beetle would now travel at 1.8 billion miles per hour and cost a fraction of a cent.

But raw transistor counts are just the beginning. Moore's Law drove simultaneous improvements across multiple axes:

**Cost per transistor** collapsed. In 1970, a single transistor cost about $1 (roughly $8 in 2024 dollars). By 2020, a single transistor on a leading-edge TSMC chip cost about $0.000000005 — five billionths of a dollar. That's a factor of 1.6 billion in cost reduction. Nothing else in human manufacturing history comes close. Not steel, not solar panels, not genome sequencing.

**Performance skyrocketed.** Clock speeds went from the 4004's 740 kHz to the Pentium 4's 3.8 GHz in 2004 — a 5,000x improvement. Single-thread performance, measured by SPECint benchmarks, improved roughly 40% per year through the 1990s. A modern smartphone has more computing power than a 1990s Cray supercomputer that cost $30 million and needed its own cooling system.

**Power efficiency improved dramatically.** Dennard scaling (which we'll cover in Day 21) meant that as transistors shrank, they used proportionally less power. A modern ARM core performs the same computation as a 1990s desktop processor while consuming about 1/100,000th the energy.

These compounding improvements created the entire modern digital economy. Moore's Law didn't just make computers faster — it made them cheap enough to put everywhere. Into phones, into cars, into refrigerators, into $0.10 microcontrollers that live inside greeting cards that play music. The reason your smartphone exists, the reason cloud computing is economical, the reason AI training is feasible — it all traces back to the relentless halving of transistor cost and size.

## The Engine: Lithography-Driven Shrinks

So what actually *drives* Moore's Law? How do you keep making transistors smaller, cheaper, and better, decade after decade?

From the 1970s through the 2010s, the primary engine was **lithographic shrinking** — the topic we covered yesterday. Each new generation of lithography equipment could print smaller features, which meant you could pack more transistors into the same area of silicon. The progression was elegant:

| Era | Wavelength | Feature Size | Era Roughly |
|-----|-----------|-------------|-------------|
| g-line | 436 nm | 1,000–500 nm | 1980s |
| i-line | 365 nm | 500–350 nm | Early 1990s |
| KrF DUV | 248 nm | 250–130 nm | Late 1990s |
| ArF DUV | 193 nm | 90–45 nm | 2000s |
| ArF immersion | 193 nm (water) | 45–7 nm | 2010s |
| EUV | 13.5 nm | 7 nm and below | 2020s |

Each wavelength transition was a massive engineering undertaking. The jump from mercury lamp g-line to excimer laser KrF took years of development. The transition to immersion lithography (floating a water droplet between the lens and the wafer, which we discussed in Day 3) squeezed an extra decade out of 193nm light. And EUV — which we'll explore in depth on Day 8 — required 20 years and billions of dollars to bring to production.

But lithography was only half the equation. Each shrink also required new transistor architectures, new materials, and new process tricks. You couldn't just make everything smaller with the same silicon dioxide gate insulator — below about 1.2 nanometers thick, electrons would quantum-tunnel straight through it, causing fatal leakage current. Intel's solution in 2007 (at the 45nm node) was to replace silicon dioxide with hafnium-based "high-k" dielectrics, which could be physically thicker while remaining electrically thin. That single materials switch — from a compound humans had used for decades to one that had never been used in mass production — took over a decade of research.

Similarly, at the 22nm node in 2011, Intel introduced FinFET transistors (which we touched on in Day 1). The traditional planar transistor had the gate sitting on top of a flat channel, like a toll booth over a single-lane road. The FinFET wraps the gate around three sides of a thin vertical fin of silicon, giving it much better electrostatic control. It was like replacing the toll booth with a tunnel — the gate could squeeze the channel from three directions, shutting off leakage far more effectively. Every major foundry followed suit within three years.

## The Three Eras of Moore's Law

Looking back, we can divide Moore's Law into three distinct eras, each with different drivers and different challenges:

### Era 1: The Golden Age (1965–2005)

For forty years, the industry enjoyed what engineers call "happy scaling." Shrink the transistors and nearly everything got better simultaneously. Transistors got faster (shorter channel = faster switching), used less power per switch (Dennard scaling), and cost less per transistor (more transistors per wafer = lower cost each). It was a triple win, and it seemed almost too good to be true.

During this era, Intel's famous "tick-tock" model worked beautifully. Every "tick" was a shrink to a new process node. Every "tock" was a new microarchitecture on the existing process. Like clockwork, every two years brought a meaningful improvement. The entire PC industry — Microsoft, Dell, HP, software developers — could plan their roadmaps around this cadence. The Wintel duopoly thrived because consumers had a reason to buy new PCs every 3–4 years: the new ones were genuinely, dramatically better.

### Era 2: The Power Wall (2005–2015)

In 2004, Intel released the Pentium 4 "Prescott" at 3.8 GHz on a 90nm process. It ran so hot that the company had already designed — and cancelled — a 4 GHz version. The problem was fundamental: Dennard scaling had broken down.

Robert Dennard's 1974 scaling theory predicted that as transistors shrank, their power density (watts per square millimeter) would stay roughly constant. Smaller transistors would switch faster and use less voltage, offsetting the increased density. This held reasonably well through the 1990s. But at 90nm and below, leakage current — transistors drawing power even when they're supposed to be "off" — became unmanageable. The culprit was quantum mechanics: electrons tunneling through gate oxides that had become just a few atoms thick.

The result was the **power wall**. Clock frequencies flatlined around 3–5 GHz. Intel cancelled its single-threaded Tejas and Jayhawk architectures and pivoted hard to multicore — not because parallel computing was the best approach, but because it was the *only* approach. Instead of one core at 6 GHz, you got two cores at 3 GHz. Then four. Then eight. The raw transistor count kept doubling, but the way those transistors translated to performance changed fundamentally.

This era gave birth to the smartphone revolution, ironically *because* of the power wall. ARM's low-power architectures, which prioritized energy efficiency over raw clock speed, turned out to be exactly what a battery-powered pocket computer needed. Apple's acquisition of PA Semi in 2008 — a team of low-power chip designers — was a direct response to the power wall, and it led to the A-series and eventually the M-series chips that upended the entire computer industry.

### Era 3: The Economic Wall (2015–Present)

The third era is where things get genuinely scary for the industry. Transistors can still be made smaller. Physics hasn't actually run out of room (we'll talk about the physical limits shortly). The problem is cost.

TSMC's N5 (5nm) process reportedly costs $16,000–$17,000 per wafer to manufacture. Their N3 (3nm) process is estimated at $20,000 or more. Compare that to a 28nm wafer at perhaps $3,000. The cost per transistor is still falling at each new node — that's the whole point — but it's falling *slower* than it used to, and the upfront investment is staggering.

Building a fab for 3nm production costs roughly $20 billion. TSMC's planned Arizona fab (Fab 21) has a projected budget of $40 billion across its phases. Intel's Ohio fab complex will cost over $28 billion for the first two fabs, with a planned investment of $100 billion for the full complex. Samsung's Taylor, Texas fab is budgeted at $17 billion. These are numbers that rival the GDP of small nations.

The design costs are equally brutal. Designing a chip at 5nm costs an estimated $542 million, according to IBS. At 3nm, it's projected to exceed $700 million. Compare that to $28.5 million for a 65nm design. This means fewer companies can afford to design leading-edge chips at all. In 2002, there were about 30 companies designing at the leading edge. By 2024, there were effectively three: Apple, Qualcomm/Broadcom (via TSMC), and Nvidia. Everyone else has either moved to trailing nodes, gone fabless, or been acquired.

This is the real threat to Moore's Law. It's not that we can't make smaller transistors — it's that the club of people who can afford to is shrinking to a handful of hyperscalers and chip giants.

## The Numbers Game: What "3nm" Actually Means

Here's a dirty secret of the modern semiconductor industry, which we'll explore more in Day 6: the node names are marketing, not measurements.

Intel's "Intel 4" process has a minimum metal pitch (the distance between the centers of two adjacent metal interconnect wires) of about 30nm and a contacted poly pitch of 50nm. TSMC's "N3" has a minimum metal pitch of roughly 23nm and a fin pitch of 25nm. Neither of these numbers is 3 or 4 nanometers.

So what does "3nm" mean? Essentially nothing physical. It's a label that roughly indicates where on the Moore's Law curve a process sits in terms of transistor density and performance. TSMC's N3 delivers about 250–300 million transistors per square millimeter. Intel 4 achieves about 200 million. For reference, a silicon atom is about 0.2nm in diameter, so a "3nm" transistor's gate length is about 15 silicon atoms across. The actual transistor gate length at these nodes is typically 5–12nm.

The naming convention persists because it's useful for marketing and roadmap communication, even though it divorced from physical measurement around the 20nm node. We'll dig deeper into this on Day 6.

## The Death That Never Comes

Moore's Law has been declared dead more times than any comic book character. A 2003 Intel presentation warned that leakage power would make scaling below 65nm impractical. A 2016 *Nature* article declared the era of Moore's Law over. Nvidia CEO Jensen Huang told CES 2022 that "Moore's Law is dead." 

And yet, in 2024, TSMC began shipping N3E (enhanced 3nm) chips with over 300 million transistors per square millimeter, right on the exponential trend line drawn from 1965 data. Samsung announced GAA (Gate-All-Around) nanosheet transistors for its 3nm node. Intel previewed its backside power delivery technology, RibbonFET GAA transistors, and a roadmap to the 18A node (1.8nm equivalent). ASML delivered High-NA EUV scanners to Intel, capable of printing features below 8nm half-pitch.

How does the industry keep dodging the bullet? The answer is that "Moore's Law" has quietly evolved from a single metric (transistors per chip doubling every two years) into a more nuanced set of improvements:

- **Transistor density** continues to roughly double every 2–3 years through new architectures (FinFET → GAA nanosheet → CFET/complementary FET) and new lithography (EUV → High-NA EUV)
- **Performance per watt** improves through architectural innovation even when density gains slow
- **3D integration** — stacking chiplets and dies vertically — adds a whole new dimension (literally) to circumvent the 2D scaling limit
- **Heterogeneous integration** lets you combine dies built on different process nodes in a single package, putting each function on the most cost-effective process

The goalposts have moved, but the spirit of the law — that semiconductors get meaningfully better every couple of years, enabling new applications that were previously impossible — is alive.

## The Surprising Counterintuitive Truth

Here's the fact that startles even many engineers: **Moore's Law was never just about physics — it was about economics, and the economics have always been the harder constraint.**

Consider: the fundamental physical limit for silicon transistors is around 1–2nm gate length, limited by quantum tunneling and statistical variation (at that scale, a transistor's channel might contain only a handful of dopant atoms, and random variation in their placement causes huge performance swings). We're close to this limit, but not at it.

Meanwhile, the economic limits are already biting. TSMC's N2 (2nm) node, expected in 2025-2026, will use GAA nanosheet transistors. The engineering is ready. But can the market support $25,000+ wafers and $800 million design costs? Only if the chips being made are valuable enough — AI accelerators selling for $30,000+ each, smartphone SoCs going into a billion devices, or data center CPUs where a 15% performance improvement saves millions in electricity.

The paradox of Moore's Law in 2026 is this: we know *how* to keep making transistors smaller and better. The physics is hard but tractable. The question is whether enough customers can afford to pay for it, and whether the applications (AI training, autonomous vehicles, AR/VR) are valuable enough to justify the astronomical costs. Moore's Law's ultimate limit might not be the size of an atom — it might be the size of a checkbook.

## What Comes After

Moore's original observation was about 2D scaling on a silicon die. But the industry is already bending the rules. TSMC's SoIC (System on Integrated Chips) technology stacks multiple dies on top of each other with through-silicon vias (TSVs) just 6μm in diameter, achieving inter-die bandwidth that approaches what you'd get if the circuits were on the same die. AMD's 3D V-Cache stacks an additional 64MB of SRAM cache directly on top of the processor die, boosting gaming performance by 15% without shrinking a single transistor.

This is the "More than Moore" paradigm — continuing to deliver exponential improvement in what a chip can do, even if the transistors themselves aren't shrinking as fast as they once did. Advanced packaging, chiplets, heterogeneous integration, and 3D stacking are extending the spirit of Moore's Law by different means.

Tomorrow, we'll zoom in from the trend line to the actual logic inside the chip. How do transistors — the tiny switches we met on Day 1 — combine to perform computation? How does a NAND gate made of four transistors lead to a CPU that can run an operating system? We'll build up from the most basic logic gates to flip-flops, adders, and the fundamental building blocks that make silicon think. If Moore's Law is the *pace* of progress, logic gates are the *mechanism*.

---

<div style="margin-top: 2rem; padding: 1.5rem; background: #1a1a2e; border-radius: 8px; border: 1px solid #16213e;">

### 🧪 Test Your Knowledge

Take the Day 4 Quiz to test your understanding of Moore's Law!

{{#quiz quizzes/day-04.toml}}

</div>
