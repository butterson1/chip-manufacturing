# Day 27: The Economics — Why Only Three Companies Can Afford Leading-Edge

*The semiconductor industry's dirty secret isn't physics — it's money. Building transistors at the atomic scale is astonishing. Paying for it is nearly impossible.*

---

## The $20 Billion Ante

Here's a number that should stop you cold: **$28 billion**. That's what TSMC is spending on a single fab — Fab 20 in southern Taiwan — to manufacture chips at the N2 (2nm-class) node. Intel's Fab 52 in Arizona? Roughly $20 billion. Samsung's planned expansion at Pyeongtaek? In the same ballpark. These are individual factories. TSMC's total capital expenditure for 2024 alone was approximately **$30–32 billion** — more than the entire GDP of Iceland.

This isn't gradual growth. In 2000, a leading-edge fab cost around $1–2 billion. By 2010, it was $4–5 billion. In 2020, $15–18 billion. The trajectory is relentlessly exponential, roughly **doubling every four to five years**. The industry even has a sardonic corollary to Moore's Law for this phenomenon: some call it "Moore's Second Law" or "Rock's Law" (after venture capitalist Arthur Rock), which observes that the cost of fabrication facilities doubles approximately every four years. At this rate, by the early 2030s, a single leading-edge fab could cross $40 billion.

Why does it keep getting more expensive? The answer touches everything we've studied in this course: EUV scanners at $380 million each (and a cutting-edge fab needs **15–20 of them**, so that's $6–8 billion just in lithography tools), increasingly exotic materials requiring specialized deposition and etch chambers, tighter contamination controls demanding more sophisticated cleanroom infrastructure, and the sheer complexity of process flows that now exceed 1,000 individual steps over three or more months per wafer.

## The Wafer Cost Iceberg

Let's trace the economics of a single 300mm wafer through a leading-edge process.

**Raw wafer cost:** A prime-grade 300mm silicon wafer from Shin-Etsu or SUMCO costs roughly **$100–150**. That's the cheap part. It's like saying a painting costs only a few dollars because that's what the canvas costs.

**Processing cost:** Running that wafer through an N3-class (3nm) process at TSMC adds approximately **$16,000–20,000** per wafer in total manufacturing cost. At the bleeding edge of N2 with EUV, estimates push toward **$20,000–25,000+**. This includes:

- **Lithography:** By far the biggest contributor, consuming 30–40% of the total wafer cost. Each EUV exposure step costs roughly $100–150 per wafer, and a leading-edge process might have 20–25 EUV layers plus additional DUV layers. That's $2,000–3,750 in lithography alone.
- **Deposition & etch:** Another 25–30%. Hundreds of individual film deposition and etching steps, each requiring precisely controlled vacuum chambers running exotic precursor gases.
- **Metrology & inspection:** 10–15%. You can't improve what you can't measure, and at these dimensions, measurement itself is extraordinarily expensive. KLA's e-beam inspection tools cost $50–80 million each.
- **CMP, implantation, cleaning, and other steps:** The remaining 15–25%.

**Depreciation matters enormously.** Those $380M EUV tools are depreciated over roughly 5–7 years. A single EUV scanner running 24/7 with 85%+ uptime can process about 120–150 wafers per hour (after all overhead). At a wafer cost of ~$100 per EUV layer, ASML's tools must earn back roughly $200,000–300,000 *per day* just to cover their depreciation. This is why utilization rates are existential for fabs — a tool sitting idle is burning cash at a terrifying rate.

**Yield amplifies everything.** If your yield is 80%, you're effectively paying $20,000 for 80% of a wafer's usable dice — meaning each working die costs 25% more than perfect yield would suggest. At a new node, where yields might start at 30–50% during ramp-up, the effective cost per good die can be **2–3× higher** than at maturity. This is why TSMC's legendary yield engineering isn't just a nice-to-have; it's the core of their economic moat. Every percentage point of yield improvement on a $20,000 wafer translates to millions of dollars across a production run.

## What Comes Off the Wafer

Let's do some back-of-the-envelope math that illuminates why chip economics are so counterintuitive.

Take Apple's A17 Pro, manufactured on TSMC's N3B process. The die size is approximately **103 mm²**. A 300mm wafer has a usable area of roughly 70,685 mm². After accounting for edge losses (a circular wafer yielding rectangular dice leaves waste around the perimeter), you can fit approximately **580–620 gross dice** on a wafer.

At a mature N3 wafer cost of ~$17,000–20,000 and a yield of perhaps 75–80%, you get roughly **440–500 good dice**. That puts the **manufacturing cost per die at around $35–45**. Apple sells an iPhone 15 Pro for $999–$1,199. The most sophisticated piece of silicon in the device — containing 19 billion transistors fabricated at dimensions smaller than a virus — costs less than a modest restaurant dinner.

Now contrast that with NVIDIA's H100, which uses TSMC's N4 process. The die is a massive **814 mm²** — approaching the practical maximum for a single reticle (the area a lithography tool can expose in one shot, roughly 858 mm² or 26mm × 33mm). From a 300mm wafer, you get only about **60–70 gross dice**. At a wafer cost of ~$16,000–18,000 and a yield that large dice make brutally unforgiving (perhaps 50–65% for a die this size), you're looking at maybe **35–45 good dice per wafer**. That's a manufacturing cost of roughly **$350–500 per die** — before packaging, testing, HBM stacking, and the CoWoS interposer (which adds another $500–1,000+ to the bill).

NVIDIA sells H100 modules for $25,000–40,000 each. The gross margins are staggering — north of **70%** — but they reflect the enormous R&D investment amortized across each chip, not just manufacturing costs.

**The key insight:** die size and yield interact *multiplicatively*. Doubling your die area doesn't just halve the number of dice per wafer — it also typically *decreases* yield because a larger die has more area to catch random defects. This is precisely why AMD's chiplet strategy (covered in Day 13) was so economically brilliant. By breaking EPYC into multiple smaller chiplets, AMD kept each die small enough to maintain high yield, while still assembling a massive multi-die product. A monolithic 600mm² die at 70% yield gives you ~70 good dice per wafer. Eight 75mm² chiplets at 90% yield each give you far more working silicon per wafer, even accounting for packaging costs.

## The Design Cost Catastrophe

If fab costs are scary, design costs are existential.

According to IBS (International Business Strategies), the total cost to design a chip at **3nm** is approximately **$590–800 million**. At 5nm, it's roughly $416–540 million. At 7nm, about $297–350 million. Compare that to 28nm, where a full chip design might cost $50–80 million — still enormous, but within reach of many more companies.

Where does this money go?

**Engineering headcount** is the largest component. A leading-edge SoC design team might number **1,000–2,000+ engineers** working for 3–4 years. At fully loaded costs of $250,000–400,000 per engineer per year (in Silicon Valley; somewhat less in other regions), that's $750M–$3.2B in labor alone across the full program. However, IBS's $590M figure captures the *incremental* design cost attributable to the specific node — including the new IP blocks, physical design challenges, and verification effort unique to that process.

**Verification and validation** consume 60–70% of the total design effort, as we explored on Day 15. At advanced nodes, the number of potential failure modes explodes. Timing corners multiply (you might need to verify across 50–100+ PVT corners at 3nm vs. 20–30 at 28nm). New physical effects — like self-heating in FinFETs, complex electromigration in narrow copper wires, and layout-dependent effects — create verification scenarios that didn't exist at larger nodes.

**EDA tool licenses** are another substantial line item. Synopsys and Cadence — the duopoly that controls 80%+ of the advanced EDA market — charge annual licenses that can run **$50–100 million per year** for a large design team using their full stack. These tools are not optional: you literally cannot design a 3nm chip without them.

**IP licensing** adds more. ARM core licenses, interface IP (PCIe, DDR, USB), analog blocks, standard cell libraries, memory compilers — buying pre-designed and pre-verified blocks saves development time but costs tens of millions.

**Mask sets** deserve special mention. The set of photomasks needed to manufacture a leading-edge chip now costs **$10–20 million** at 3nm (up from $1–2 million at 28nm). These are the physical templates used in lithography — massive quartz plates patterned with features at 4× the wafer scale. Each mask layer must be essentially perfect; a single defective mask means scrapping the whole set. If your design has a bug that requires a mask respin (redoing the physical layout and manufacturing new masks), that's another $10–20M and 2–3 months of delay. This is why pre-silicon verification is so obsessively thorough.

## The Oligopoly at the Frontier

These economics explain why the leading-edge foundry business has collapsed into an oligopoly of essentially **three companies**: TSMC, Samsung Foundry, and Intel Foundry Services (which is still trying to prove it belongs in this conversation).

Consider the math. To build a leading-edge fab ($20–28B), fill it with tools, ramp yield, and keep it running, a company needs to generate enough revenue to justify the investment. TSMC's annual capex of $30B+ is funded by revenue of approximately **$87–90 billion** (2024). The company can afford this because it serves virtually every major fabless chip company — Apple, NVIDIA, AMD, Qualcomm, Broadcom, MediaTek — and can spread that astronomical fixed cost across enormous wafer volumes.

Samsung can partially justify its foundry investment because its massive memory business (the world's largest) shares some infrastructure, materials expertise, and engineering talent. Even so, Samsung Foundry has struggled with yields and customer wins, reportedly losing ground to TSMC at advanced nodes.

Intel, under Pat Gelsinger's IDM 2.0 strategy (and now under his successors), bet $100B+ over five years on building world-class foundry capacity. But the company has repeatedly slipped on process technology milestones and struggled to win external foundry customers who trust TSMC. Intel 18A (its 1.8nm-class process with backside power delivery and gate-all-around transistors) represents a make-or-break moment.

**No one else can play this game.** GlobalFoundries — once AMD's manufacturing arm — abandoned leading-edge development in 2018, freezing at 12nm/14nm. SMIC, China's champion (Day 25), has achieved a 7nm-class process through heroic DUV multi-patterning but operates at yields and costs that are commercially difficult, and export controls block its access to EUV. UMC, SMIC's Taiwanese rival, focuses on mature nodes. The field has narrowed not because others don't want to compete, but because the capital requirements and technical complexity create barriers that are effectively insurmountable.

This concentration carries profound economic implications. **TSMC's pricing power is enormous.** The company reportedly charges a 20–30% premium over Samsung for equivalent process nodes, and customers pay it willingly because TSMC's yield advantage translates into lower effective die costs even at higher wafer prices. When TSMC raised prices by 6–9% in 2023 (after a larger hike in 2022), the industry had no choice but to absorb it. Where else would you go?

## The Fabless Revolution and Its Discontents

The extreme economics of chip manufacturing drove the **fabless-foundry split** that now defines the industry. In the 1980s, most chip companies were IDMs (Integrated Device Manufacturers) that designed and manufactured their own chips: Intel, Motorola, TI, IBM. Morris Chang's founding of TSMC in 1987 enabled a radical alternative: companies could design chips without owning a fab.

Today, the fabless model dominates advanced logic. NVIDIA ($2.7 trillion market cap as of early 2025) owns zero fabs. Apple designs the most commercially successful chips in history and owns zero fabs. Qualcomm, Broadcom, AMD, MediaTek — all fabless. The ten largest fabless chip companies collectively represent over **$5 trillion** in market capitalization, yet their physical manufacturing footprint is zero.

This is economically efficient but strategically precarious. Every one of these companies depends on TSMC for its most critical products. During the COVID-era semiconductor shortage of 2020–2022, fabless companies discovered the downside of owning no manufacturing: when demand spikes, you're at the mercy of your foundry's allocation decisions. Apple, as TSMC's largest customer (~25% of revenue), gets priority. Everyone else queues up.

The design cost crisis is also reshaping which companies can afford to *design* at leading-edge nodes. In 2000, hundreds of companies designed chips at the leading edge (then 180nm). By 2010 at 28nm, perhaps 50–100 companies could justify the cost. Today at 3nm, the list of companies doing full custom SoC designs is arguably **fewer than 15–20** globally. Many chip companies continue to design at mature nodes (28nm, 40nm, 65nm) where design costs are manageable and the economics make sense for their applications.

## The Hidden Economics of Mature Nodes

Here's a fact that surprises people fixated on the leading-edge race: **mature nodes are a gold mine.**

Texas Instruments operates fabs running processes from 130nm to 45nm — technology that's 10–20 years old. The company's gross margin? A stunning **58–62%**. How? Those fabs are **fully depreciated**. The equipment has been paid off for years. A wafer that cost $3,000–5,000 to produce on already-paid-for tools generates enormous margin when the resulting chips sell for hundreds or thousands of dollars worth of aggregate revenue.

Analog Devices, NXP, Infineon, STMicroelectronics — all operate highly profitable businesses on mature processes. The automotive industry, industrial automation, IoT, power management, and RF communications all run on chips manufactured at 28nm and above. These chips don't make headlines, but they constitute approximately **70–80%** of all chips by volume and about **50–60%** by revenue.

The economics at mature nodes are fundamentally different from leading-edge. Design costs at 65nm might be $20–30M — achievable for mid-size companies or even well-funded startups. Wafer costs are $2,000–4,000. Depreciated fabs have operating costs that are a fraction of leading-edge facilities. The trade-off is lower transistor density and performance, which is perfectly fine for chips that need to be cheap, reliable, and power-efficient rather than blazing fast.

This explains China's strategy at mature nodes (Day 25): subsidized fabs running 28nm and above, targeting the vast market for "good enough" chips that run everything from washing machines to automobiles. China can't compete at 3nm, but it doesn't need to for the majority of the chip market.

## The Cost Disease Dilemma

The semiconductor industry faces what economists might recognize as a variant of **Baumol's cost disease**, but in reverse. In Baumol's original formulation, sectors like education and healthcare see rising costs because they can't easily automate labor. In semiconductors, the problem is that each generation of automation (EUV tools, advanced deposition systems, AI-driven computational lithography) costs dramatically more than the last.

This creates a paradox: Moore's Law has made transistors essentially free on a per-unit basis (the cost per transistor has fallen by roughly **8 orders of magnitude** since 1970), but the fixed cost of accessing each new generation of "free transistors" has risen to levels that only a handful of entities on Earth can afford. It's as if water were nearly free per gallon, but building a new water treatment plant cost $30 billion.

The industry's response has been threefold:

1. **Consolidation:** The number of leading-edge manufacturers has collapsed from dozens to three (or arguably two and a half).
2. **Specialization:** Companies pick their lane — leading-edge logic, mature analog, memory — rather than trying to do everything.
3. **Government subsidy:** The CHIPS Act and equivalents (Day 24) represent governments deciding that the economics are too brutal for private markets alone, at least for strategic reasons.

## Where It All Leads

The economics of semiconductor manufacturing are ultimately what give this industry its unique character. It's a business where the product gets better and cheaper every generation, but the means of production get more expensive and exclusive. It rewards scale like almost no other industry: the difference between producing 10,000 wafers per month and 100,000 wafers per month isn't 10× the cost — it's maybe 3–4× the cost, because most of the expense is in the fixed infrastructure. This is why fab utilization rates above 80% are the difference between profit and catastrophic loss.

The companies that survive and thrive are those that can sustain the treadmill: invest $30B this year to earn enough revenue to invest $35B next year, all while pushing yield high enough and designing chips compelling enough to keep customers paying premium prices. It's a virtuous cycle for the winners and a death spiral for everyone else.

Tomorrow, we close this course with the most exciting question of all: **What comes next?** Gate-all-around transistors are already in production. Two-dimensional materials like molybdenum disulfide promise to extend scaling beyond silicon's limits. Optical interconnects could break the bandwidth bottleneck. And some researchers whisper that silicon itself — the material that built the information age — may finally be approaching the end of its remarkable 60-year run. The economics that shaped today's industry will collide with tomorrow's physics in ways that could either concentrate power further or crack it wide open.

---

<div class="quiz-placeholder" data-quiz="quizzes/day-27.toml"></div>
