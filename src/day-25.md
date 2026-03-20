# Day 25: China's Chip Ambitions — SMIC, Huawei, and the Technology Blockade

*How the world's second-largest economy is fighting to build semiconductor self-sufficiency against the most comprehensive technology embargo in modern history — and why the outcome will shape global technology for decades.*

---

## The Dream Before the Blockade

To understand where China's semiconductor industry stands today, you need to understand the ambition that preceded the crisis. In 2014, the Chinese State Council published a document called the **National Integrated Circuit Industry Development Promotion Outline** — essentially a blueprint for turning China into a semiconductor superpower. It was accompanied by the **National IC Investment Fund** (colloquially known as the "Big Fund"), a war chest initially capitalized at ¥138.7 billion (~$21 billion). The plan was straightforward: China consumed roughly 35% of global semiconductors but manufactured less than 16% of what it used. By 2030, the target was 70% self-sufficiency across the chip value chain.

The Big Fund invested broadly — over 70 companies across design, manufacturing, packaging, equipment, and materials. Phase II, launched in 2019, added another ¥204.1 billion (~$29 billion). By 2023, **Phase III** arrived at a staggering ¥344 billion (~$47.5 billion), making the total government-directed investment across all three phases exceed **¥686 billion (~$97 billion)**. And that's just the national fund — provincial and municipal funds added hundreds of billions more. By some estimates, total Chinese state-directed semiconductor investment between 2014 and 2025 exceeds **$150 billion**.

The money produced real results — but in an uneven pattern that reveals everything about where semiconductor self-sufficiency is genuinely hard versus merely expensive.

## SMIC: The Crown Jewel Under Siege

**Semiconductor Manufacturing International Corporation** was founded in 2000 in Shanghai by Richard Chang, a veteran TSMC executive who'd previously built fabs in China for other companies. From the start, SMIC existed in TSMC's shadow — and in its legal crosshairs. TSMC sued SMIC twice for trade secret theft, eventually winning a $200 million settlement and SMIC shares in 2009. Chang resigned, and the company spent years rebuilding credibility.

By the late 2010s, SMIC had bootstrapped itself to **14nm FinFET production** — roughly equivalent to where Intel and TSMC stood around 2014. Their 14nm process, called N+1, entered risk production in late 2019 and volume production in 2020. Not cutting-edge, but genuinely competitive for many applications: IoT devices, automotive chips, display drivers, power management ICs.

Then came the hammer. In December 2020, SMIC was added to the U.S. **Entity List**, restricting its access to American technology. The practical effect: SMIC could no longer freely purchase equipment from **Applied Materials**, **Lam Research**, or **KLA** — three American companies that dominate roughly 40-45% of the global semiconductor equipment market. They could still buy some tools, but anything capable of producing chips at 10nm or below required specific licenses that the U.S. government rarely granted.

### The Huawei Mate 60 Pro Shock

In August 2023, Huawei quietly launched the Mate 60 Pro smartphone. Teardowns by **TechInsights** revealed something that sent shockwaves through Washington: the phone's **Kirin 9000S** processor was fabricated on a process that achieved transistor densities broadly comparable to a **7nm node**. SMIC had apparently manufactured it using their "N+2" process — without EUV lithography.

How? The same way TSMC and Samsung made 7nm chips before EUV became available: **multi-patterning with deep ultraviolet (DUV) lithography**. Specifically, SMIC appears to use ASML's **NXT:2000i** immersion DUV scanner (193nm wavelength, 1.35 NA) with **self-aligned quadruple patterning (SAQP)** for the most critical metal layers. This is the exact approach TSMC used for its first-generation N7 process in 2018.

But there's a crucial difference: **yield and cost**. TSMC's DUV-based 7nm achieved mature yields reportedly above 90%. Industry analysts estimate SMIC's N+2 yields for the Kirin 9000S at somewhere between **10% and 30%** — meaning 70-90% of finished dies are defective and discarded. When your yield is 15% instead of 90%, your effective cost per working chip is roughly **6× higher**. For a flagship smartphone sold to prove a political point, that's acceptable. For commercial competitiveness at scale, it's devastating.

SMIC's N+2 also demands **significantly more patterning steps** than an EUV-based 7nm process. Where TSMC's EUV N7+ uses single exposures for critical layers, SMIC must do four exposures for the same layer using SAQP. That means 4× the litho time, 4× the overlay error accumulation, and roughly **2-3× the total mask count**. Each additional patterning step is another opportunity for defects.

### SMIC's Actual Capacity

SMIC operates **twelve fabs** across China (Shanghai, Beijing, Tianjin, Shenzhen, and others). Their total installed capacity is approximately **805,000 wafer starts per month** (8-inch equivalent) as of late 2025. Revenue in 2024 was approximately $8.0 billion — making SMIC the world's **third-largest pure-play foundry** after TSMC ($87.1 billion) and Samsung Foundry (~$13 billion).

But the revenue breakdown tells the real story. Over 70% of SMIC's revenue comes from **28nm and above** — mature nodes used for display drivers, power management, WiFi/Bluetooth controllers, and similar commodity chips. Their advanced node revenue (14nm and below) is likely under 20%, with the 7nm-class process contributing a tiny fraction — almost exclusively Huawei's HiSilicon designs.

The counterintuitive insight: **SMIC's strategic importance isn't about leading-edge at all.** China's real semiconductor vulnerability is in the mundane chips — the 28nm-90nm devices that go into every car, appliance, industrial controller, and military system. SMIC's massive expansion at mature nodes (they're building multiple new 28nm fabs) addresses the more immediate national security concern.

## Huawei and HiSilicon: The Design Powerhouse

Huawei's semiconductor subsidiary **HiSilicon Technologies** was, before the blockade, one of the world's most impressive chip design houses. Founded in 2004, HiSilicon grew from designing simple networking ASICs to creating the **Kirin** smartphone processors, **Ascend** AI accelerators, **Kunpeng** server CPUs, and **Balong** 5G modems.

The Kirin 990 (2019), fabbed on TSMC's 7nm+ EUV process, was genuinely competitive with Qualcomm's Snapdragon 865. The Ascend 910 (2019) could trade blows with NVIDIA's V100 in some AI training benchmarks. HiSilicon had climbed to become the **world's seventh-largest chip designer** by revenue, at roughly $8.2 billion in 2020.

Then the Entity List designation in May 2020 — expanded in August 2020 to close the "foundry loophole" — cut HiSilicon off from TSMC. The impact was immediate and brutal: HiSilicon's revenue reportedly collapsed by over **80%** in 2021. Huawei had stockpiled chips ahead of the ban, but those inventories depleted. The company's smartphone market share in China cratered from 42% (Q4 2020) to below 8% by mid-2022.

### The Comeback Attempt

The Kirin 9000S in the Mate 60 Pro marked Huawei's return — but with significant compromises. The chip integrates roughly **11.3 billion transistors** on an approximately 107mm² die (compared to Apple's A17 Pro at 103mm² with 19 billion transistors on TSMC 3nm). Its CPU performance is roughly comparable to a Snapdragon 888 from 2021 — competitive enough for a smartphone, but 2-3 years behind the leading edge.

More critically, **Huawei's 5G modem** situation remains constrained. The Kirin 9000S integrates a 5G modem, but TechInsights analysis suggests its design makes compromises to work within SMIC's process limitations. Huawei has had to be creative: some reports suggest the modem uses non-standard design techniques to compensate for the less advanced transistors.

The **Ascend 910B** AI accelerator tells a parallel story. Announced in 2023 as an alternative to NVIDIA's A100 (which China can no longer import), the 910B is reportedly fabbed on SMIC's 7nm-class process. Benchmark comparisons are scarce — Huawei doesn't publish detailed specs — but credible estimates place its training performance at roughly **60-80% of an A100** and **30-40% of an H100**. For some Chinese AI companies and government entities that cannot legally acquire NVIDIA chips, 60% of an A100 is infinitely better than 0% of an H100.

Huawei reportedly ordered over **100,000 Ascend 910B** chips in 2024, and companies like Baidu, iFlytek, and China Telecom have deployed them in data centers. The Chinese government itself mandates Ascend chips for certain state-funded AI projects.

## The Equipment Chokepoint

The most devastating aspect of the technology blockade isn't the chip design tools or the finished chips — it's the **manufacturing equipment**. Building a modern semiconductor fab requires machines from a handful of companies, most headquartered in countries allied with the United States:

- **ASML** (Netherlands): The sole supplier of EUV lithography scanners. Also dominant in high-end DUV immersion scanners. Revenue: €28.3 billion (2024).
- **Applied Materials** (USA): Largest equipment company overall. Dominates deposition, etch, and inspection. Revenue: $27.2 billion (FY2024).
- **Lam Research** (USA): #1 in plasma etch, strong in deposition. Revenue: $14.9 billion (FY2024).
- **Tokyo Electron** (Japan): #2 in coater/developers, strong in deposition and etch. Revenue: ¥2.09 trillion (~$14 billion, FY2024).
- **KLA** (USA): Dominant in process control, inspection, and metrology. Revenue: $10.5 billion (FY2024).

Together, these five companies supply roughly **70-75% of all semiconductor manufacturing equipment**. The October 2022 export controls — expanded in October 2023 and again in late 2024 — restrict China's access to:

- All EUV equipment (ASML; already informally blocked since ~2019)
- Advanced DUV scanners (ASML's NXT:2050 and above, restricted from January 2024)
- Equipment capable of depositing, etching, or inspecting at advanced geometries
- Semiconductor manufacturing equipment parts and servicing

The **servicing restriction** is often overlooked but arguably the most impactful. Semiconductor equipment requires constant maintenance — ASML scanners need field service engineers for regular upkeep, laser source replacements, and software updates. Applied Materials tools need chamber rebuilds and parts. Without OEM servicing, equipment degrades. Industry estimates suggest that without proper maintenance, a modern lithography scanner's **overlay accuracy degrades significantly within 12-18 months**, and the tool may become inoperable within 2-3 years.

### The Indigenous Equipment Push

China is spending furiously to develop domestic alternatives. **Naura Technology** (北方华创) is the largest Chinese equipment maker, producing CVD, PVD, etch, and oxidation/diffusion tools — mostly for 28nm and above. **AMEC** (Advanced Micro-Fabrication Equipment, 中微公司) makes CCP and ICP etch tools that have reportedly been qualified for some processes down to 5nm-class geometries. **Shanghai Micro Electronics Equipment (SMEE)** is attempting to build DUV lithography scanners, but their most advanced publicly demonstrated tool, the SSA/800-10W, achieves **90nm resolution** — roughly where ASML was in 2004.

The gap in lithography is perhaps the most illustrative. ASML's current production DUV scanner, the NXT:2050i, achieves **38nm half-pitch** with single patterning. SMEE's best tool is at 90nm. That's a **20-year technology gap** in the most critical tool category. Lithography accounts for roughly 30-35% of total equipment spending in a leading-edge fab, and it's the one tool where you cannot compensate with clever engineering workarounds. Either your scanner can print the features, or it can't.

For other equipment categories, the gap is narrower. Chinese etch tools can handle mature nodes competently. Domestic CVD and PVD systems work for many applications. Inspection and metrology are perhaps the second-weakest link — KLA's process control tools are deeply embedded in yield engineering workflows, and Chinese alternatives lack the software sophistication and defect libraries built over decades.

## The EDA and Design Tool Gap

Beyond equipment, China faces a critical dependency in **Electronic Design Automation (EDA)** — the software used to design chips. Three companies dominate: **Synopsys** ($6.1B revenue, 2024), **Cadence** ($4.1B revenue, 2024), and **Siemens EDA** (formerly Mentor Graphics). Together they control roughly **80% of the global EDA market**, with near-total dominance in advanced-node design tools.

The October 2022 controls specifically restricted EDA tools for designing **Gate-All-Around (GAA) transistors** — the architecture TSMC, Samsung, and Intel are adopting at 2nm and below. This is strategically clever: even if SMIC somehow acquired the manufacturing equipment for 2nm, HiSilicon and other Chinese designers wouldn't have the software to design chips for it.

Chinese EDA companies exist — **Empyrean Technology** (华大九天) is the largest, with ~$140 million revenue in 2024. But they cover perhaps **30-40% of the full chip design flow**, primarily in analog and display driver design. For a complete digital SoC design at 14nm or below, Chinese designers still depend on Synopsys and Cadence for synthesis, place-and-route, and sign-off verification. Replacing these tools requires not just matching the algorithms but also building the **process design kits (PDKs)** that encode foundry-specific manufacturing rules — a task that requires intimate foundry-EDA collaboration over years.

## The Talent War

Perhaps the most underappreciated dimension of China's semiconductor push is the **talent question**. Building a world-class semiconductor industry requires tens of thousands of engineers with deep expertise in process integration, device physics, circuit design, and yield engineering. This expertise takes decades to accumulate and is notoriously tacit — it lives in people's heads, not in manuals.

China has aggressively recruited from TSMC, Samsung, and other established companies. TSMC's **Liang Mong-Song** — a former co-director of R&D who helped develop TSMC's 16nm FinFET and Samsung's 14nm FinFET — became SMIC's co-CEO in 2017 and is widely credited with accelerating SMIC's 14nm and 7nm development. Taiwan has responded by criminalizing certain forms of semiconductor talent recruitment, with penalties of up to 12 years imprisonment under its **Trade Secrets Act** amendments.

Chinese universities are scaling semiconductor education rapidly. Over **50 universities** have established integrated circuit schools or programs since 2020. But the gap remains stark: one 2023 estimate by the **China Semiconductor Industry Association** projected a shortfall of **200,000 skilled semiconductor workers** through 2025.

## The Bigger Picture: Self-Sufficiency vs. Competitiveness

Here's the counterintuitive truth: **China is simultaneously making extraordinary progress and falling further behind.** SMIC's 7nm-class process is a genuine technical achievement — no other foundry outside of TSMC, Samsung, and Intel has demonstrated it. Chinese equipment makers are advancing faster than anyone predicted five years ago. HiSilicon's ability to design competitive chips under severe constraints is impressive.

But the leading edge isn't standing still. While SMIC struggles with DUV-based 7nm at low yields, TSMC is ramping **N2 (2nm GAA)** in 2025, with **A16 (1.6nm with backside power)** following in 2026. Each generation widens the gap. By the time SMIC might achieve 5nm-equivalent production (optimistic estimates say 2027-2028), TSMC will be at 1nm.

The more realistic path to Chinese semiconductor self-sufficiency isn't about matching the leading edge — it's about building a **complete domestic supply chain at mature nodes** (28nm-7nm) that can serve China's enormous internal market for automotive, industrial, telecom, and consumer electronics. A chip doesn't need to be 3nm to control a car, run a 5G base station, or power an IoT sensor.

And in that mature-node domain, China is making undeniable progress. Chinese fabs are expected to account for over **30% of global mature-node capacity** (28nm and above) by 2027, up from roughly 18% in 2022. This concentration has its own geopolitical implications: the rest of the world worries about becoming dependent on Chinese mature chips the same way China worries about depending on TSMC for advanced ones.

## The $150 Billion Question

China's semiconductor saga is ultimately a test of whether money, determination, and a 1.4-billion-person domestic market can overcome a technology embargo backed by the world's most advanced democracies. The historical record offers mixed signals. The Soviet Union never matched Western semiconductor technology despite enormous investment. South Korea, Taiwan, and Japan all built world-class chip industries — but with full access to American technology, not against it.

The most likely outcome isn't clean victory or defeat for either side. It's a **bifurcated semiconductor world**: one ecosystem led by TSMC/ASML/Synopsys serving the U.S. and allies, and a parallel Chinese ecosystem that's 2-3 generations behind at the leading edge but increasingly self-sufficient for the chips that matter most for national security and economic function.

Whether that bifurcation makes the world safer or more dangerous is the question that will define technology geopolitics for the next decade.

---

*Tomorrow, we pivot from the geopolitical drama to something refreshingly tangible: **analog and specialty chips** — the sensors, power regulators, RF transceivers, and MEMS devices that make up 80% of all chip types but rarely make headlines. They're the chips that actually keep the modern world running — and they play by completely different rules than the digital processors we've been studying.*

---

<div class="quiz-placeholder" data-quiz-path="quizzes/day-25.toml"></div>
