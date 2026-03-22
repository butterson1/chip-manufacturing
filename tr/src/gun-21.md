# Gün 21: Güç ve Termal — Neden Saati Artıramıyoruz (Dennard Ölçeklemesi Öldü)

*2004'te Intel 4 GHz Pentium 4'ü iptal etti ve mimariyi tamamen terk etti. Bu bir iş kararı değildi — fizik bir çizgi çekti. Prescott'u öldüren "güç duvarı" tüm yarı iletken endüstrisini yeniden şekillendirdi; sürekli artan saat hızlarına doğru otuz yıllık koşuyu bitirdi ve dünyadaki her çip tasarımcısını, gücü birincil tasarım kısıtlaması olarak düşünmeye zorladı. Bugünün çipleri, ne* yapabilecekleri *değil, ne kadar ısıda* hayatta kalabilecekleri *etrafında tasarlanıyor.*

---

## Altın Çağ: Daha Hızlısı Bedavaydı

Güç duvarının neden bu kadar sert vurduğunu anlamak için, duvar ortaya çıkmadan önce işlerin ne kadar iyi olduğunu anlamanız gerekir.

1974'ten yaklaşık 2004'e kadar yarı iletken endüstrisi, IBM araştırmacısı Robert Dennard'ın adını taşıyan ve 1974 tarihli bir makalede tanımladığı **Dennard ölçeklemesi** adlı fizikten gelen olağanüstü bir hediyenin keyfini çıkardı. Dennard'ın gözlemi zarif: transistörler küçüldükçe güç tüketimleri orantılı olarak düşer. Spesifik olarak, transistör boyutlarını *κ* faktörüyle (diyelim 0,7×) azaltırsanız, gerilimi de aynı faktörle azaltabilirsiniz ve birim alan başına güç kabaca sabit kalır.

Matematik güzelce işliyordu. Her nesilde transistörleri 0,7× küçültmek şu anlama geliyordu:
- **Frekans** ~1,4× artıyordu (daha kısa mesafeler, daha hızlı anahtarlama)
- **Gerilim** ~0,7× düşüyordu (daha ince oksitler, daha kısa kanallar)
- **Kapasitans** ~0,7× düşüyordu (daha küçük kapılar)
- **Transistör başına güç** ~0,7² × 0,7 ≈ 0,34× düşüyordu — kabaca yarıya iniyordu

Sonuç mu? İki kat daha fazla transistör sığdırabilir (Moore Yasası), %40 daha hızlı çalıştırabilir ve toplam çip gücü yaklaşık aynı kalırdı. Tarihte görülmemiş bir bedava öğle yemeğiydi. Intel bu yürüyen merdivene acımasızca bindi: 1989'daki 486, 25 MHz'de çalışıyor ve yaklaşık 4 watt tüketiyordu. On yıl sonra 1999'daki Pentium III, yaklaşık 25 watt ile 1 GHz'e ulaştı. Matematik, trendin sonsuza kadar devam edebileceğini söylüyordu.

Intel, bu frekans ölçekleme büyüsünün sarhoşluğuyla tüm şirketini bunun üzerine bahse yatırdı. 2000'de piyasaya sürülen Pentium 4 "NetBurst" mimarisi, açıkça saat hızının kader olduğu varsayımı etrafında tasarlanmıştı. Frekansı en üst düzeye çıkarmak için meşhur derin bir boru hattına sahipti — "Prescott" varyantında 31 aşamaya kadar. Mantık basitti: daha fazla boru hattı aşaması, aşama başına daha az iş demekti; bu da her aşamanın daha hızlı olabileceği anlamına geliyordu; yani daha yüksek saat hızları. Intel, on yılın sonuna kadar 10 GHz'i alenen vaat etti.

Oraya asla ulaşamadılar. Yakınına bile.

---

## Duvar: Fiziğin Hayır Dediği Yer

Sorun, Dennard ölçeklemesinin zarif bir şekilde ölmemesiydi — 2004-2006'da 65nm civarında bir uçurumla karşılaştı ve yarı iletken endüstrisi neredeyse onunla birlikte uçurumdan düştü.

Merkezdeki sorun **gerilim ölçeklemesiydi**. Dennard'ın çerçevesi, gerilimin her süreç nesliyle düşmesini gerektiriyordu. Ve sadakatle düştü: 1980'lerde 5V'dan 3,3V'a, sonra 2,5V'a, sonra 1,8V'a, sonra 1,2V'a. Ama 0,7-0,8V civarında bir yerde, iki acımasız fiziksel sınır aynı anda devreye girdi.

### Eşik Gerilimi Tabanı

Bir MOSFET transistörünün **eşik gerilimi** (V_th) vardır — onu açmak için gereken minimum gerilim. V_th'nin altında transistörün kapalı olması gerekir. Sorun şu ki "kapalı" gerçekten kapalı değildir. Atomik ölçekte kuantum mekaniği, transistör sözde kapalı olsa bile elektronların engelden tünellemesine izin verir. Bu **eşik altı kaçak** akımı, V_th düştükçe üstel olarak artar; oda sıcaklığında her 100mV düşüşte kabaca 10 kat artar.

Bu acımasız bir ödünleşim yaratır. V_th'nin düşük olmasını istersiniz (böylece transistör hızlı anahtarlar ve daha düşük besleme gerilimlerinde çalışır) ama çok düşük olmasını istemezsiniz (yoksa "kapalıyken" elek gibi kaçak yapar). 65nm düğümüne gelindiğinde eşik gerilimleri 200-300mV'a düşürülmüştü ve eşik altı kaçak, toplam çip gücünün anlamlı bir kısmı haline gelmişti. Intel'in 90nm Prescott'unda, **toplam güç kaybının yaklaşık %40'ı kaçaktı** — hiçbir şey yapmıyor olması gereken transistörlerin tükettiği güç.

Şöyle düşünün: kapıları tam kapanmayan bir baraj hayal edin. Sızıntıyı azaltmak için barajı yükseltebilirsiniz (V_th'yi artırma), ama o zaman kapıları açıp kapatmak daha fazla enerji gerektirir (daha yüksek anahtarlama gücü). Ya da kapıları düşük tutarsınız (düşük V_th) daha hızlı çalışma için, ama su sürekli sızar. Atomik ölçekte, mükemmel kapatan bir conta yoktur.

### Kapı Oksit Felaketi

İkinci kriz daha da temeld. Kapı uzunlukları küçüldükçe transistör davranışını korumak için, kapı oksiti — kapı elektrotu ile silikon kanal arasındaki ince yalıtkan katman — orantılı olarak küçülmek zorundaydı. 90nm düğümüne gelindiğinde kapı oksit kalınlığı yaklaşık **1,2 nanometreye** ulaşmıştı — yalnızca beş atom katmanı silikon dioksit. Bu kalınlıkta, oksitten geçen kuantum mekaniksel **tünelleme** önemli hale geldi. Elektronlar yalıtkan orada yokmuş gibi doğrudan geçiyordu ve doğrudan kapı kaçak akımı yaratıyordu.

Intel, 90nm düğümünde kapı alanının santimetre karesi başına birkaç amperlik kapı kaçak akımları ölçtü. Milyonlarca transistöre sahip bir çip için bu felaketti. Çözüm — SiO₂'yi fiziksel olarak daha kalın ama elektriksel olarak daha ince olabilen **yüksek-κ dielektrik** (hafnyum oksit, HfO₂) ile değiştirmek — 2007'de 45nm'de gelecekti, ama yıllar süren araştırma gerektirdi ve gerilim ölçekleme sorununu tam olarak çözmedi.

### Prescott Erimesi

Bu iki etki Intel'in Prescott çipinde muhteşem bir şekilde çarpıştı. 90nm'de üretilen, 31 aşamalı boru hattıyla 3,8 GHz'e kadar çalışan Prescott, tepe noktada **115 watt** tüketiyordu — ve bu *spesifikasyondu*. Gerçek dünya gücü çok daha yüksek çıkabiliyordu. En sıcak noktalardaki termal yoğunluk **santimetre kare başına 100 watta** yaklaşıyordu — bir nükleer reaktör yakıt çubuğunun yüzeyiyle karşılaştırılabilir.

Intel, Prescott için 3,6 GHz ve ardından 4 GHz SKU planlamıştı. Mühendislik örneklerinin hedeflere ulaştığı bildirildi ama bunu makul hiçbir soğutma çözümünün kaldırabileceği bir termal zarfta yapamıyorlardı. Çip, bir Intel mühendisinin alaycı sözleriyle, "küçük bir ısıtıcıydı." Intel 4 GHz parçayı Ekim 2004'te iptal etti ve bir yıl içinde tüm şirketi, ham frekans yerine **watt başına performansı** vurgulayan Pentium M türevi "Core" mimarisine yönlendirdi.

Frekans ölçeklemeden verimlilik ölçeklemeye bu geçiş — mikroişlemcinin icadından bu yana tartışmasız en önemli mimari dönüm noktasını işaret eder.

---

## Gücün Üç Yüzü

Gücün neden yönetilmesinin bu kadar zor olduğunu anlamak için nereden geldiğini anlamanız gerekir. Çip gücünün üç bileşeni vardır, her biri farklı fizik ve farklı tasarım kaldıraçlarıyla.

### Dinamik Güç: İş Yapmanın Bedeli

Bir transistör her anahtarladığında — çıkış kapasitansını şarj veya deşarj ederken — enerji tüketir. Denklem aldatıcı derecede basittir:

**P_dinamik = α × C × V² × f**

Burada:
- **α** etkinlik faktörüdür (her döngüde transistörlerin ne kadarının anahtarladığı, genellikle 0,1-0,3)
- **C** toplam anahtarlanan kapasitanstır
- **V** besleme gerilimidir
- **f** saat frekansıdır

O V² terimi, tüm çip tasarımındaki en önemli şeydir. Gerilimi %30 azaltmak dinamik gücü %51 azaltır. Bu nedenle gerilim, tasarımcıların sahip olduğu en güçlü kaldıraçtır ve gerilimi ~0,5V'un altına ölçeklemenin imkânsızlığının bu kadar yıkıcı olmasının nedenidir.

Intel'in 65nm düğümünde, 3 GHz'de yüksek performanslı bir masaüstü çekirdeği için dinamik güç 60-80W olabilirdi. Bugün Apple'ın Firestorm çekirdekleri (M1/M2/M3), kısmen 0,55-0,75V'ta çalıştıkları için 5W'un altında karşılaştırılabilir tek iş parçacığı performansı elde ediyor — V² tasarrufları muazzamdır.

### Statik (Kaçak) Güç: Var Olmanın Vergisi

Kaçak güç, çipin yararlı bir şey yapıp yapmadığına bakılmaksızın tüketilir. Eşik altı kaçak (V_th tabanı sorunu), kapı kaçağı (oksitten kuantum tünelleme) ve eklem kaçağının (ters polarize p-n eklemleri) toplamıdır. Modern süreç düğümlerinde:

- **Eşik altı kaçak** baskındır, özellikle yüksek sıcaklıklarda (her 10°C'de kabaca iki katına çıkar)
- **Kapı kaçağı** yüksek-κ dielektriklerle hafifletilmiş ama ortadan kaldırılmamıştır
- **Toplam kaçak** ileri düğümlerde çip gücünün %30-50'si olabilir

Sıcaklık bağımlılığı korkutucu bir pozitif geri besleme döngüsü yaratır: **kaçak ısı üretir → ısı kaçağı artırır → daha fazla ısı → daha fazla kaçak**. Soğutma yetişemezse çip **termal kaçışa** girer. Sunucu çiplerinin yaklaşık 100-105°C'de zorunlu termal kapanması olmasının nedeni budur — lehim eklemlerini korumak değil, kaçak geri besleme döngüsünü kontrol edilemez hale gelmeden kırmaktır.

### Kısa Devre Gücü: Geçiş Vergisi

Bir CMOS evirici anahtarladığında, kısa bir an — genellikle 50-200 pikosaniye — vardır ki hem PMOS hem NMOS transistörler kısmen açıktır ve güç kaynağından toprağa doğrudan bir yol yaratır. Bu **kısa devre akımı** dinamik gücün yaklaşık %10-15'ini oluşturur. CMOS mantığında kaçınılmazdır ve frekans ile geçiş süresiyle ölçeklenir.

---

## Termal Zorluk: Isıyı Dışarı Çıkarmak

Güç elektriksel bir sorundur. Termal yönetim *mekanik* bir sorundur. Ve tartışmasız daha zordur.

NVIDIA'nın H100'ü gibi modern bir veri merkezi GPU'su yaklaşık 814 mm² ölçüsündeki bir kalıptan **700 watt** harcar. Bu, kalıp boyunca ortalaması yaklaşık **86 W/cm²** olan bir termal akıdır. Ama ortalamalar yalan söyler — gerçek dağılım vahşice eşitsizdir. Tensör çekirdeği kümeleri yerel olarak **300-500 W/cm²'ye** çıkabilirken bellek denetleyicileri 20 W/cm² olabilir. Çipleri öldüren bu **sıcak noktalar**, ortalama sıcaklık değildir.

Isı uzaklaştırma zinciri şöyle çalışır:

1. **Kalıp → Isı Yayıcı**: Termal arayüz malzemesi (TIM) silikon kalıbı entegre ısı yayıcıya (IHS) bağlar. Üst düzey TIM'ler 60-80 W/m·K termal iletkenliğe sahip sıvı metal (galyum-indiyum alaşımları) kullanır; geleneksel termal macunun 4-8 W/m·K'sine karşı. Meraklıların CPU'ları "kapaklarını söküp" sıvı metalle değiştirmesinin sıcaklıkları 15-20°C düşürebilmesinin nedeni budur.

2. **Isı Yayıcı → Soğutucu**: Bir TIM katmanı daha, bakır veya alüminyum soğutucuya bağlar. Bakırın termal iletkenliği (400 W/m·K) alüminyumu (237 W/m·K) yener, ama bakır üç kat daha ağır ve daha pahalıdır.

3. **Soğutucu → Hava/Sıvı**: Konvektif soğutma ısıyı ortama aktarır. Hava soğutma, devasa kule soğutucularla 250-300W civarında tavana ulaşır. Sıvı soğutma (AIO veya özel döngüler) 400-500W'ı kaldırabilir. Veri merkezi daldırma soğutma — sunucuların tamamını dielektrik sıvıya batırma — çip başına 1000W+'ya kadar sınırı zorlar.

Temel sorun, silikonun termal iletkenliğinin (~150 W/m·K) iyileşmemiş olmasıdır — bir malzeme sabitidir. Transistör yoğunluğu arttıkça, daha az alanda daha fazla ısı üretilir ve silikonun kendisi ısıyı dışarı çıkarmada darboğaz haline gelir. Elmasın termal iletkenliği ~2000 W/m·K'dir ve bazı araştırmacılar sentetik elmas ısı yayıcıları araştırıyor, ama wafer başına 50.000$+'lık fiyatla henüz ekonomik değil.

---

## Modern Cephanelik: Güç Duvarıyla Savaşmak

Saati artıramadığımıza göre, endüstri watt başına daha fazla hesaplama çıkarmak için olağanüstü bir araç takımı geliştirdi.

### Dinamik Gerilim ve Frekans Ölçekleme (DVFS)

Her modern çip, saniyede yüzlerce kez kendi gerilimini ve frekansını gerçek zamanlı olarak ayarlayabilir. İş yükü hafif olduğunda çip güç tasarrufu için gerilimi ve frekansı düşürür. Tüm çekirdekler yüklü olduğunda, diğerlerini düşük tutarken bir veya iki çekirdeği daha yüksek frekanslara çıkarır — Intel buna **Turbo Boost**, AMD **Precision Boost** der, Apple resmi saat hızlarını bile yayınlamadığı için hiçbir şey demez.

Ayrıntı düzeyi dikkat çekicidir. Apple'ın M serisi çipleri, 6,25mV kadar ince gerilim adımları ve 12 MHz frekans adımlarıyla çekirdek başına DVFS'ye sahiptir. A17 Pro'nun performans çekirdekleri, ~0,5V'ta 600 MHz'den (50 miliwattın altında tüketerek) ~1,1V'ta 3,78 GHz'e (birkaç watt tüketerek) kadar her yerde çalışabilir. Bu, aynı çekirdek için **100:1 güç aralığıdır**.

### Güç Kapama: İhtiyacınız Olmayanı Kapatmak

Kaçağı azaltmak yerine neden ortadan kaldırmayasınız? **Güç kapama**, boştaki devre bloklarını güç kaynağından fiziksel olarak ayırmak için yüksek V_th "uyku transistörleri" kullanır. Bir CPU çekirdeği boşta olduğunda güç kapısı açılır ve kaçak neredeyse sıfıra düşer. Sorun, uyandırma gecikmesidir — bir alanı yeniden güçlendirmek ve durumu geri yüklemek 10-100 mikrosaniye sürer, bu da işlemci zamanında bir sonsuzluktur.

Modern SoC'lerin düzinelerce bağımsız olarak kapatılabilir güç alanı vardır. Apple'ın M3'ü her CPU çekirdeği, her GPU kümesi, Neural Engine, medya motorları ve çeşitli G/Ç blokları için ayrı alanlara sahiptir. Herhangi bir anda çipin büyük kısımları kelimenin tam anlamıyla kapalıdır.

### Saat Kapama: Daha Ucuz ama Daha Az Etkili

Güç kapamadan daha ince ayrıntılı olan **saat kapama**, boştaki fonksiyonel birimlere giden saati durdurur. Bu, dinamik gücü ortadan kaldırır (anahtarlama yok = α×CV²f yok) ama kaçağa yardımcı olmaz. Saat kapatılmış bir çarpıcı hâlâ kaçak yapar; sadece anahtarlamaz. Modern tasarımlar, yalnızca mantık gücünü değil, saat dağıtım ağının kendisinin tükettiği önemli gücü de (toplam dinamik gücün %25-35'i olabilen) tasarruf eden **hiyerarşik saat kapama** kullanır.

### Mimari Paralellik: big.LITTLE ve Arkadaşları

ARM'ın 2011'de öncülük ettiği **big.LITTLE** konsepti (şimdi DynamIQ), güç duvarına doğrudan bir yanıttı. Tek tip çekirdek yerine iki tipiniz var: küçük, verimli bir "LITTLE" çekirdek (ARM'ın Cortex-A520'si gibi, 1-2 genişlikli sıralı, tam yükte ~100 miliwatt) ve büyük, güçlü bir "big" çekirdek (Cortex-X4 gibi, 8 genişlikli sıra dışı, tam yükte ~3-5W). Arka plan görevleri LITTLE çekirdeklerde 20-50 kat daha iyi enerji verimliliğiyle çalışır; talepkâr görevler büyük çekirdekleri alır.

Apple bunu son çiplerde üç katmanlı bir hiyerarşiyle daha da ileri taşıdı: verimlilik çekirdekleri (E-çekirdekleri), performans çekirdekleri (P-çekirdekleri) ve — GPU tarafında — iş yüküne göre etkinleştirilen değişken sayıda GPU çekirdeği. Intel, 2021'de Alder Lake'teki P-çekirdekleri (Golden Cove) ve E-çekirdekleri (Gracemont) ile aynı konsepti benimsedi, ancak Windows zamanlayıcısıyla entegrasyon yıllar süren acılı optimizasyon gerektirdi.

### Karanlık Silikon Sorunu

İşte modern çiplerin sezgiye aykırı gerçeği: herhangi bir anda, **bir çipteki transistörlerin önemli bir kısmı termal bütçeyi aşmadan aynı anda çalıştırılamaz**. California Üniversitesi, San Diego'daki araştırmacılar 2011'de, 8nm'de çipin %50-80'ine kadarının herhangi bir anda "karanlık" (güçsüz) kalması gerekebileceğini tahmin etti.

Bu bir başarısızlık değil — bir tasarım stratejisidir. Çipler, **aynı anda kullanabileceklerinden daha fazla yetenekle** inşa edilir ve güç yönetimi mantığı hangi yeteneklerin etkinleştirileceğine karar verir. Bir akıllı telefon SoC'unda güçlü bir GPU, yapay zekâ hızlandırıcısı, görüntü sinyal işlemcisi, video kodlayıcı ve birden fazla CPU çekirdeği vardır — ama hepsini aynı anda maksimum kapasitede kullanmak, yalnızca 3-5 watt sürekli soğutabilen bir telefonda 20+ watt harcar.

Karanlık silikon, modern çiplerin saat hızlarının gösterdiğinden çok daha hızlı hissettirmesinin nedenidir. 2024'te 3,5 GHz'de çalışan bir dizüstü bilgisayar çipi, 2004'te 3,8 GHz'de çalışan bir çipi dramatik olarak geride bırakır çünkü modern çip çok daha fazla transistöre, çok daha fazla uzmanlaşmış hızlandırıcıya ve her görev için tam olarak doğru transistörleri aydınlatırken diğer her şeyi uykuda tutan karmaşık bir güç yönetim sistemine sahiptir.

---

## Gerilim Düzenleyicileri: Bilinmeyen Kahramanlar

Tüm bu gerilim ölçekleme, doğru gerilimi doğru yere ulaştırmayı gerektirir. İlk kez Intel'in 2013'teki Haswell'inde büyük ölçekte konuşlandırılan **entegre gerilim düzenleyicileri** (IVR'ler), gerilim dönüştürme devresini ana kart yerine çipin üzerine koyar. Bu, agresif DVFS için gerekli olan mikrosaniye ölçeğinde geçiş süreleriyle çekirdek başına gerilim alanlarını mümkün kılar.

Ama gerilim düzenleyicilerinin kendi verimlilik sorunu vardır. Tipik bir çip üstü düşürücü dönüştürücü %85-90 verimlilikle çalışır, yani gücün %10-15'i düzenleyicinin kendisinde ısı olarak boşa gider. 200W'lık bir işlemci için bu, yalnızca güç dönüşümünden 20-30W atık ısı demektir. Intel, verimlilik cezası çok yüksek olduğu için Haswell'den sonra tam entegre VR'lerden geri adım attı ve daha iyi bir ödünleşim sunan paket üstü (FIVR) tasarımlara döndü.

Apple'ın yaklaşımı farklıdır: ana karttaki özel güç yönetimi IC'leri (PMIC'ler), kart düzeyinde %95+ verimlilikle düzinelerce bağımsız olarak kontrol edilebilir gerilim rayı sağlar, ardından SoC önceden ayarlanmış gerilim/frekans çalışma noktaları arasında ince ayrıntılı geçişi yönetir.

---

## Sınır: Güç Duvarından Sonra Ne Gelecek?

Güç duvarı ortadan kalkmadı — sadece daha zekice yönetildi. Ama temel fizik değişmedi: V² hâlâ dinamik güce hâkim, eşik altı kaçak hâlâ üstel olarak artıyor ve termal yoğunluk her süreç nesiyle artmaya devam ediyor. Peki endüstri nereye gider?

**Eşik yakını hesaplama**, transistörleri V_th'nin hemen üzerinde (0,3-0,4V) gerilimlerde çalıştırarak, 3-10 kat daha yavaş anahtarlama ve üretim varyasyonuna artan duyarlılık pahasına muazzam enerji tasarrufları sağlar. Bir çipin düğme pil üzerinde yıllarca çalışması gereken IoT sensörleri ve aşırı düşük güçlü uygulamalarda niş buluyor.

**Kapıyı-Her-Yönden-Saran (GAA) transistörler** — Samsung'un 3nm'deki GAAFET'i ve TSMC'nin 2nm'deki nanoyüzeyi (nanosheet) ile gelen FinFET'lerin halefi — kanalın elektrostatik kontrolünü iyileştirir, kaçağı azaltır ve daha fazla gerilim ölçeklemeye olanak tanır. Kapıyı kanalın tüm kenarlarına sararak, GAA transistörler daha düşük eşik gerilimlerinde iyi kapalı durum davranışını koruyabilir.

**Arka yüz güç dağıtımı** (Intel'in PowerVia'sı, TSMC'nin BSPDN'si) güç ızgarasını wafer'ın arka yüzüne taşıyarak ön yüzdeki sinyal yönlendirmesinden ayırır. Bu, IR düşüşünü (güç ağı boyunca gerilim düşümü) %30-50 azaltır, yani çip transistörlerde aynı minimum gerilimi elde etmek için daha düşük nominal gerilimde çalışabilir — doğrudan V²f gücünü keser.

**Kriyojenik hesaplama**, Microsoft ve diğerleri tarafından araştırılmakta olup, çipleri 77K'de (sıvı azot sıcaklığı) çalıştırır; burada silikon mobilitesi artar ve kaçak büyüklük mertebeleri düşer. Güç tüketimi 10-20× düşebilir, ama soğutma altyapısı şu anda genel hesaplama için tasarruf ettiğinden daha fazla enerji tüketmektedir. Kuantum bilişim arayüzleri ve niş yüksek performanslı hesaplama uygulamaları için umut vericidir.

---

## Büyük Resim: Güç Yeni Moore Yasası

Eski metrik transistör sayısıydı. Sonra saat hızı oldu. Bugün yarı iletken tasarımında en önemli metrik **watt başına performanstır**. Her büyük mimari karar — Apple'ın geniş-ve-yavaş çekirdekleri tercih etmesinden, NVIDIA'nın tensör çekirdeklerinde daha düşük hassasiyetli aritmetiğe geçişine (FP8, işlem başına FP32'den ~30× daha az enerji tüketir), AMD'nin yongacık yaklaşımına (daha küçük kalıplar daha iyi gerilim homojenliğine sahiptir) — güç duvarına kadar izlenebilir.

İşte tüm zorluğu özetleyen bir sayı: tek bir ChatGPT sorgusu kabaca bir Google aramasının **10 katı enerji** tüketir. Yapay zekâ çıkarımı günde milyarlarca sorguya ölçeklenirken, dünyanın veri merkezlerinin 2030'a kadar **yılda 1.000-1.500 TWh** tüketmesi öngörülüyor — küresel elektrik üretiminin yaklaşık %4-6'sı. Çip başına tasarruf edilen her watt, milyarlarca çiple çarpıldığında inşa edilmesi gerekmeyen bir enerji santralidir.

Dennard ölçeklemesi endüstriye 30 yıllık bedava yolculuk verdi. Şimdi her joule mühendislik, mimari ve yaratıcılıkla kazanılıyor. Frekans savaşları bitti. Verimlilik savaşları yeni başladı.

---

*Yarın jeopolitiğe giriyoruz. 22. Gün bizi TSMC'nin — Taiwan Semiconductor Manufacturing Company — dünyadaki tartışmasız en stratejik öneme sahip şirketin — içine götürüyor. 24 milyon nüfuslu bir adadaki bir sözleşmeli üretici nasıl oldu da küresel ekonominin tek arıza noktası oldu? Ve bu tek nokta kırılırsa ne olur?*

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-21.toml" data-quiz-day="21"></div>
