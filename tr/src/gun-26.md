# Gün 26: Analog ve Özel Çipler — Unutulan %80

*Teknoloji basını 3 nm mantıkla kafayı bozarken, on yıllık süreç düğümlerinde çalışan geniş ve çılgınca kârlı bir analog, güç ve RF çip evreni, herhangi bir CPU'dan daha fazla günlük hayatınıza dokunuyor.*

---

## Çip Endüstrisinin Kirli Sırrı

İşte bu kursta şimdiye kadar öğrendiğiniz her şeyi yeniden çerçevelemesi gereken bir rakam: 2024'te satılan yaklaşık 1,2 trilyon yarı iletkenden **%2'den azı 10 nm altındaki düğümlerde üretildi**. iPhone'unuzdaki A17 Pro, ChatGPT'yi güçlendiren H100, AMD'nin Zen 5'i — bu en ileri harikalar endüstri gelirinin yaklaşık %15-20'sini ve birim hacminin yok denecek kadar küçük bir kesimini oluşturuyor. Gelirin diğer %80+'ı — ve sevk edilen çiplerin %98'inden fazlası — 28 nm'den **350 nm ve ötesine** uzanan süreç düğümlerinde üretilmiş cihazlardan geliyor. Bu fabrikaların çoğu tamamen amortisman görmüş, Clinton döneminden kalma teknolojiyle 7/24 çalışıyor ve para basıyor.

Analog ve özel yarı iletkenlerin dünyasına hoş geldiniz: arabanızın çarpmasını engelleyen sensörler, telefonunuzu şarj eden güç dönüştürücüler, onu 5G'ye bağlayan RF alıcı-vericiler, onu hangi yöne tuttuğunuzu bilen MEMS ivmeölçerler ve kimsenin fark etmeden modern dünyanın işlemesini sağlayan binlerce gösterişsiz çip.

Bu unutulan %80. Ve yarı iletken endüstrisinin en ilginç kısmı olabilir.

## Analog ve Dijital: Temelden Farklı Bir Oyun

Şimdiye kadar tartıştığımız her çip bilgiyi birler ve sıfırlar olarak işler — bir eşiğin üstünde veya altında olan ayrık voltajlar. Dijital mantık *tam* voltajı umursamaz; sadece YÜKSEK ile DÜŞÜK'ü ayırt etmesi gerekir. Dijitali bu kadar güçlü yapan şey budur: gürültüye dayanıklı, ölçeklenebilir ve soyutlamaya elverişli. Milyarlarca transistör yığabilirsiniz ve hepsi aynı ikili dili konuşur.

Analog çipler **sürekli** dünyayla uğraşır. Telefonunuzdaki mikrofon hava basıncı dalgalarını sürekli değişen bir elektrik sinyaline çevirir. Arabanızın motorundaki sıcaklık sensörü Celsius dereceyle orantılı bir voltaj verir. Dizüstü bilgisayarınızdaki güç yönetimi IC'si USB-C şarj cihazından gelen 20V'u CPU için tam 1,1V, SSD denetleyicisi için 3,3V, USB portları için 5V ve bellek için 0,75V'a çevirmelidir — hepsi aynı anda, hepsi %2'den az dalgalanmayla, hepsi mikrosaniyeler içinde yük geçişlerine tepki vererek.

Analog tasarımda **her milivolt önemlidir.** Gürültü, sıcaklık kayması, parazitik kapasitans, substrat bağlaşımı — dijital tasarımcıların büyük ölçüde göz ardı edebildiği tüm şeyler varoluşsal tehdit hâline gelir. Dijital kapı çalışmadığı ana kadar mükemmel çalışır; analog devre bir performans spektrumu boyunca zarif şekilde bozulur. Bu yüzden analog tasarım otomatik sentez yerine inatla insan uzmanlığına bağımlı kalıyor. RTL kodundan milyar transistörlük dijital SoC sentezleyebilirsiniz (Gün 15), ama aynı çipteki analog bloklar — PLL'ler, ADC'ler, voltaj regülatörleri, I/O sürücüler — hâlâ zanaatı öğrenmek için yıllarını harcamış **uzmanlar tarafından elle çiziliyor**.

Sektördeki espri, analog tasarımcılarının "huysuz büyücüler" olduğudur. Bir nedeni var. **Texas Instruments**, **Analog Devices** ve **NXP** gibi şirketlerdeki analog IC tasarımcılarının medyan yaşı 50'nin üzerinde. Üniversiteler dijitale göre çok daha az analog mezun veriyor çünkü iş otomatikleştirmesi daha zor, öğrenmesi daha yavaş ve bir dönemde kolayca öğretilemeyecek bir fizik sezgisi gerektiriyor. Deneyimli bir analog tasarımcı emekli olduğunda, bilgisi genellikle onunla birlikte gider. Global Semiconductor Alliance'ın 2023 anketi, **analog/karma sinyal tasarımının** tüm endüstride işe alması en zor beceri olduğunu ortaya koydu — yapay zekâdan daha zor, EUV süreç mühendisliğinden daha zor.

## Özel Silikonun Beş Krallığı

### 1. Güç Yarı İletkenleri: Görünmez Enerji Şebekesi

Her elektronik cihaz gücü bir biçimden diğerine dönüştürür. Duvar priziniz 120V veya 230V AC sağlar. Telefon piliniz 3,7-4,2V DC verir. CPU çekirdekleriniz 0,7-1,3V'ta çalışır. Bu voltaj alanları arasında bir **güç yarı iletkenleri** hiyerarşisi oturur — ve bunların verimliliği dünyanın ne kadar elektriği ısı olarak boşa harcadığını belirler.

Küresel güç yarı iletken pazarı 2024'te **53 milyar dolara** ulaştı (SIA); liderler **Infineon** (Almanya, ~%20 pazar payı), **ON Semiconductor** (ABD), **STMicroelectronics** (İsviçre/Fransa) ve **Texas Instruments**. Bu şirketler manşetlere çıkmaz ama yalnızca Infineon dünyanın elektrikli araçlarının yaklaşık %50'si için güç elektroniği tedarik eder.

Teknoloji yelpazesi geniş. Alt uçta, **düşük kayıplı regülatörler (LDO'lar)** — esasen hassas analog voltaj düşürücüler — kuruşlara mal olur ve miliamperlerle uğraşır. Üst uçta, 1.200V ve 200+ amper için tasarlanmış **yalıtılmış kapılı bipolar transistörler (IGBT'ler)** ve **silikon karbür (SiC) MOSFET'ler** elektrikli araçlar ve endüstriyel ekipmanlardaki motor sürücülerini kontrol eder. Bu uçlar arasında **DC-DC alçaltıcı ve yükseltici dönüştürücüler** — voltajı verimli bir şekilde yükseltmek veya düşürmek için indüktörler ve kapasitörler kullanan, saniyede yüz binlerden milyonlara kadar voltajı kesen anahtarlamalı regülatörler — yer alır.

Anahtar metrik **verimlilik**. 5V'u 1V'a dönüştüren doğrusal regülatör sadece %20 verimli — giriş gücünün %80'ini ısı olarak yakar. İyi tasarlanmış bir anahtarlamalı regülatör aynı dönüşüm için **%92-97 verimlilik** sağlar. Bu farkı milyarlarca cihazla çarptığınızda enerji etkisi şaşırtıcı. ABD Enerji Bakanlığı 2022'de, tüm ABD veri merkezlerinde güç dönüşüm verimliliğini sadece 2 yüzdelik puan artırmanın yılda **yaklaşık 4 terawatt-saat** tasarruf sağlayacağını — 370.000 eve yetecek kadar — tahmin etti.

Buradaki malzeme devrimi **geniş bant aralıklı yarı iletkenlerdir.** Silikonun 1,12 eV bant aralığı vardır, bu da silikon cihazın ne kadar voltaj engelleyebileceğini ve ne kadar hızlı anahtarlayabileceğini sınırlar. **Silikon karbür (SiC)** 3,26 eV bant aralığına, **galyum nitrür (GaN)** ise 3,4 eV'ye sahiptir. Pratik etki: SiC MOSFET, eşdeğer silikon cihazın onda biri alanındaki kalıpta 1.200V engelleyebilir, 10 kat daha hızlı anahtarlayabilir ve silikonun 150°C sınırına karşı 200°C jonksiyon sıcaklıklarında çalışabilir. SiC wafer üretiminde **Wolfspeed** (eski adıyla Cree, Durham, NC) baskındır; 2022'de açılan Marcy, New York'taki 5 milyar dolarlık 200 mm fabrikasından küresel SiC substrat arzının kabaca %60'ını kontrol ediyor.

Tesla'nın Model 3'ü, 48 silikon IGBT'yi 24 SiC MOSFET ile değiştirerek tam SiC inverter kullanan ilk seri üretim EV'ydi (STMicroelectronics tedarikiyle). Sonuç: daha büyük pilden değil, aktarma organında daha az enerji boşa harcamaktan gelen **%5-8 menzil artışı**. Her EV üreticisi bunu takip etti. **GaN** ise dizüstü bilgisayar ve telefon şarj cihazlarını fethetmekte. Kibrit kutusu boyutundaki o küçücük 65W Anker şarj cihazı? Eşdeğer silikon tasarımların 65 kHz'ine karşı 500 kHz–2 MHz'de anahtarlayan **Navitas Semiconductor** veya **GaN Systems** (2023'te 830 milyon dolara Infineon tarafından satın alınan) GaN transistörlerini kullanıyor. Daha yüksek anahtarlama frekansı daha küçük indüktörler ve kapasitörler demek, bu da şarj cihazının tuğladan küpe küçülmesi demek.

### 2. Sensörler: Silikonun Fiziksel Gerçeklikle Arayüzü

Akıllı telefonunuz en az **15-20 ayrı sensör çipi** içerir: ivmeölçer, jiroskop, manyetometre (pusula), barometre, yakınlık sensörü, ortam ışığı sensörü, parmak izi sensörü, çoklu görüntü sensörleri, sıcaklık sensörleri ve daha fazlası. Modern arabanız **100-200 sensör** içerir. Endüstriyel gaz türbini 1.000'den fazla içerebilir.

Baskın algılama teknolojisi **MEMS** — Mikro-Elektro-Mekanik Sistemler — silikon IC üretimini mekanik yapılarla birleştirir. Yüz milyonlarca cihazda bulunan **Bosch BMA400** gibi bir MEMS ivmeölçer, substratta oyulmuş silikon yaylar üzerinde asılı küçük bir kanıt kütlesini (birkaç mikrogram silikon) çalıştırır. Cihaz hızlandığında kanıt kütlesi saparak, tarak benzeri iç içe geçmiş elektrotlar arasındaki kapasitansı femtofarad'larla değiştirir. Alttaki ASIC bu kapasitans değişimini 14 bit hassasiyetle ölçer ve dijital ivme değerine dönüştürür.

Boyutlar dikkat çekici: hareketli mekanik yapılar tipik olarak **2-20 mikrometre** genişliğinde, **1-3 mikrometre** derinliğindeki boşluklar üzerinde asılı. 3 eksenli ivmeölçer ve 3 eksenli jiroskopu birleştiren modern 6 eksenli bir atalet ölçüm birimi (IMU) **2,5 × 3,0 × 0,86 mm** pakete sığar — susam tanesinden küçük. **STMicroelectronics**, **Bosch Sensortec**, **TDK InvenSense** ve **Analog Devices** bu pazara hâkim.

Görüntü sensörleri 2024'te yaklaşık **21 milyar dolar** ile en yüksek gelirli sensör kategorisini temsil ediyor ve yaklaşık %44 pazar payıyla **Sony Semiconductor Solutions** ezici bir şekilde baskın. Sony'nin **Exmor RS** ve **LYTIA** yığılmış CMOS görüntü sensörleri dikkat çekici bir üretim numarası kullanıyor: fotodiyot dizisi ve dijital okuma mantığı **ayrı wafer'lar** üzerinde üretilip bakır-bakır hibrit bağlama kullanılarak birbirine bağlanıyor (Gün 13'te ele aldığımız). Bu, Sony'nin her katmanı bağımsız olarak optimize etmesini sağlıyor — piksel dizisi ışık hassasiyeti için optimize edilmiş bir süreçte (tipik olarak 40-90 nm), mantık sinyal işleme hızı için daha gelişmiş bir düğümde (22 nm veya altı). iPhone 15 Pro'nun 48 megapiksel ana sensöründe her biri sadece **1,22 μm** genişliğinde olan pikseller, bir fotodiyot, transfer kapısı, yüzer difüzyon düğümü ve sıfırlama transistörü içerir — hepsi güvenilir şekilde gelen fotonların yaklaşık %50-60'ını elektrona dönüştürür (kuantum verimi).

### 3. RF ve Kablosuz: Görünmez Otoyol

Her kablosuz cihaz — telefon, dizüstü bilgisayar, Bluetooth kulaklık, Wi-Fi yönlendirici, GPS alıcı, 5G baz istasyonu — 700 MHz'den 71 GHz'e ve ötesine kadar frekanslarda elektromanyetik sinyalleri güçlendiren, filtreleyen, karıştıran ve sayısallaştıran **radyo frekansı (RF) yarı iletkenleri** içerir.

RF çip pazarı 2024'te yaklaşık **22 milyar dolara** ulaştı; liderleri **Qualcomm** (tümleşik modemler/RF ön uçlar), **Broadcom** (filtreler, güçlendiriciler), **Skyworks Solutions** ve **Qorvo**. Tipik bir 5G akıllı telefon **15-25 dolar değerinde RF silikon** içeren bir RF ön uç modülü taşır — birçok orta segment telefondaki uygulama işlemcisinden daha fazla.

RF fiziği belirli malzeme seçimlerini zorlar. Silikon yüksek frekanslarda vasat kalır çünkü elektron hareketliliği (taşıyıcıların kristal içinde ne kadar hızlı hareket ettiği) yaklaşık **1.400 cm²/V·s'de** zirve yapar. **Galyum arsenür (GaAs)** 8.500 cm²/V·s'ye ulaşır ve telefon ahizelerindeki güç güçlendiricileri için varsayılan malzeme yapar — **Skyworks** ve **Qorvo** yılda milyarlarca PA kalıbı üreten özel GaAs fabrikaları işletir. 30 GHz üzeri frekanslar (milimetre dalga 5G, uydu iletişimleri) için, 12.000 cm²/V·s'yi aşan mobilitesiyle **indiyum fosfür (InP)** gerekli hâle gelir.

En egzotik analog bileşenlerden biri, her 5G telefonda düzinelerce frekans bandını birbirinden ayırmak için kullanılan **kütlesel akustik dalga (BAW) filtresidir**. Bu filtreler **alüminyum nitrür (AlN)** ince filmlerinin piezoelektrik özelliklerinden yararlanır: AC voltaj uygulayın ve film belirli bir frekansta mekanik olarak rezonansa girer. Tek bir 5G telefon **100'den fazla BAW veya yüzey akustik dalga (SAW) filtresi** içerebilir — Broadcom'un filtre bölümünün (Avago satın alımından devralınan) çoğu bağımsız yarı iletken şirketinden fazla gelir üretmesinin nedeni budur.

### 4. Otomotiv: Güvenilirliğin Performansı Yendiği Yer

Otomotiv yarı iletken pazarı 2024'te **69 milyar dolara** ulaştı ve 2030'a kadar 120 milyar dolara çıkması öngörülüyor (McKinsey). Modern bir EV **1.500-3.000 dolar değerinde yarı iletken** içerir — 2015'ten bir içten yanmalı motorlu araçtan kabaca 5 kat fazla.

Otomotiv çiplerini farklı kılan silikon değil — **yeterliliktir.** Tüketici çipleri 0-70°C ortamda çalışır, 3-5 yıl dayanması beklenir ve 50-500 **DPPM** (milyonda kusurlu parça) hata oranlarını tolere eder. Otomotiv çipleri **-40°C ile 150°C** (motor bölmesi) veya **-40°C ile 175°C** (egzoz sistemi yakını) arasında çalışmalı, 15-20 yıl ve 300.000+ km dayanmalı, titreşim, nem ve termal döngüye dayanmalı — ve **1 DPPM** altında hata oranları elde etmelidir. Bazı güvenlik kritik bileşenler lot düzeyinde %60 güvenle **sıfır DPPM** hedefler.

Bu yeterlilik yükü otomotiv çiplerinin neden **olgun süreç düğümlerinde** çalıştığını açıklıyor. Motor kontrolü, gövde elektroniği ve bilgi-eğlence sistemlerine hâkim olan mikrodenetleyiciler tipik olarak **40 nm, 28 nm veya 16 nm** süreçlerde üretilir. **NXP Semiconductors** (Hollanda), **Renesas Electronics** (Japonya), **Infineon** ve **Texas Instruments** bu pazara liderlik eder. NXP'nin S32 otomotiv işlemci ailesi 16 nm FinFET kullanır — otomotiv için etkileyici ama tüketici mobil işlemcilerin iki tam nesil gerisinde.

2020-2022 otomotiv çip kıtlığı — küresel otomotiv endüstrisine tahminen **210 milyar dolar kayıp gelire** mal olan (AlixPartners) — bu olgun düğüm bağımlılığını acımasızca açığa çıkardı. Otomobil üreticileri, tost makinesi ve TV kumanda üreticileriyle 40 nm ve 65 nm wafer kapasitesi için rekabet ettiklerini keşfetti. 45.000 dolarlık bir araba, kimsenin çift kaynaklı tedarik etmek zahmetine girmediği 0,50 dolarlık bir mikrodenetleyici tarafından geciktiriliyordu.

### 5. Karma Sinyal: Analog-Dijital Köprüsü

En kritik özel devreler, sürekli fiziksel dünya ile ayrık dijital alan arasındaki çevirmenler olan **analog-dijital dönüştürücüler (ADC'ler)** ve **dijital-analog dönüştürücüler (DAC'ler)**.

Tekniğin son noktası şaşırtıcı. **Analog Devices'ın** 5G baz istasyonu alıcıları için tasarlanmış 16 kanallı ADC'si AD9083, analog sinyalleri **kanal başına saniyede 125 milyon örnekleme** hızında 16 bit çözünürlükle sayısallaştırır — yani giriş aralığında 65.536 ayrı voltaj seviyesini, yaklaşık **adım başına 15 mikrovolt** ayırt eder. Bunu başarmak termal gürültüyü, saat titreşimini (**75 femtosaniyeden** az RMS — bir nanosaniyenin 75 milyonda biri), karşılaştırıcı metastabilitesini ve substrat bağlaşımını neredeyse takıntılı bir hassasiyetle yönetmeyi gerektirir.

ADC pazarı tek başına 2024'te yaklaşık **5,3 milyar dolar** değerindeydi ama bu önemini hafife aldırıyor: var olan neredeyse her sensör okuması, her ses örneği, her radyo alımı ve her kontrol döngüsü bir ADC'den geçer. Fiziksel gerçeklik ile hesaplama arasındaki darboğazdırlar.

## Şaşırtıcı Ekonomi

İşte yalnızca en ileri haberleri takip eden herkesi şoke edecek sezgiye aykırı gerçek: **analog yarı iletken şirketleri genellikle dijital olanlardan daha kârlıdır.**

2024'te **15,6 milyar dolar gelire** sahip dünyanın en büyük analog çip üreticisi Texas Instruments, yaklaşık **%58** brüt marjla faaliyet gösteriyor — ve TI üretiminin büyük çoğunluğunu tamamen amortisman görmüş fabrikalarda 130nm-300nm düğümlerde çalıştırıyor. 2 milyar dolarlık bir fabrikayı zaten ödeyip %95 kapasite kullanımıyla 200 mm wafer'larda (3 nm'de 300 mm wafer için 16.000+ dolara kıyasla işlenmesi 3.000-4.000 dolara mal olan) çalıştırdığınızda, kalıp başına marjinal maliyetiniz olağanüstü düşük.

Analog Devices, 2021'deki 21 milyar dolarlık Maxim Integrated satın alımının ardından yaklaşık **%62** brüt marj elde ediyor. Skyworks Solutions yaklaşık **%46** civarında. Bunu AMD'nin **%50'si** (en ileri üretim için TSMC'ye büyük wafer maliyetleri ödeyen) veya Nvidia'nın **%73'ü** (sonsuza kadar sürmeyecek yapay zekâ tekel fiyatlamasından kaynaklanan aykırı değer) ile karşılaştırın.

İş modeli çalışır çünkü analog çiplerin **on yıllarca ürün yaşam döngüleri** vardır. TI'ın 1968'de tanıtılan LM741 operasyonel güçlendiricisi hâlâ üretimde ve hâlâ satıyor. Şirketin 1976'da tasarlanan LM317 voltaj regülatörü dünyadaki en popüler güç yönetimi IC'lerinden biri olmaya devam ediyor. 1976'da tasarlanmış dijital bir çip satmayı deneyin. Bu uzun yaşam döngüleri, Ar-Ge maliyetlerinin 20-30+ yılda amorti edilmesi, tasarım kazanımlarının birikmesi ve analog yerleşimlerinin belirli süreç özelliklerine ince ayarlı olması nedeniyle müşterilerin devasa değiştirme maliyetleriyle karşılaşması anlamına gelir.

Analogun fabrikasız (fabless) trendine direnmesinin nedeni de budur. Qualcomm ve Nvidia gibi dijital çip üreticileri çoktan fab sahibi olmayı bıraktı — çipleri tasarlayıp üretimi TSMC'ye dış kaynak olarak veriyor. Ama **Texas Instruments, Infineon, ON Semi ve STMicroelectronics hepsi kendi fabrikalarını işletmeye devam ediyor.** Neden? Çünkü analog performans, emtia dökümhanelerinin sizin için özelleştirmeyeceği süreç ayrıntılarıyla yakından bağlantılı. TI, Richardson, Teksas ve Lehi, Utah'taki yeni 300 mm analog wafer fabrikalarına 12 milyar dolar yatırım yaptı — en ileri mantık için değil, daha iyi ölçek ekonomileri için daha büyük wafer'larda 45nm-130nm analog süreçler çalıştırmak için.

## Sessiz Kriz

Analog dünyası, en ileri mantığın EUV ve ölçeklendirme dramalarından farklı, kendi kendine özgü zorluklarla karşı karşıya.

**Yetenek uçurumu** varoluşsaldır. Analog tasarım, dijital tasarım gibi otomatikleştirilemez — mantık sentezinin analog eşdeğeri yok. Analog devredeki her transistör, her direnç, her kapasitör; gürültü, hız, güç, alan ve üretim değişkenliği arasındaki dengeyi anlayan bir insan tarafından tek tek boyutlandırılır. Makine öğrenimi destekli analog tasarım aktif bir araştırma alanı (UC Berkeley, Tsinghua ve Cadence'deki gruplar ilerleme kaydediyor) ama tam otomatik analog sentez hâlâ uzak bir hedef. Bu arada bunu bilen mühendisler emekli oluyor.

**Olgun düğüm kapasitesi** de stratejik bir endişe hâline geliyor. TSMC, Samsung ve Intel en ileri fabrikalara yüz milyarlarca dolarlar dökerken, 28 nm ve üstü kapasiteye yatırım geride kaldı. Çin agresif şekilde olgun düğüm fabrikaları inşa ediyor (SMIC, HuaHong, Nexchip muazzam 28nm-55nm kapasite ekliyor) ve bu, pazarı ucuz emtia analog çiplerle sular altında bırakma tehdidi taşıyor — Batılı analog şirketlerin kâr marjlarını sürdüren kârlılık için potansiyel olarak yıkıcı. AB'nin Avrupa Çip Yasası ve ABD'nin CHIPS Yasası, politika yapıcılar yeterli güç yönetimi IC'si ve sensör arayüz çipi olmayan bir dünyanın yeterli yapay zekâ hızlandırıcısı olmayan biri kadar sakat olduğunu nihayet anladığı için olgun düğüm kapasitesine ilişkin hükümleri açıkça içeriyor.

**Heterojen entegrasyon** analog ve dijital arasındaki sınırı yeniden şekillendiriyor. Apple'ın M-serisi SoC'leri TSMC'nin N3 sürecinde milyarlarca dijital transistörü, eski süreçlerde daha iyi performans gösterecek ama entegrasyon nedenleriyle 3 nm'ye sıkıştırılması gereken analog bloklarla — PLL'ler, ADC'ler, I/O PHY'ler — birlikte entegre ediyor. Chiplet devrimi (Gün 13) bir çözüm vaat ediyor: dijital mantığı 3 nm'ye, analog blokları 22 nm'ye, güç iletimini GaN'a, RF ön uçları GaAs'a koyun ve hepsini ileri paketleme aracılığıyla bağlayın. Bu "her işlev için en iyi süreç" yaklaşımı, heterojen paketleme konusunda uzmanlaşan **Amkor** ve **ASE Group** gibi şirketlere talebi artırıyor.

## En Büyük Sürpriz

Analog ve özel çipler hakkındaki belki de en şaşırtıcı gerçek şu: **bugün tartışılan her teknoloji devrimi için darboğaz bunlardır.**

Yapay zekâ güç iletimi olmadan çalışmaz. Otonom araçlar tekerlekleri olan sensör platformlarıdır. 5G temelde bir RF mühendisliği zorluğudur. Yenilenebilir enerji şebeke entegrasyonu devasa ölçekte güç yarı iletkenleri gerektirir. Elektrikli araçlar SiC ve GaN inverter verimliliğine göre yaşar ve ölür. Nesnelerin İnterneti milyarlarca sensör ve onları okuyacak analog ön uçlar olmadan anlamsızdır.

Dijital işlemci şanı alır. İşi analog çip yapar.

---

*Yarın, endüstrinin mali gerçeğiyle yüzleşiyoruz: wafer üretiminin, çip tasarımının şaşırtıcı ve sürekli artan maliyetleri ve neden Dünya üzerinde sadece üç şirketin en ileri üretimi karşılayabildiği. Gün 27, yarı iletkenlerin ekonomisini araştırıyor — ve sahip olanlar ile olmayanlar arasındaki uçurumun neden giderek büyüdüğünü.*

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-26.toml"></div>
