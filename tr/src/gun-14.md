# Gün 14: Verim ve Kusurlar
## Çip Üretimi Neden İstatistiğe Karşı Bir Savaştır

Artık bir silikon plakayı on üç gün boyunca insanların şimdiye kadar geliştirdiği en aşırı üretim sürecinin içinden takip ettiniz. Fotolitografi ışığın dalga boyundan küçük desenler bastı. İyon implantasyonu hassas sayıda katkı atomunu kristal örgü bölgelerine yerleştirdi. CMP yüzeyleri birkaç angströmlük hassasiyetle parlattı. Bakır ara bağlantılar yalnızca nanometre genişliğindeki hendeklere elektrokaplandı. Ve son olarak bitmiş kalıp, insan saçından daha dar mikro tümsek adımlarıyla paketlendi.

İşte rahatsız edici gerçek: **bu çabanın çoğu başarısız oluyor.**

Bazen değil. Ara sıra değil. Yepyeni bir süreç düğümünde tipik bir fab, **%10-20** kadar düşük verimlerle başlayabilir — yani hattan çıkan çiplerin %80-90'ı kusurlu. TSMC'nin N5 düğümündeki olgun, optimize edilmiş bir süreç bile büyük bir kalıpta yalnızca **%80-90** verim elde edebilir. Milyar dolarlık bir temiz odadan çıkan her plaka bir savaş alanıdır ve kayıplar çıplak gözle görülemeyecek kadar küçük kusurlar tarafından öldürülen çiplerdir — bazen *mikroskopta* bile görülemeyecek kadar küçük.

Verim mühendisliği — bu kusurları bulma, anlama ve ortadan kaldırma disiplini — tartışmasız yarı iletken üretimindeki en önemli rekabet avantajıdır. TSMC'nin döküm pazarına hakim olmasının nedenidir. Intel'in 10 nm'de yıllarca tökezlemesinin nedenidir. Ve %70 verimle %90 verim arasındaki farkın yılda milyarlarca dolar değerinde olabildiği bir disiplindir.

---

## Verim gerçekte ne demek

Tanımlarla başlayalım, çünkü "verim" farklı aşamalarda farklı şeyler ifade eder.

**Hat verimi** (veya parametrik verim), tüm 800-1.200 süreç adımından tamamen hurda edilmeden geçen plakaların oranıdır. Kirlenmiş bir aşındırma odası, yanlış hizalanmış bir litografi pozlaması veya kırılmış bir robot kolu, 25 plakalık bir parti lotun tamamını bir seferde öldürebilir. Modern fablar olgun süreçlerde **%95'in** üzerinde hat verimi elde eder, ama yükselme döneminde tüm lotlar sistematik hatalara kaybolabilir.

**Kalıp verimi** herkesin önemsediği şeydir: bitmiş bir plaka üzerinde gerçekten çalışan bireysel kalıpların oranı. TSMC'nin N3 düğümünde işlenmiş 300 mm'lik bir plaka, Apple'ın A17 Pro'su gibi orta boyutlu bir çip (yaklaşık 100 mm²) için **400-500 kalıp** veya NVIDIA'nın GB200'ü (~800 mm²) gibi devasa bir çip için **50-70 kadar az kalıp** içerebilir. Asıl paranın kazanılıp kaybedildiği yer kalıp verimidir.

**Parametrik verim** başka bir filtre ekler: sadece "çip çalışıyor mu" değil, "yeterince iyi mi çalışıyor?" Bir kalıp doğru çalışabilir ama çok ısınabilir, çok fazla kaçak akım çekebilir veya hedef saat frekansına ulaşamayabilir. AMD ve NVIDIA'nın aynı GPU mimarisini farklı fiyat noktalarında sattığını fark etmişsinizdir — örneğin RTX 4090'a karşı RTX 4080. Bu "farklı" ürünlerin çoğu aslında farklı sayıda işlevsel birim etkinleştirilmiş **aynı kalıptır**. Bir hesaplama kümesinin kusurlu olduğu bir kalıp, daha ucuz parça olarak satılır. **Kalıp hasadı** veya **seçme** olarak adlandırılan bu uygulama, kısmi kusurları atık yerine gelire dönüştürür.

---

## Poisson modeli: Murphy iyimserdi

Verim mühendisliğinin temel denklemi aldatıcı biçimde basittir. 1964'te Fairchild Semiconductor'dan Brian Murphy, kusurları bir otoparkına düşen yağmur damlaları gibi plaka boyunca rastgele dağılmış olarak modellemeyi önerdi. Kusurlar rastgele ve bağımsız düşerse, *A* alanlı bir kalıbın sıfır kusura sahip olma olasılığı **Poisson dağılımını** izler:

**Y = e^(−D₀ × A)**

Burada *D₀*, **kusur yoğunluğu** — santimetre kare başına ortalama öldürücü kusur sayısı — ve *A*, santimetre kare cinsinden kalıp alanıdır.

Bu denklem çip üretiminin temel gerilimini ortaya koyar. Fabınızın cm² başına **0,1 kusur** yoğunluğuna sahip olduğunu varsayın — bu, dünya standartlarında olgun bir süreci temsil eden *son derece* iyi bir değerdir. Küçük bir kalıp (1 cm², mikrodenetleyici gibi) için verim e^(−0,1) ≈ **%90,5**'tir. Rahat.

Şimdi 8 cm²'lik büyük bir GPU kalıbına (NVIDIA'nın AD102'sinin yaklaşık boyutu) ölçeklendirin: e^(−0,8) ≈ **%44,9**. Çiplerinizin yarısından fazlasını kaybettiniz. Ve NVIDIA'nın en son GB200 süper çip kalıbı daha da büyük — yaklaşık 8,14 cm²'de matematik *acımasızlaşır*.

Bu yüzden kalıp boyutu çip tasarımındaki en kritik ekonomik kararlardan biridir. Kalıp alanını ikiye katlayın ve silikon maliyetini sadece ikiye katlamış olmazsınız — verim üstel olarak düştüğü için *ikiden fazla* katlarsınız. Ayrıca çiplet devriminin (Gün 13'te ele aldığımız) kısmen bir verim hamlesi olmasının nedeni de budur: AMD'nin EPYC Rome'u, tek bir devasa sunucu kalıbı olacak olanı her biri yaklaşık 74 mm²'lik sekiz küçük "çiplet"e böler. Her çiplet, monolit bir 600 mm²'lik kalıba göre çok daha iyi verim verir.

Gerçek dünya tabii ki saf Poisson'dan daha karmaşıktır. Kusurlar tamamen rastgele değildir — kirlenme olayları, ekipman arızaları veya plaka kenar etkileri etrafında kümelenme eğilimindedir. **Negatif binom modeli** (kafa karıştırıcı biçimde aynı Brian Murphy'nin adıyla anılan Murphy'nin verim modeli) bu kümelenmeyi mekansal korelasyon derecesini yakalayan bir *α* parametresiyle açıklar. Ama temel içgörü geçerliliğini korur: **verim, kalıp alanı × kusur yoğunluğunun üstel bir fonksiyonudur ve her ikisinin de acımasızca minimize edilmesi gerekir**.

---

## Ters gidebilecek şeylerin taksonomisi

Tüm kusurlar eşit yaratılmamıştır. Çipleri neyin öldürdüğünü — ve neyin sadece yaraladığını — anlamak bir taksonomi gerektirir.

**Parçacık kusurları** en sezgisel olanıdır: plaka yüzeyine konan ve bir devre desenini ya engelleyen ya da köprüleyen bir toz zerresi, metal pulu veya fotorezist parçası. Takıntılı temiz oda protokollerine rağmen (ISO Sınıf 1 hava, 0,1 µm'den büyük parçacıkları filtreleyen), parçacıklar hâlâ ortaya çıkar. Ekipmanlardan, plaka işlemeden, kimyasallardan ve hatta araçları bakım yapan insanlardan kopuyor — tek bir deri parçacığı yaklaşık 30 µm boyutundadır, 3 nm düğümünde binlerce transistörü yok etmeye yeter. Modern fablar, her plaka yüzeyini kritik adımlardan sonra tarayan ve çıplak silikon üzerinde **18-20 nm** kadar küçük parçacıkları tespit eden **lazer taramalı parçacık denetim cihazları** (KLA ve Hitachi High-Tech gibi şirketlerden) kullanır. KLA'nın Surfscan SP7'si tüm 300 mm'lik bir plakayı yaklaşık 30 saniyede tarayarak milyonlarca potansiyel kusur noktasını haritalayabilir.

**Desen kusurları**, litografik desenleme ters gittiğinde meydana gelir — bir çizgi çok dar, çok geniş, komşusuna köprülenmiş veya tamamen kopuk. Kapı adımının yaklaşık 48 nm ve metal adımının yaklaşık 21 nm olduğu 3 nm düğümünde, çizgi genişliğinde **1-2 nm**'lik bir değişim bile transistör eşik gerilimini arızaya neden olacak kadar kaydırabilir. Bu kusurlar, plaka üzerindeki gerçek desenleri nanometre yakınında çözünürlükle görüntüleyen **e-ışın denetim** araçlarıyla (ASML'nin HMI eScan'i gibi masif paralel elektron demeti araçları) bulunur. Sorun: e-ışın denetimi *yavaştır* — tam çözünürlükte tüm plakayı taramak **günler** alabilir, bu yüzden fablar onu hesaplamalı sıcak nokta analizi tarafından yönlendirilen küçük örnek alanlarında kullanır.

**Parametrik kusurlar** daha inceliklidir. Transistörler çalışır ama elektriksel özellikleri spesifikasyonların dışına kayar. 0,2 nm çok kalın bir kapı oksidi. Bir bölgede %5 çok yüksek bir katkı konsantrasyonu. Bakırdaki tane yapısı varyasyonları nedeniyle direnci yükselen bir ara bağlantı hattı. Bunlar çipi her zaman doğrudan öldürmez — performansı düşürür, güç tüketimini artırır veya güvenilirliği azaltır. Onları bulmak plaka düzeyinde **elektriksel test** gerektirir; burada binlerce iğne benzeri kontağa sahip prob kartları her kalıba dokunur ve test desenleri çalıştırır.

**Sistematik kusurlar** en sinsi kategoridir çünkü *her kalıbı aynı şekilde* etkiler. Litografi tarayıcısındaki belirli bir via katmanının 3 nm çok geniş basmasına neden olan bir mercek aberasyonu. Aşındırma odasındaki plaka boyunca aşındırma hızı tekdüzeliğini kaydıran bir kirlenme. Belirli bir metal yoğunluğu geçişinin kenarında 2 nm'lik bir basamak yüksekliği bırakan bir CMP tarifi. Bu kusurlar rastgele verim kaybı olarak görünmez — teşhis etmek haftalar alabilen **korelasyonlu arızalar** olarak görünür. Intel'in 10 nm sürecini (daha sonra Intel 7 olarak yeniden adlandırılan) yükseltirken yaşadığı ünlü "verim uçurumu", basit düzeltmelere direnen sistematik kusurlar tarafından tetiklendi.

---

## Tek bir kusurun ekonomisi

Endüstrinin denetim ve metroloji ekipmanlarına yılda neden yaklaşık **15 milyar dolar** harcadığını kavramak için ekonomiyi düşünün.

TSMC'nin N3 düğümündeki tek bir 300 mm plaka, tüm adımlardan geçirilmek için yaklaşık **16.000-20.000 dolar** maliyetlidir. Plaka 400 kalıp içeriyorsa ve her iyi kalıp Apple'a bir iPhone işlemcisinin parçası olarak **100-150 dolar** kâr marjıyla satılıyorsa, tam verimli bir plaka yaklaşık **40.000-60.000 dolar** gelir üretir. %80 verimde 80 kalıp kaybedersiniz — bu **8.000-12.000 dolar** uçtu.

Şimdi kusur yoğunluğunuzun 0,10/cm² yerine 0,12/cm² olduğunu hayal edin — herhangi bir bireysel süreç ölçümünde neredeyse görünmeyecek kadar küçük bir fark. 100 mm²'lik bir kalıp için bu 0,02/cm²'lik artış verimi yaklaşık %90,5'ten yaklaşık %88,7'ye düşürür — plaka başına yaklaşık **7 ek ölü kalıp**. TSMC'nin belki **ayda 100.000 plaka**lık N3 üretim hacminde, plaka başına o 7 ek ölü kalıp ayda **700.000 kayıp kalıba** çevirir ve potansiyel olarak **ayda 70-100 milyon dolar** kayıp gelir değerindedir.

Santimetre kare başına yüzde iki kusurluk bir iyileştirme yılda milyar dolar değerindedir. TSMC'nin neden binlerce verim mühendisi istihdam ettiğini, KLA'nın hisse senedi fiyatının on yılda 10 kat büyüdüğünü ve yarı iletken üretimindeki en iyi korunan sırrın herhangi bir tek süreç tarifi olmayıp verimi hafta hafta yükselten kapsamlı, entegre kusur tespiti, kök neden analizi ve sürekli iyileştirme *sistemi* olduğunu bu anlatır.

---

## Denetim cephaneliği

Modern bir çipte kusur bulmak, bir kumsalda — yörüngeden — belirli bir kum tanesini bulmak gibidir. Endüstri bu iş için olağanüstü bir araç seti inşa etmiştir.

**Optik denetim** araçları (KLA'nın 29xx serisi Puma platformları) plaka üzerine geniş bantlı veya lazer ışığı gönderir ve kusurlardan saçılan ışığı tespit eder. Her kalıp görüntüsünü komşularıyla — **kalıptan kalıba** karşılaştırma yöntemi — veya bilinen iyi bir kalıptan referans görüntüyle karşılaştırır. Plaka başına kabaca **10-25 milyar piksel** ile bu araçlar yüksek hacimli bir fabda günde *petabaytlarca* ham veri üretir. Modern sistemler, tespit edilen olayları kategorilere (parçacık, çizik, desen kusuru, gürültü) **10.000'de 1'den** düşük yanlış alarm oranlarıyla sınıflandırmak için makine öğrenimi sınıflandırıcıları kullanır.

**E-ışın inceleme** araçları (Applied Materials'ın SEMVision G7'si gibi) optik denetimden işaretlenen koordinatları alır ve nanometre çözünürlükte taramalı elektron mikroskobu ile görüntüler. Kusurun gerçekte ne olduğunu *gördüğünüz* yer burasıdır — köprülenmiş bir metal hat, eksik bir via, çökmüş bir fotorezist özelliği. İnceleme verimi tipik olarak **saatte 100-500 kusur**dur, bu yüzden optik denetimin ilk filtreleme geçişini yapması gerekir.

**Optik kritik boyut (OCD)** metrolojisi, periyodik yapılara polarize ışık göndererek ve yansıyan spektrumu analiz ederek nanometre altı hassasiyetle özellik boyutlarını ölçmek için spektroskopik elipsometri kullanır. Tek bir OCD ölçümü bölge başına yaklaşık **1 saniye** sürer ve yansıyan spektrumu yapının fizik bazlı bir modeline uydurarak çizgi genişliği, yan duvar açısı, film kalınlığı ve bindirmeyi aynı anda karakterize edebilir. Nova Ltd. ve Onto Innovation burada liderdir ve araçları kritik katmanlarda **plaka başına 40-100 bölgede** ölçüm yapar.

**Süreç içi elektriksel test** en doğrudan verim tahmin aracıdır. Kalıplar arasındaki kesim yollarına inşa edilen kısa devre test yapıları — minyatür devreler — ara süreç adımlarında test edilerek plaka ilerlemeden önce elektriksel arızaları yakalanır. Metal katman 4'te (15'ten fazla katmanın) bir via direncinin %20 yüksek kayma gösterdiğini bulmak, mühendislerin mahkum plakalara 8.000 dolar daha fazla işleme harcamak yerine lotu erken öldürmesine olanak tanır.

---

## Verim öğrenme eğrisi: berbattan para makinesine

Her yeni süreç düğümü, endüstrinin **verim öğrenme eğrisi** dediği karakteristik bir verim yörüngesi izler ve bunu anlamak yarı iletken ekonomisini anlamak için esastır.

**Aşama 1: Teknoloji geliştirme** (üretimden 2-3 yıl önce). Verim esasen önemsizdir — mühendisler sürecin çalıştığını kanıtlamak için ilk test çiplerini yapıyor. Kusur yoğunlukları cm² başına **10'u** aşabilir. Amaç entegrasyon: 1.000'den fazla süreç adımının felaket bir arıza olmadan birlikte çalışmasını sağlamak.

**Aşama 2: Risk üretimi** (yüksek hacimden 6-12 ay önce). İlk gerçek ürünler teyp-out yapılır. Küçük kalıplar için verim **%20-40** olabilir, büyükler için esasen sıfır. Apple ve Qualcomm'un ilk çalışan A serisi veya Snapdragon örneklerini aldığı dönem budur. Çipler elle seçilir ve yalnızca en iyileri test için kullanılır. Kusur yoğunluğu tipik olarak **0,3-0,5/cm²**'dir.

**Aşama 3: Yükselme** (üretimin ilk 6-12 ayı). En yoğun verim mühendisliği dönemi. Fablar haftada **yüzlerce tasarlanmış deney** çalıştırır — aşındırma tariflerini ayarlama, litografi dozu ve odağını değiştirme, CMP bulamaç konsantrasyonlarını değiştirme, biriktirme sıcaklıklarını modifiye etme — her biri bir kusur kategorisini ortadan kaldırmayı amaçlar. Verim %40'tan %70'e, sonra %80'e tırmanır. TSMC'nin efsanevi yürütme kalitesinin onu rakiplerden ayırdığı yer burasıdır: karşılaştırılabilir düğümlerde Intel veya Samsung'dan 6-12 ay önce olgun seviyelere ulaşarak sürekli daha hızlı verim yükseltmişlerdir.

**Aşama 4: Olgunluk** (1-3 yıl sonra). Verimler küçükten orta boy kalıplar için **%85-95'te** stabilize olur. Kusur yoğunluğu **0,05-0,10/cm²**'ye ulaşır. İyileştirmeler artımlıdır — 0,01/cm² daha sıkmak aylar sürebilir. Bu noktada fab bir para makinesidir: neredeyse her kalıp çalışır, süreç marjları iyi anlaşılmıştır ve hat maksimum verimde çalışır.

**Aşama 5: Ömür sonu.** Düğüm yıllarca (bazen özel uygulamalar için on yıllarca) üretmeye devam eder, ama mühendisler bir sonraki düğüme geçmiştir. Verim istikrarlı ama durağandır.

Bu eğri boyunca hareket etmenin — ilk silikondan olgun verime — toplam maliyeti, öncü kenarda süreç düğümü başına **2-4 milyar dolar** olarak tahmin edilir. 2000'de yaklaşık yirmiden bugün tam olarak **üçe** (TSMC, Samsung, Intel) düşen, öncü süreçler geliştirebilen şirket sayısının başlıca nedenlerinden biridir.

---

## Öldürücü kusurlar ile gizli kusurların şaşırtıcı ekonomisi

İşte güvenilirlik mühendislerini geceleri uyanık tutan sezgiye aykırı bir gerçek: **bulduğunuz kusurlar, bulamadıklarınızdan daha az tehlikelidir**.

"Öldürücü kusur" — plaka düzeyinde test sırasında kalıbın tamamen arızalanmasına neden olan — aslında ters bir anlamda *iyi* tür bir kusurdur. Yakalarsınız, kalıbı atarsınız ve devam edersiniz. Müşteri asla görmez. Veriminiz darbe alır ama itibarınız almaz.

**Gizli kusurlar** korkutucu olanlardır. Bunlar silikon içinde mevcut olan ama anında arızaya neden olmayan kusurlardır — kısmen boşluklu bir via, marjinal olarak ince bir kapı oksidi, düşük-k dielektrik katmanında ince bir çatlak. Çip tüm fabrika testlerini geçer. Paketlenir, gönderilir ve bir arabanın fren kontrolcüsüne veya tıbbi bir cihaza veya bir veri merkezi sunucusuna kurulur. Ve sonra, aylar veya yıllar sonra, termal döngülerin, elektromigrasyon veya gerilim dalgalanmalarının stresi altında gizli kusur yayılır ve çip sahada arızalanır.

Yarı iletken endüstrisi bunu **DPPM** — Milyon Başına Kusurlu Parça — metriğiyle ölçer. Tüketici elektroniği için DPPM hedefleri tipik olarak **50-500**'dür (gönderilen her milyon çipten 50-500'ünün ürün ömrü içinde arızalanacağı anlamına gelir). Otomotiv uygulamaları için — arızalı bir çip birini öldürebilir — hedef **<1 DPPM**'dir ve giderek artan şekilde endüstri **<0,1 DPPM** (gönderilen on milyon çipten bir kusurlu çip) hedefliyor.

1 DPPM'nin altına ulaşmak, kalıp verimini maksimize etmekten tamamen farklı bir zihniyet gerektirir. Daha sıkı test yapamazsınız — hiçbir test paketi olası her devre yolunu ve zamanlama kombinasyonunu çalıştıramaz. Bunun yerine endüstri, **yakma testi** (çipleri gizli arıza mekanizmalarını hızlandırmak için saatlerce yüksek gerilim ve sıcaklıkta çalıştırma), **aykırı değer taraması** (test parametreleri spesifikasyon dahilinde olan ama istatistiksel olarak sıra dışı olan kalıpları — dağılımın "kuyruğunu" — işaretleme) ve giderek artan biçimde, belirli kalıpların gizli kusur barındırma olasılığını tahmin etmek için süreç içi süreç verilerini saha arıza oranlarıyla ilişkilendiren **makine öğrenimi modelleri** kullanır.

Bu, **IDDQ testi** — tüm girişler statik lojik seviyelerinde tutulurken çipin bekleme güç kaynağı akımını ölçmek — alanıdır. Sağlıklı bir CMOS devresi esasen sıfır statik akım çekmelidir (yalnızca küçük kaçak akımlar). Gizli kapı oksit kusuru veya kısmen köprülenmiş ara bağlantıya sahip bir kalıp hafifçe yüksek IDDQ çekecektir — belki 30 µA yerine 50 µA. Fonksiyonel testte görünmeyen o 20 µA'lık fark, madendeki kanaryadadır.

---

## İnsan faktörü

Tüm otomasyona rağmen verim mühendisliği derinden insani olmaya devam eder. Bir fabtaki en değerli insanlar ekipman operatörleri veya süreç mühendisleri değildir — birden fazla plaka lotundaki karmaşık arıza desenine bakabilen, bunu süreç odası bakım kayıtları, ekipman sensör verileri, gelen malzeme kalitesi ve çevresel faktörlerle ilişkilendirebilen ve kök nedeni belirleyebilen **verim entegrasyon mühendisleri**dir.

İşte endüstri folklorundan gerçek bir örnek. Bir fab belirli bir metal katmanda verim kaybı yaşıyordu — bakır hatlarda rastgele açık devreler. Kusur düzensiz görünüyordu, bazı lotları etkiliyor ama diğerlerini etkilemiyordu, açık bir desen yoktu. Haftalarca süren soruşturma elektrokaplama kimyasında, CMP sürecinde veya aşındırmada yanlış bir şey bulamadı. Sonunda bir verim mühendisi etkilenen lotların hepsinin Perşembe veya Cuma günü işlendiğini fark etti. Daha ileri soruşturma, binanın HVAC sisteminin dış müteahhit tarafından her Çarşamba gecesi bakım yapıldığını ortaya çıkardı. Bakım prosedürü alt fabda bir erişim panelinin kısa süreliğine açılmasını içeriyordu ve bu, yakın endüstriyel aktiviteden iz miktarda kükürt taşıyan dış havanın ultra saf kimyasal kaynağını kirletmesine neden oluyordu. Kükürt, bakır tohum katmanını rastgele görünen ama aslında haftalık olan bir desenle korozyona uğratıyordu.

Bunun gibi hikayeler verim mühendisliğinin neden tamamen otomatize edilemeyeceğini gösterir. Arama alanı inanılmaz derecede büyüktür — binlerce süreç parametresi, yüzlerce ekipman sensörü, düzinelerce gelen malzeme spesifikasyonu — ve korelasyonlar genellikle açık değildir. En iyi verim mühendisleri istatistiksel titizliği dedektif sezgisi benzeri bir şeyle birleştirir ve yarı iletken endüstrisindeki en yüksek ücretli kişiler arasındadır.

---

## Verimin geleceği

Transistörler atomik boyutlara yaklaştıkça verim mühendisliği temel yeni zorluklarla karşılaşır. Gün 10'da ele aldığımız **rastgele katkı dalgalanması**, aynı kalıp üzerindeki fiziksel olarak özdeş iki transistörün, birinin kanalında 47, diğerinin 52 katkı atomu olması nedeniyle farklı eşik gerilimlerine sahip olabileceği anlamına gelir. GAA (Gate-All-Around) nanolevha transistörlü 2 nm düğümünde kanal bölgesi kritik katkı türünün yalnızca **50-100 atomunu** içerebilir. Bu sayıdaki istatistiksel varyasyon doğrudan verimi etkiler.

EUV litografisindeki **stokastik kusurlar** başka bir sınır sunar. 13,5 nm dalga boyunda fotorezist deseninin her pikseli en agresif adımlarda yalnızca **birkaç düzine foton** tarafından pozlanır. Foton varışındaki istatistiksel dalgalanma (çekim gürültüsü) her basılan özelliğin tam şeklinin ince bir şekilde rastgele olduğu anlamına gelir. Çoğu zaman rastgelelik önem arz etmeyecek kadar küçüktür. Ama tek bir kalıptaki **yüz milyarlarca** özellik boyunca, trilyonda bir olasılıklı ölümcül bir stokastik kusur bile gerçek bir verim sınırlayıcısı haline gelir. Bu, stokastik farkındalıklı hesaplamalı litografiye — foton çekim gürültüsüne en savunmasız belirli desen konfigürasyonlarını belirlemek ve onları yeniden tasarlamak veya telafi edici özellikler eklemek için simülasyon kullanma — büyük yatırımları yönlendiriyor.

Ve sonra dün tartıştığımız **ileri paketleme**nin verim zorluğu var. Birden fazla kalıbı 9 µm adımlı mikro tümseklerle veya 3 µm adımlı hibrit bağlantılarla birbirine bağladığınızda, *montajın* verimi her bireysel kalıbın veriminin çarpı bağlama sürecinin veriminin çarpımıdır. Dört çiplet'in her biri %95 verime sahipse ve bağlama süreci %98 verime sahipse, birleşik paket verimi 0,95⁴ × 0,98³ ≈ **%76,6**'dır. Bilinen-İyi-Kalıp (KGD) testi — her kalıbı pahalı bir çok kalıplı pakete aktarmadan önce tamamen doğrulama — vazgeçilmez hale gelir, ancak son paketi olmayan çıplak kalıpları test etmek kendi başına teknik bir zorluktur.

---

## Ana ders

Verim mühendisliği, yarı iletken üretiminin gerçek doğasını ortaya koyduğu yerdir: deterministik bir montaj hattı olarak değil, **entropiye karşı olasılıksal bir savaş** olarak. Her adım arıza olasılığını tanıtır. Her malzemenin safsızlıkları vardır. Her makine kayar. Her kimyasal tepkimenin yan ürünleri vardır. Fab çipleri *yapmaz* — ölçüm, geri besleme ve amansız optimizasyonla istatistiksel gerçekliğe karşı savaşarak onları varlığa *ikna eder*.

Bu savaşı kazanan şirketler — hepsinden önce TSMC — rakiplerin sahip olmadığı sihirli bir teknolojiye sahip olarak kazanmaz. Kusurları daha hızlı tespit eden, kök nedenleri daha doğru ilişkilendiren ve düzeltmeleri daha güvenilir şekilde uygulayan **sistemlere** sahip olarak kazanır — plaka plaka, lot lot, yıl yıl. Gösterişli değildir. Bir ay projesi değildir. Santimetre kare başına yüzde birlik kusurlarla ölçülen bir mücadeledir. Ve yılda on milyarlarca dolar değerindedir.

Yarın fabı tamamen terk edip **çip tasarımı** dünyasına giriyoruz: Verilog gibi bir donanım tanımlama dilinden fabriye her transistörü ve teli nereye koyacağını söyleyen GDSII dosyasına kadar olan yolculuk. Verim mühendisliği fiziğe karşı savaş ise, çip tasarımı karmaşıklığa karşı savaştır — ve kendi olağanüstü araç cephaneliğini gerektirir.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-14.toml"></div>
