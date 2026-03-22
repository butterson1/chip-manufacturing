# Gün 25: Çin'in Çip Hırsları — SMIC, Huawei ve Teknoloji Ablukası

*Dünyanın ikinci büyük ekonomisi, modern tarihteki en kapsamlı teknoloji ambargosuna karşı yarı iletken kendi kendine yeterliliğini nasıl inşa etmeye çalışıyor — ve sonucun küresel teknolojiyi on yıllarca şekillendirecek olması.*

---

## Ablukadan Önceki Hayal

Çin'in yarı iletken endüstrisinin bugün nerede durduğunu anlamak için, krizden önce gelen hırsı anlamak gerekir. 2014'te Çin Devlet Konseyi, **Ulusal Entegre Devre Endüstrisi Geliştirme Tanıtım Taslağı** adlı bir belge yayınladı — esasen Çin'i yarı iletken süper gücüne dönüştürmenin bir planı. Buna, başlangıçta 138,7 milyar ¥ (~21 milyar $) sermayeyle kurulan **Ulusal IC Yatırım Fonu** (halk arasında "Büyük Fon" olarak bilinen) eşlik ediyordu. Plan açıktı: Çin küresel yarı iletkenlerin kabaca %35'ini tüketiyor ama kullandığının %16'sından azını üretiyordu. 2030'a kadar hedef, çip değer zinciri genelinde %70 kendi kendine yeterlilikti.

Büyük Fon geniş çaplı yatırım yaptı — tasarım, üretim, paketleme, ekipman ve malzeme alanlarında 70'ten fazla şirkete. 2019'da başlatılan II. Faz, 204,1 milyar ¥ (~29 milyar $) daha ekledi. 2023'te **III. Faz** şaşırtıcı bir 344 milyar ¥ (~47,5 milyar $) ile geldi ve üç fazın tamamında toplam hükümete yönlendirilmiş yatırım **686 milyar ¥'yi (~97 milyar $)** aştı. Ve bu sadece ulusal fon — il ve belediye fonları yüz milyarlarca daha ekledi. Bazı tahminlere göre, 2014 ile 2025 arasında toplam Çin devlet yönlendirmeli yarı iletken yatırımı **150 milyar doları** aşıyor.

Para gerçek sonuçlar üretti — ama yarı iletken kendi kendine yeterliliğinin gerçekten nerede zor, nerede sadece pahalı olduğunu gösteren dengesiz bir örüntüde.

## SMIC: Kuşatma Altındaki Taç Mücevher

**Semiconductor Manufacturing International Corporation**, 2000 yılında Şanghay'da, daha önce Çin'de diğer şirketler için fabrika kurmuş deneyimli bir TSMC yöneticisi olan Richard Chang tarafından kuruldu. Başından beri SMIC, TSMC'nin gölgesinde — ve hukuki hedefinde — var oldu. TSMC, SMIC'i ticari sır hırsızlığı nedeniyle iki kez dava etti ve sonunda 2009'da 200 milyon dolarlık uzlaşma ve SMIC hisseleri kazandı. Chang istifa etti ve şirket güvenilirliğini yeniden inşa etmek için yıllar harcadı.

2010'ların sonlarında SMIC, **14 nm FinFET üretime** ulaşmıştı — kabaca Intel ve TSMC'nin 2014 civarında bulunduğu yere eşdeğer. N+1 adlı 14 nm süreçleri 2019 sonunda risk üretimine ve 2020'de hacim üretimine girdi. En ileri değil, ama birçok uygulama için gerçekten rekabetçi: IoT cihazları, otomotiv çipleri, ekran sürücüleri, güç yönetimi IC'leri.

Sonra çekiç indi. Aralık 2020'de SMIC, ABD **Varlık Listesi'ne** eklendi ve Amerikan teknolojisine erişimi kısıtlandı. Pratik etki: SMIC artık **Applied Materials**, **Lam Research** veya **KLA** — küresel yarı iletken ekipman pazarının kabaca %40-45'ine hâkim üç Amerikan şirketi — den serbestçe ekipman satın alamıyordu. Bazı araçları hâlâ alabiliyorlardı ama 10 nm veya altında çip üretmeyi mümkün kılan her şey, ABD hükümetinin nadiren verdiği özel lisanslar gerektiriyordu.

### Huawei Mate 60 Pro Şoku

Ağustos 2023'te Huawei sessizce Mate 60 Pro akıllı telefonu piyasaya sürdü. **TechInsights** tarafından yapılan söküm incelemeleri, Washington'da şok dalgaları yaratan bir şeyi ortaya çıkardı: telefonun **Kirin 9000S** işlemcisi, **7 nm düğüme** kabaca karşılaştırılabilir transistör yoğunlukları elde eden bir süreçte üretilmişti. SMIC, görünüşe göre "N+2" sürecini kullanarak bunu — EUV litografi olmadan — üretmişti.

Nasıl mı? TSMC ve Samsung'un EUV kullanılabilir hâle gelmeden önce 7 nm çipler ürettiği aynı yolla: **derin ultraviyole (DUV) litografi ile çoklu desenle.** Spesifik olarak, SMIC, en kritik metal katmanları için ASML'in **NXT:2000i** daldırma DUV tarayıcısını (193 nm dalga boyu, 1,35 NA) **kendinden hizalamalı dörtlü desenleme (SAQP)** ile kullanıyor görünüyor. Bu, TSMC'nin 2018'de ilk nesil N7 süreci için kullandığı yaklaşımın aynısı.

Ama çok önemli bir fark var: **verim ve maliyet**. TSMC'nin DUV tabanlı 7 nm'si olgun verimlerde bildirilen %90'ın üzerine ulaştı. Endüstri analistleri SMIC'in N+2 verimlerini Kirin 9000S için **%10 ile %30 arasında** tahmin ediyor — yani bitmiş kalıpların %70-90'ı kusurlu ve atılıyor. Veriminiz %90 yerine %15 olduğunda, çalışan çip başına efektif maliyetiniz kabaca **6 kat daha yüksek**. Politik bir noktayı kanıtlamak için satılan bir amiral gemisi akıllı telefon için bu kabul edilebilir. Ölçekte ticari rekabetçilik için yıkıcı.

SMIC'in N+2'si ayrıca EUV tabanlı 7 nm sürecinden **önemli ölçüde daha fazla desenleme adımı** gerektiriyor. TSMC'nin EUV N7+'sı kritik katmanlar için tek pozlama kullanırken, SMIC aynı katman için SAQP kullanarak dört pozlama yapmalıdır. Bu 4 kat litografi süresi, 4 kat örtüşme hatası birikimi ve kabaca **2-3 kat toplam maske sayısı** demek. Her ek desenleme adımı, kusurlar için bir fırsat daha.

### SMIC'in Gerçek Kapasitesi

SMIC, Çin genelinde (Şanghay, Pekin, Tianjin, Shenzhen ve diğerleri) **on iki fabrika** işletiyor. 2025 sonları itibarıyla toplam kurulu kapasiteleri ayda yaklaşık **805.000 wafer başlangıcı** (8 inç eşdeğeri). 2024'teki gelir yaklaşık 8,0 milyar dolardı — SMIC'i TSMC (87,1 milyar $) ve Samsung Foundry (~13 milyar $) sonrasında dünyanın **üçüncü büyük saf dökümhanesi** yapıyor.

Ama gelir dağılımı asıl hikâyeyi anlatıyor. SMIC gelirinin %70'inden fazlası **28 nm ve üstünden** — ekran sürücüleri, güç yönetimi, WiFi/Bluetooth denetleyicileri ve benzeri emtia çipler için kullanılan olgun düğümlerden — geliyor. İleri düğüm gelirleri (14 nm ve altı) muhtemelen %20'nin altında; 7 nm sınıfı süreç çok küçük bir kesim oluşturuyor — neredeyse tamamen Huawei'nin HiSilicon tasarımları.

Sezgiye aykırı içgörü: **SMIC'in stratejik önemi en ileri üretimle ilgili değil.** Çin'in gerçek yarı iletken kırılganlığı sıradan çiplerde — her arabaya, ev aletine, endüstriyel denetleyiciye ve askeri sisteme giren 28nm-90nm cihazlarda. SMIC'in olgun düğümlerdeki devasa genişlemesi (birden fazla yeni 28 nm fabrika inşa ediyorlar) daha acil ulusal güvenlik endişesini karşılıyor.

## Huawei ve HiSilicon: Tasarım Güç Merkezi

Huawei'nin yarı iletken yan kuruluşu **HiSilicon Technologies**, ablukadan önce dünyanın en etkileyici çip tasarım evlerinden biriydi. 2004'te kurulan HiSilicon, basit ağ ASIC'leri tasarlamaktan **Kirin** akıllı telefon işlemcileri, **Ascend** yapay zekâ hızlandırıcıları, **Kunpeng** sunucu CPU'ları ve **Balong** 5G modemler yaratmaya geçti.

TSMC'nin 7nm+ EUV sürecinde üretilen Kirin 990 (2019), Qualcomm'un Snapdragon 865 ile gerçek anlamda rekabet edebiliyordu. Ascend 910 (2019), bazı yapay zekâ eğitim kıyaslamalarında NVIDIA'nın V100 ile boy ölçüşebiliyordu. HiSilicon, 2020'de yaklaşık 8,2 milyar $ gelirle **dünyanın yedinci büyük çip tasarımcısına** yükselmişti.

Sonra Mayıs 2020'deki Varlık Listesi tayin edilmesi — "dökümhane boşluğunu" kapatmak için Ağustos 2020'de genişletildi — HiSilicon'u TSMC'den kesti. Etki anında ve acımasızdı: HiSilicon'un gelirinin 2021'de **%80'den fazla** düştüğü bildiriliyor. Huawei yasak öncesinde çip stoklamıştı ama bu stoklar tükendi. Şirketin Çin'deki akıllı telefon pazar payı 2020 4. çeyrekten (%42) 2022 ortasına kadar %8'in altına düştü.

### Geri Dönüş Girişimi

Mate 60 Pro'daki Kirin 9000S, Huawei'nin dönüşünü işaret etti — ama önemli tavizlerle. Çip, yaklaşık 107 mm²'lik bir kalıp üzerinde kabaca **11,3 milyar transistör** entegre ediyor (karşılaştırma için Apple'ın A17 Pro'su 103 mm²'de TSMC 3 nm'de 19 milyar transistör). CPU performansı kabaca 2021'den bir Snapdragon 888 ile karşılaştırılabilir — akıllı telefon için yeterince rekabetçi ama en ilerinin 2-3 yıl gerisinde.

Daha kritik olarak, **Huawei'nin 5G modem** durumu kısıtlı olmaya devam ediyor. Kirin 9000S bir 5G modem entegre ediyor ama TechInsights analizi, tasarımının SMIC'in süreç sınırlamalarıyla çalışmak için tavizler verdiğini gösteriyor. Huawei yaratıcı olmak zorunda kaldı: bazı raporlar modemin daha az gelişmiş transistörleri telafi etmek için standart dışı tasarım teknikleri kullandığını öne sürüyor.

**Ascend 910B** yapay zekâ hızlandırıcısı paralel bir hikâye anlatıyor. 2023'te NVIDIA'nın A100'üne (Çin'in artık ithal edemediği) alternatif olarak duyurulan 910B'nin SMIC'in 7 nm sınıfı sürecinde üretildiği bildiriliyor. Kıyaslama karşılaştırmaları az — Huawei ayrıntılı özellikler yayınlamıyor — ama güvenilir tahminler eğitim performansını **bir A100'ün kabaca %60-80'ine** ve **bir H100'ün %30-40'ına** koyuyor. Yasal olarak NVIDIA çipleri tedarik edemeyen bazı Çinli yapay zekâ şirketleri ve devlet kurumları için A100'ün %60'ı, H100'ün %0'ından sonsuz kez daha iyidir.

Huawei'nin 2024'te **100.000'den fazla Ascend 910B** çipi sipariş ettiği ve Baidu, iFlytek ve China Telecom gibi şirketlerin bunları veri merkezlerinde konuşlandırdığı bildiriliyor. Çin hükümeti belirli devlet fonlu yapay zekâ projeleri için Ascend çiplerini zorunlu kılıyor.

## Ekipman Darboğazı

Teknoloji ablukasının en yıkıcı yönü çip tasarım araçları veya bitmiş çipler değil — **üretim ekipmanıdır.** Modern bir yarı iletken fabrikası inşa etmek, çoğu ABD ile müttefik ülkelerde merkezi olan bir avuç şirketin makinelerini gerektirir:

- **ASML** (Hollanda): EUV litografi tarayıcılarının tek tedarikçisi. Ayrıca ileri DUV daldırma tarayıcılarında baskın. Gelir: 28,3 milyar € (2024).
- **Applied Materials** (ABD): Genel olarak en büyük ekipman şirketi. Biriktirme, aşındırma ve muayenede baskın. Gelir: 27,2 milyar $ (MY2024).
- **Lam Research** (ABD): Plazma aşındırmada 1 numara, biriktirmede güçlü. Gelir: 14,9 milyar $ (MY2024).
- **Tokyo Electron** (Japonya): Kaplayıcı/geliştiricide 2 numara, biriktirme ve aşındırmada güçlü. Gelir: 2,09 trilyon ¥ (~14 milyar $, MY2024).
- **KLA** (ABD): Süreç kontrolü, muayene ve metrolojide baskın. Gelir: 10,5 milyar $ (MY2024).

Bu beş şirket birlikte **tüm yarı iletken üretim ekipmanının kabaca %70-75'ini** tedarik ediyor. Ekim 2022 ihracat kontrolleri — Ekim 2023'te ve 2024 sonunda genişletilen — Çin'in erişimini şunlara kısıtlıyor:

- Tüm EUV ekipmanı (ASML; ~2019'dan beri zaten gayri resmi olarak engellenmişti)
- İleri DUV tarayıcılar (ASML'in NXT:2050 ve üstü, Ocak 2024'ten itibaren kısıtlandı)
- İleri geometrilerde biriktirme, aşındırma veya muayene yapabilen ekipman
- Yarı iletken üretim ekipmanı parçaları ve servisi

**Servis kısıtlaması** genellikle gözden kaçırılır ama tartışmalı olarak en etkili olanıdır. Yarı iletken ekipmanı sürekli bakım gerektirir — ASML tarayıcıları düzenli bakım, lazer kaynağı değişimi ve yazılım güncellemeleri için saha servis mühendislerine ihtiyaç duyar. Applied Materials araçları oda yenileme ve parça gerektirir. OEM servisi olmadan ekipman bozulur. Endüstri tahminleri, uygun bakım olmadan modern bir litografi tarayıcısının **örtüşme doğruluğunun 12-18 ay içinde önemli ölçüde bozulduğunu** ve aracın 2-3 yıl içinde çalışamaz hâle gelebileceğini öne sürüyor.

### Yerli Ekipman Hamesi

Çin, yerli alternatifler geliştirmek için çılgınca harcıyor. **Naura Technology** (北方华创) en büyük Çinli ekipman üreticisidir; CVD, PVD, aşındırma ve oksidasyon/difüzyon araçları üretir — çoğunlukla 28 nm ve üstü için. **AMEC** (Advanced Micro-Fabrication Equipment, 中微公司) bazı süreçlerde 5 nm sınıfı geometrilere kadar nitelendirildiği bildirilen CCP ve ICP aşındırma araçları üretir. **Shanghai Micro Electronics Equipment (SMEE)** DUV litografi tarayıcıları üretmeye çalışıyor ama kamuya en gelişmiş gösterdikleri araç olan SSA/800-10W, **90 nm çözünürlük** elde ediyor — kabaca ASML'in 2004'te olduğu yer.

Litografideki açık belki de en açıklayıcı olanı. ASML'in mevcut üretim DUV tarayıcısı NXT:2050i, tek desenle **38 nm yarım aralık** elde ediyor. SMEE'nin en iyi aracı 90 nm'de. Bu, en kritik araç kategorisinde **20 yıllık bir teknoloji açığı.** Litografi, en ileri bir fabrikada toplam ekipman harcamasının kabaca %30-35'ini oluşturuyor ve zekice mühendislik geçici çözümleriyle telafi edemeyeceğiniz tek araç. Ya tarayıcınız özellikleri basabilir ya da basamaz.

Diğer ekipman kategorilerinde açık daha dar. Çin aşındırma araçları olgun düğümleri yetkin şekilde idare edebiliyor. Yerli CVD ve PVD sistemleri birçok uygulama için çalışıyor. Muayene ve metroloji belki de ikinci en zayıf halka — KLA'nın süreç kontrol araçları verim mühendisliği iş akışlarına derinlemesine gömülü ve Çin alternatifleri on yıllar içinde oluşturulan yazılım karmaşıklığına ve kusur kütüphanelerine sahip değil.

## EDA ve Tasarım Araçları Açığı

Ekipmanın ötesinde, Çin **Elektronik Tasarım Otomasyonu (EDA)** — çip tasarlamak için kullanılan yazılım — konusunda kritik bir bağımlılıkla karşı karşıya. Üç şirket hâkim: **Synopsys** (6,1 milyar $ gelir, 2024), **Cadence** (4,1 milyar $ gelir, 2024) ve **Siemens EDA** (eski adıyla Mentor Graphics). Birlikte **küresel EDA pazarının kabaca %80'ini** kontrol ediyorlar ve ileri düğüm tasarım araçlarında neredeyse tam hâkimiyet var.

Ekim 2022 kontrolleri özellikle **Gate-All-Around (GAA) transistör** tasarımı için EDA araçlarını kısıtladı — TSMC, Samsung ve Intel'in 2 nm ve altında benimsediği mimari. Bu stratejik olarak zekice: SMIC bir şekilde 2 nm için üretim ekipmanı edinse bile, HiSilicon ve diğer Çinli tasarımcıların bunun için çip tasarlayacak yazılımları olmayacak.

Çin EDA şirketleri mevcut — **Empyrean Technology** (华大九天) 2024'te ~140 milyon $ gelirle en büyüğü. Ama tam çip tasarım akışının belki **%30-40'ını** kapsıyorlar, ağırlıklı olarak analog ve ekran sürücü tasarımında. 14 nm veya altında tam bir dijital SoC tasarımı için Çinli tasarımcılar sentez, yerleştirme ve yönlendirme ile onay doğrulaması için hâlâ Synopsys ve Cadence'e bağımlı. Bu araçları değiştirmek sadece algoritmaları eşleştirmeyi değil, dökümhaneye özgü üretim kurallarını kodlayan **süreç tasarım kitlerini (PDK'lar)** — yıllarca yakın dökümhane-EDA işbirliği gerektiren bir görev — inşa etmeyi de gerektirir.

## Yetenek Savaşı

Çin'in yarı iletken hamlesinin belki de en az takdir edilen boyutu **yetenek sorunudur.** Dünya standartlarında bir yarı iletken endüstrisi inşa etmek, süreç entegrasyonu, cihaz fiziği, devre tasarımı ve verim mühendisliğinde derin uzmanlığa sahip on binlerce mühendis gerektirir. Bu uzmanlığın birikmesi on yıllar alır ve herkesin bildiği gibi örtüktür — kılavuzlarda değil insanların kafalarında yaşar.

Çin, TSMC, Samsung ve diğer yerleşik şirketlerden agresif bir şekilde eleman transfer etti. TSMC'nin eski Ar-Ge eş direktörü **Liang Mong-Song** — TSMC'nin 16 nm FinFET ve Samsung'un 14 nm FinFET geliştirilmesine yardımcı olmuş — 2017'de SMIC'in eş CEO'su oldu ve yaygın olarak SMIC'in 14 nm ve 7 nm gelişimini hızlandırdığı kabul ediliyor. Tayvan, **Ticari Sırlar Yasası** değişiklikleri kapsamında 12 yıla kadar hapis cezasıyla belirli yarı iletken yetenek işe alma biçimlerini suç hâline getirerek karşılık verdi.

Çinli üniversiteler yarı iletken eğitimini hızla ölçeklendiriyor. 2020'den bu yana **50'den fazla üniversite** entegre devre okulları veya programları kurdu. Ama açık çarpıcı olmaya devam ediyor: **Çin Yarı İletken Endüstrisi Derneği** tarafından yapılan 2023 tahmine göre 2025'e kadar **200.000 nitelikli yarı iletken çalışanı** açığı öngörülüyor.

## Büyük Resim: Kendi Kendine Yeterlilik mi Rekabetçilik mi?

İşte sezgiye aykırı gerçek: **Çin aynı anda hem olağanüstü ilerleme kaydediyor hem de daha da geride kalıyor.** SMIC'in 7 nm sınıfı süreci gerçek bir teknik başarı — TSMC, Samsung ve Intel dışında başka hiçbir dökümhane bunu gösteremedi. Çin ekipman üreticileri beş yıl önce herkesin tahmin ettiğinden daha hızlı ilerliyor. HiSilicon'un ağır kısıtlamalar altında rekabetçi çipler tasarlama yeteneği etkileyici.

Ama en ileri cephe durmadan ilerliyor. SMIC düşük verimlerle DUV tabanlı 7 nm ile boğuşurken, TSMC 2025'te **N2 (2 nm GAA)** üretimini artırıyor, ardından 2026'da **A16 (arka taraf güçle 1,6 nm)** geliyor. Her nesil açığı genişletiyor. SMIC 5 nm eşdeğeri üretime ulaştığında (iyimser tahminler 2027-2028 diyor), TSMC 1 nm'de olacak.

Çin'in yarı iletken kendi kendine yeterliliğine daha gerçekçi yol, en ileri teknolojiyi yakalamakla değil — Çin'in otomotiv, endüstriyel, telekomünikasyon ve tüketici elektroniği için devasa iç pazarına hizmet edebilecek **olgun düğümlerde (28nm-7nm) eksiksiz bir yerli tedarik zinciri** inşa etmekle ilgili. Bir çipin araba kontrol etmek, 5G baz istasyonu çalıştırmak veya IoT sensörünü güçlendirmek için 3 nm olması gerekmiyor.

Ve o olgun düğüm alanında Çin yadsınamaz ilerleme kaydediyor. Çin fabrikalarının 2027'ye kadar küresel olgun düğüm kapasitesinin (28 nm ve üstü) **%30'undan fazlasını** oluşturması bekleniyor, 2022'deki kabaca %18'den yükselerek. Bu yoğunlaşmanın kendi jeopolitik etkileri var: dünyanın geri kalanı Çin'in olgun çiplerine bağımlı hâle gelmekten, tıpkı Çin'in ileri çipler için TSMC'ye bağımlılığından endişe duyduğu gibi endişeleniyor.

## 150 Milyar Dolarlık Soru

Çin'in yarı iletken destanı nihayetinde paranın, kararlılığın ve 1,4 milyar kişilik iç pazarın, dünyanın en gelişmiş demokrasileri tarafından desteklenen bir teknoloji ambargosunu aşıp aşamayacağının bir testidir. Tarihsel kayıt karışık sinyaller veriyor. Sovyetler Birliği, muazzam yatırıma rağmen Batı yarı iletken teknolojisini asla yakalayamadı. Güney Kore, Tayvan ve Japonya hepsi dünya standartlarında çip endüstrileri kurdu — ama Amerikan teknolojisine tam erişimle, ona karşı değil.

En olası sonuç hiçbir taraf için temiz zafer veya yenilgi değil. **İkiye bölünmüş bir yarı iletken dünyası**: TSMC/ASML/Synopsys liderliğinde ABD ve müttefiklerine hizmet eden bir ekosistem ve en ileride 2-3 nesil geride olan ama ulusal güvenlik ve ekonomik işlev için en önemli çiplerde giderek daha fazla kendi kendine yeten paralel bir Çin ekosistemi.

Bu ikiye bölünmenin dünyayı daha güvenli mi yoksa daha tehlikeli mi yaptığı, önümüzdeki on yılın teknoloji jeopolitiğini tanımlayacak soru.

---

*Yarın jeopolitik dramadan şaşırtıcı derecede somut bir şeye dönüyoruz: **analog ve özel çipler** — tüm çip türlerinin %80'ini oluşturan ama nadiren manşetlere çıkan sensörler, güç regülatörleri, RF alıcı-vericiler ve MEMS cihazları. Modern dünyayı gerçekten ayakta tutan çipler bunlar — ve incelediğimiz dijital işlemcilerden tamamen farklı kurallara göre çalışıyorlar.*

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-25.toml"></div>
