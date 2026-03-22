# Gün 10: Katkılama ve İyon İmplantasyonu
## Silikona Elektriksel Kişiliğini Vermek

Dün hendekler oyduk ve filmler biriktirdik — bir çipin fiziksel mimarisini plazma ve atomik katman hassasiyetiyle şekillendirdik. Ama mükemmelce oyulmuş saf bir silikon bloğu hiçbir işe yaramaz. Öylece durur, bir cam parçasının elektriksel karizmasına sahip kristal bir kütle. Onu *hesap yaptırmak* için, elektronik karakterini kökten değiştirmeniz gerekir — şeklini değiştirerek değil, atomik ruhunu bozarak.

Bu **katkılama**dır: akımın akıp akmayacağını ve ne kadar kolay akacağını kontrol etmek için bir silikon kristaline kasıtlı olarak safsızlık atomları sokmak. Yarı iletken fiziğinin en önemli numarasıdır; 0,01 dolarlık bir silikon parçasının 300 dolarlık bir işlemciye dönüşmesinin nedenidir. Ve modern fabların bunu yapma yöntemi — parçacık fiziği deneyine benzer enerjilerle iyonize atom demetlerini plakalara ateşlemek — tüm üretim süreçleri arasındaki en hassas kontrol edilenlerden biridir.

## Saf silikon neden işe yaramaz (ve güzeldir)

Silikon, periyodik tablonun 14. grubunda yer alır. Her atomun dört valans elektronu vardır ve mükemmel bir kristalde her atom, elmas kübik örgüde dört komşusuyla kovalent bağ yapar. Tüm elektronlar meşguldür. Mutlak sıfırda akım taşıyacak serbest taşıyıcı yoktur. Silikon, en saf haliyle bir **iç yarı iletken**dir — ve oda sıcaklığında iç taşıyıcı konsantrasyonu yalnızca yaklaşık **1,5 × 10¹⁰ taşıyıcı/cm³** kadardır. Bu çok gibi görünür, ta ki bir küp santimetre silikonun yaklaşık **5 × 10²² atom** içerdiğini fark edene kadar. Serbest taşıyıcıların atomlara oranı kabaca trilyonda birdir.

Bu, saf silikonu berbat bir iletken yapar. Oda sıcaklığındaki özdirenci yaklaşık **2.300 ohm-santimetre**dir — bakırdan (1,7 × 10⁻⁶ Ω·cm) milyonlarca kat daha dirençli ama camdan (10¹⁰ Ω·cm) çok daha iletken. Elektriksel bir iki arada bir derede sıkışmıştır ve tam da bu yüzden kullanışlıdır. Zaten iyi ileten bir malzeme kolayca anahtarlanamaz. Asla iletmeyen bir malzeme işe yaramaz. Silikon, nispeten küçük bir itmenin onu yalıtkandan iletkene taşıyabildiği o altın noktada durur.

O itme katkılamadır.

## Palet olarak periyodik tablo

Fikir basittir: bazı silikon atomlarını (dört valans elektronu) ya **beş** ya da **üç** valans elektronuna sahip atomlarla değiştirin. Bu, örgü boyunca hareket edip akım taşıyabilen ya fazla bir elektron ya da eksik bir elektron — bir "boşluk" — yaratır.

**N-tipi katkılama**, Grup 15 elementlerini kullanır, en yaygın olarak **fosfor** (P) veya **arsenik** (As). Bir fosfor atomu silikon örgüsüne yerleşir ve tıpkı silikon gibi dört komşuyla bağ yapar. Ama fosforun beş valans elektronu vardır, dolayısıyla biri artar ve gevşek bağlıdır. Oda sıcaklığında termal enerji onu serbest bırakmaya yeter. O fazla elektron serbest taşıyıcı olur. Her milyon silikon atomundan sadece birini fosforla değiştirirseniz — yaklaşık **5 × 10¹⁶ atom/cm³** konsantrasyon — serbest taşıyıcı sayısını iç silikona göre yaklaşık **üç milyon kat** artırırsınız. Özdirenç 2.300 Ω·cm'den yaklaşık **0,1 Ω·cm**'ye düşer.

**P-tipi katkılama**, Grup 13 elementlerini kullanır, en yaygın olarak **bor** (B). Borun yalnızca üç valans elektronu vardır, bu nedenle bir silikon bölgesini işgal ettiğinde bir bağ tatmin edilmemiş kalır. Bu, komşu elektronların içine atlayabildiği bir boşluk — pozitif yüklü bir vakans — yaratır. Boşluklar kristal boyunca etkin pozitif yükler olarak hareket eder ve p-tipi silikon, eşdeğer katkılama seviyelerinde n-tipi kadar iyi iletir.

İşte işlerin ilginçleştiği yer: tek bir silikon parçası bir bölgede n-tipi, diğerinde p-tipi olabilir. Aralarındaki sınır — **p-n eklemi** — transistör büyüsünün gerçekleştiği yerdir. Taşıyıcılar sınır boyunca yayılır, yerleşik bir elektrik alanı ve bir tükenme bölgesi oluşturur. Bir gerilim uygulayın ve bu bölgeyi genişletebilir veya daraltabilir, akım akışını açıp kapatabilirsiniz. Her MOSFET, her diyot, her güneş pili bu numaraya bağlıdır.

Zorluk her zaman olduğu gibi kontroldedir. Modern bir FinFET transistörün **5 nanometre** genişliğinde bir kanal bölgesi olabilir ve burada katkılama konsantrasyonunun yüzeyde tam olarak **10¹⁸ atom/cm³** olması ve sadece 50 nanometre daha derinde **10¹⁵ atom/cm³**'ye düşmesi gerekir. Hemen yanındaki kaynak ve boşaltım bölgeleri, kontak direncini en aza indirmek için **10²¹ atom/cm³** — bin kat daha yüksek — gerektirebilir. Bu profilleri üç boyutta, 300 mm'lik bir plaka üzerinde milyarlarca transistörde doğru elde etmek **iyon implantasyonu**nun işidir.

## İyon implantasyonu: üretim için bir parçacık hızlandırıcı

Yarı iletken üretiminin ilk dönemlerinde (1950'ler-60'lar) katkılama **termal difüzyon** ile yapılırdı: plakaları katkı maddesini içeren bir gazın (fosfin veya diboran gibi) yanında 900-1100°C'de bir fırına koyun ve atomların yüzeye yayılmasını bekleyin. Bu işe yarar, ama hassas değildir. Difüzyon, sıcaklık, süre ve kristal yönelimine bağlı tamamlayıcı hata fonksiyonu profillerini izler. Derinliği dozdan bağımsız olarak kolayca kontrol edemezsiniz. Ve gereken yüksek sıcaklıklarda, plakada zaten bulunan katkı maddeleri hareket eder — daha önce oluşturulmuş eklemlere zarar veren **katkı yeniden dağılımı** adlı bir fenomen.

İyon implantasyonu her şeyi değiştirdi. Modern formunda 1960'larda icat edilen ve **Varian Semiconductor** (şimdi **Applied Materials**'ın parçası) ile **Axcelis Technologies** gibi şirketler tarafından ticarileştirilen iyon implantasyonu şöyle çalışır:

1. **İyon kaynağı**: İstenen katkı maddesini içeren bir gaz — bor için BF₃, fosfor için PH₃, arsenik için AsH₃ — bir ark odasına beslenir. Bir elektrik deşarjı gazı iyonize ederek çeşitli iyon türlerinden oluşan bir plazma yaratır.

2. **Kütle analizi**: İyon demeti bir **analiz mıknatısı**ndan — esasen bir kütle spektrometresinden — geçer. Farklı iyon türleri, farklı kütle-yük oranları nedeniyle farklı yarıçaplarda sapar. Bir çözümleme yarığı yalnızca istenen türü seçer. Bor-11 (kütle 11) istiyorsanız, mıknatıs ¹¹B⁺ iyonlarını tam yarıktan geçirirken BF₂⁺ (kütle 49) ve ¹⁰B⁺ (kütle 10) engellenir. Kütle çözünürlüğü tipik olarak **1 atomik kütle biriminden** daha iyidir ve izotopik saflığı garanti eder.

3. **Hızlandırma**: Seçilen iyonlar bir elektrik potansiyeli boyunca hızlandırılır. Enerji, iyonların ne kadar derine gitmesi gerektiğine bağlı olarak tipik olarak **0,2 keV ila 3 MeV** arasındadır. Düşük enerjiler (birkaç yüz eV ila birkaç keV) yüzeye yakın ultra sığ eklemler üretir — modern kaynak/boşaltım uzantıları için kritik. Yüksek enerjiler (yüzlerce keV ila MeV) katkı maddelerini retrograd kuyu yapıları için alt tabakanın derinliklerine gömer.

4. **Demet tarama**: Enerjili demet plaka boyunca taranır (veya plaka demet boyunca mekanik olarak taranır) ve tekdüze kaplama sağlanır. Modern araçlar 300 mm'lik bir plaka boyunca **±%0,5** doz tekdüzeliği elde eder — yani santimetre kare başına implante edilen atom sayısı merkezden kenara yüzde yarımdan az değişir.

5. **Doz kontrolü**: Toplam doz, demet akımının zaman üzerinden entegrasyonuyla ölçülür. Bir Faraday bardağı veya doz ölçüm sistemi plakaya çarpan her iyonu takip eder. Tipik dozlar **10¹¹ iyon/cm²**'den (eşik gerilimi ayarlaması — sadece bir fısıltı katkı) **10¹⁶ iyon/cm²**'ye (yoğun katkılı kaynak/boşaltım — doyurucu bir sel) kadar uzanır. Bu, aynı araçtan **100.000 katlık** bir dinamik aralıktır.

İyon implantasyonunun güzelliği, enerjinin ve dozun **bağımsız olarak kontrol edilebilmesindedir**. Hızlanma gerilimini artırın, iyonlar daha derine gider. Demet akımını artırın (veya daha uzun implante edin) ve daha fazla iyon birikir. Derinlik için bir ayar düğmeniz ve konsantrasyon için ayrı bir ayar düğmeniz var. Difüzyon size böyle bir lüks sunmaz.

## İyonlar silikona çarptığında ne olur

100 keV'e hızlandırılmış bir arsenik iyonu silikon örgüsüne yaklaşık **600.000 metre/saniye** hızla — ışık hızının yaklaşık %0,2'si — çarpar. Örgü yerine nazikçe yerleşmez. Bir porselen dükkanına giren gülle gibi kristali yararak ilerler.

Gelen her iyon, örgüde ilerlerken iki tür enerji kaybına uğrar:

- **Çekirdek durması**: İyon silikon çekirdekleriyle çarpışır ve bilardo toplarına benzer çarpışmalarda kinetik enerji aktarır. Bu olaylar silikon atomlarını örgü konumlarından yerinden eder ve **Frenkel çiftleri** (bir boşluk artı yerinden edilmiş bir ara yer atomu) yaratır. Tek bir 100 keV arsenik iyonu yolunda yaklaşık **2.000 silikon atomunu** yerinden edebilir.

- **Elektronik durma**: İyon elektron bulutuyla etkileşir ve enerjiyi kademeli olarak kaybeder — sürtünme gibi. Daha yüksek enerjilerde baskın olur ve daha az yapısal hasara neden olur.

İyon sonunda **yansıtılmış menzil** (Rp) adı verilen bir derinlikte durur. Silikondaki 100 keV arsenik için Rp yaklaşık **70 nanometre**dir. 10 keV bor için yaklaşık **35 nanometre**dir. Öncü düğümlerdeki ultra sığ eklem implantlarında kullanılan 500 eV bor için yalnızca **2 ila 3 nanometre**dir. Dağılım kabaca Gauss şeklindedir ve standart sapma **saçılma** (ΔRp) olarak adlandırılır, tipik olarak yansıtılmış menzilin %20-40'ı kadardır.

Ama işte sezgiye aykırı kısım: **implantasyondan sonra katkı maddesi atomlarının neredeyse hiçbiri elektriksel olarak aktif değildir.** Rastgele ara konumlarda, etraflarında harap edilmiş bir hasar bölgesiyle oturuyorlar. Her iyon izinin çevresindeki kristal örgü bir savaş alanına benzer — boşluklar, yerinden edilmiş atomlar, amorf cepçikler. Bu noktada özdirenci ölçseniz, implantasyondan öncesinden daha *yüksek* olur, daha düşük değil.

Bu yüzden her implantasyonun ardından **tavlama** gelmelidir.

## Tavlama: kristali iyileştirmek ve katkı maddelerini uyandırmak

Tavlama, implantasyon hasarını onarmak ve katkı maddesi atomlarını **yer değiştirme örgü bölgeleri**ne — bir silikon atomunun yerini alıp fazla elektronunu (veya boşluğunu) iletime katan konumlara — taşımak için ısı uygulamaktır. Yabancı atomların örgü bölgeleri arasında işe yaramaz biçimde oturması ile kristale elektriksel olarak aktif donörler veya akseptörler olarak entegre olması arasındaki farktır.

Zorluk müthiştir: kristali onarmak ve katkı maddelerini aktive etmek için yeterli termal enerjiye ihtiyacınız var, ama katkı maddelerinin koyduğunuz yerden **yayılmasına** yol açacak kadar fazlasına değil. Bu gerçek bir fiziksel ikilemdir. 1000°C'de silikon öz difüzyonu ve katkı difüzyonu önemli düzeydedir. Bor özellikle sorunludur — ılımlı sıcaklıklarda bile kolayca yayılır ve **geçici artırılmış difüzyon (TED)** adlı bir fenomen durumu daha da kötüleştirir. TED, implantasyon sırasında oluşan fazla ara yer silikon atomlarının, bor atomlarını bölgeden bölgeye termal difüzyonun tek başına öngöreceğinden çok daha hızlı tekmeleyerek taşıyan "araçlar" işlevi görmesiyle meydana gelir. Yalnızca 10 nm derinliğe ulaşacak şekilde dikkatle implante edilmiş bir bor profili, geleneksel bir tavlamadan sonra 30 nm'ye şişebilir.

Endüstrinin çözümü: **tavlamayı acımasızca kısa tutmak.**

**Hızlı termal tavlama (RTA)**, plakayı halojen lamba grupları kullanarak **1 ila 10 saniyede** 900-1100°C'ye ısıtır, ardından hızla soğutur. Bu, katkının yaklaşık **%90-95'ini** aktive ederken difüzyonu birkaç nanometreyle sınırlar.

Ama en ileri düğümler için RTA bile çok fazla difüzyona izin verir. Sahneye **milisaniye tavlama (MSA)** ve **lazer sivri tavlama (LSA)** girer. Bu tekniklerde yüksek güçlü bir lazer — genellikle 10,6 µm dalga boyunda bir CO₂ lazeri veya bir diyot lazer dizisi — plaka yüzeyini tarar. Yüzey yaklaşık **0,1 ila 3 milisaniye** boyunca **1200-1350°C**'ye ısınır — katkı maddelerini aktive etmek için yeterince uzun ama termal difüzyonun **1 nanometreden** az sınırlandığı kadar kısa. **Mattson Technology** (şimdi **Beijing E-Town Semiconductor**'un parçası), **Veeco** (Ultratech'i satın alan) ve **Applied Materials** (Varian satın alımıyla) gibi şirketlerin hepsi gelişmiş tavlama platformları geliştirmiştir.

Gereken sıcaklık hassasiyeti dikkat çekicidir. Tepe tavlama sıcaklığında 10°C'lik bir fark, katkı aktivasyonunu %20 değiştirebilir ve eklem derinliğini 1-2 nm kaydırabilir. Tüm transistör kanalının 5 nm uzunluğunda olduğu düğümlerde, bu çalışan çip ile hurda arasındaki farktır.

## Katkı maddesi hayvanat bahçesi: doğru atomu seçmek

Tüm katkı maddeleri eşit yaratılmamıştır. Seçim işe bağlıdır:

**Bor (B)** — P-tipi katkının iş atı. Atom kütlesi 11, en hafif yaygın katkı. Hafif kütle, borun belirli bir enerjide derin nüfuz etmesi anlamına gelir ve bu hem yararlıdır (derin kuyular için) hem de sorunlu (sığ eklemler için). Bor aynı zamanda en kötü TED'i sergiler. En ileri düğümlerde fablar, bor implante etmeden önce örgüyü yok etmek ve kanallığı bastırmak için yüzeyi germanyum veya silikon iyonlarıyla bombardıman eden **ön amorflaştırma implantları** kullanır.

**Fosfor (P)** — Geleneksel n-tipi katkı. Kütle 31, orta difüzivite. Derin kuyular, eşik gerilimi ayarlaması ve hafif katkılı boşaltım uzantıları için kullanılır. Nispeten ılımlı sıcaklıklarda iyi aktive olur.

**Arsenik (As)** — Ağır n-tipi katkı. Kütle 75 — fosforun iki katından fazla. Bu ağırlık bir avantajdır: arsenik yerinde kalır. Silikondaki difüzyon katsayısı aynı sıcaklıkta fosforunkinden yaklaşık **10 kat daha düşüktür**. Bu, arseniki NMOS transistörlerde sığ, yoğun katkılı kaynak/boşaltım bölgeleri için tercih edilen tür yapar. Dezavantajı: arsenik aynı zamanda yarı iletken üretiminde kullanılan en toksik maddelerden biridir ve arsin (AsH₃) kaynak gazı için sıkı güvenlik protokolleri gerektirir; bu gaz yaklaşık **10 ppm**'nin üzerindeki konsantrasyonlarda öldürücüdür.

**Antimon (Sb)** — Daha da ağır (kütle 122), son derece düşük difüzyonlu. Bazen bipolar ve BiCMOS süreçlerinde gömülü katmanlar için kullanılır, ama modern CMOS'ta daha az yaygındır.

**İndiyum (In)** — Kütle 115'te bora p-tipi bir alternatif. Ağır kütlesi hassas derinlik kontrolü sağladığı için bazı süreçlerde retrograd kanal katkılama için kullanılır, ancak düşük katı çözünürlüğü maksimum konsantrasyonunu sınırlar.

**Germanyum (Ge) ve Silikon (Si)** — Elektriksel anlamda katkı değildir, ancak **ön amorflaştırma** (yukarıda bahsedildiği gibi) ve **gerilmeli silikon** yapıları oluşturmak için rutin olarak implante edilir. Germanyum implantları ayrıca PMOS FinFET'lerde ve gate-all-around transistörlerde SiGe kaynak/boşaltım oluşumunda kullanılır.

## Kanallama: kristal karşılık verir

Silikon özellikleri olmayan bir blok değildir — kesin bir atomik düzene sahip bir kristaldir. İyon demeti büyük bir kristal ekseni (örneğin <110> veya <100> yönü) ile hizalandığında, gelen iyonlar atom sıraları arasındaki açık **kanallardan** ilerleyebilir ve rastgele durma teorisinin öngördüğünden çok daha derine nüfuz edebilir. Bu **kanallama**dır ve katkı profilini amaçlanan derinliğin %50 veya daha fazlası ötesine uzatabilir.

Etki dramatik ve son derece sinir bozucudur. Yaklaşık 50 nm yansıtılmış menzil hedefli 15 keV bor implantı, demet <110> ekseni ile hizalanmışsa 200 nm'yi aşan bir kanallama kuyruğu üretebilir. Eklem derinliği toleranslarının ±2 nm olduğu bir transistörde bu felakettir.

Fablar kanallamayla birden fazla yoldan mücadele eder:

- Tüm ana kanallardan aynı anda kaçınmak için plakayı demet ekseninden **7° eğme** (standart eğim) ve döndürme (tipik olarak 22° veya 45°).
- **Ön amorflaştırma implantları (PAI)**: Katkı implantından önce kristal yapıyı yok etmek için yüzeyi ağır iyonlarla (germanyum, silikon veya karbon) bombardıman etmek. Amorf silikonun kanalları yoktur.
- **Ekran oksitleri**: Gelen iyonların kristale girmeden önce yörüngelerini rastgeleleştirmek için yüzeyde ince bir oksit (2-5 nm) büyütmek.

Bu önlemlere rağmen bile kanallama modelleri, katkı derinlik profillerini ölçmenin altın standardı olan **ikincil iyon kütle spektrometresi (SIMS)** ölçümleri kullanılarak kalibre edilmelidir. SIMS, yüzeyi bir birincil iyon demeti (genellikle Cs⁺ veya O₂⁺) ile sıyırarak ve fırlatılan ikincil iyonları bir kütle spektrometresiyle analiz ederek çalışır. **10¹⁴ atom/cm³** kadar düşük konsantrasyonları — kabaca on milyar silikon atomundan bir katkı atomu — yaklaşık **1 nanometre** derinlik çözünürlüğüyle algılayabilir.

## Modern implant sorunu: ultra düşük enerji ve yüksek doz

Öncü düğümlerde (3 nm ve altı) iyon implantasyonuna yönelik talepler olağanüstü uç noktalara ulaştı. Kaynak/boşaltım uzantıları yalnızca **3-5 nm derinliğinde** olmalıdır. Bu, **1 keV**'in altında — bazen **200 eV** kadar düşük — implant enerjileri gerektirir. Bu enerjilerde, yüksek akımlı bir iyon demeti çıkarmak zorlaşır çünkü uzay yükü etkileri demetin dağılmasına neden olur. İyonlar birbirini iter ve yeterli enerji olmadan odaklama bir kabusa dönüşür.

**Axcelis Technologies** ve **Applied Materials**, **yavaşlatma modu** (demeti taşıma için daha yüksek enerjide hızlandır, sonra plakaya çarpmadan hemen önce yavaşlat), **moleküler iyon implantasyonu** (B⁺ yerine BF₂⁺ implante et — molekül boru toplam enerjinin 1/5'inde teslim eder çünkü kinetik enerjinin sadece 11/49'u bora gider) ve plakanın katkı içeren bir plazmaya daldırıldığı ve darbeli negatif biasın iyonları doğrudan yüzeye çektiği **plazma katkılama (PLAD)** dahil çözümler geliştirmiştir. PLAD, 100 eV'nin altında etkin enerjiler elde edebilir ve 3 nm'nin altında eklem derinlikleri üretir.

Yüksek doz tarafı da kendi zorluklarını sunar. **5 × 10¹⁵ iyon/cm²** gerektiren yoğun katkılı kaynak/boşaltım bölgeleri için, 20 miliamperlik yüksek akımlı bir demet bile her plakayı **40 saniye** veya daha uzun süre implante etmek anlamına gelir. Ayda 100.000'den fazla plaka işleyen modern fablarda implantor verimi kritiktir. Applied Materials (VIISta platformu) ve Axcelis'in (Purion platformu) yüksek akımlı implanterları standart üretim dozlarında **saatte 200'den fazla plaka** işleyebilir.

## İmplantasyonun ötesinde: yerinde katkılama ve epitaksi

İyon implantasyonu baskın yöntemdir, ama silikonu katkılamanın tek yolu değildir. Bazı yapılar için — özellikle en ileri düğümlerde — **yerinde katkılı epitaksi** vazgeçilmez hale gelmiştir.

Bu yaklaşımda, mevcut silikon yüzeyinin üstüne kimyasal buhar biriktirme (CVD) kullanılarak ince bir kristal katman büyütülür ve büyüme sırasında katkı gazı eklenir. Katkı atomları doğrudan yer değiştirme bölgelerinde büyüyen kristale dahil olur, böylece implant hasarı olmaz ve onları aktive etmek için tavlama gerekmez.

Modern **yükseltilmiş kaynak/boşaltım** yapıları böyle inşa edilir. PMOS FinFET'ler ve gate-all-around nanolevha transistörler için kaynak/boşaltım bölgeleri tipik olarak **2 × 10²¹ atom/cm³**'ü aşan konsantrasyonlarda yerinde bor katkılı **epitaksiyal silikon germanyum (SiGe)** ile büyütülür. NMOS için **3 × 10²¹ atom/cm³**'ün üzerinde fosfor konsantrasyonuna sahip epitaksiyal **silikon fosfür (Si:P)** kullanılır. Bu konsantrasyonlar denge katı çözünürlüğünü aşar — **yarı kararlı**dır ve yalnızca hızlı, düşük sıcaklıklı epitaksiyal büyümenin katkı maddelerini kümelenmeden veya çökelmeden önce yerinde dondurmasıyla elde edilebilir.

Bu iş için kullanılan araçlar — **Applied Materials (Centura ve Producer platformları)**, **ASM International (Epsilon ve Intrepid serileri)** ve **Lam Research** gibi şirketlerin **epitaksiyal reaktörleri** — fabtaki en zorlu araçlar arasındadır. Oda temizliği olağanüstü olmalıdır: **trilyon başına 10 parçacık** kadar oksijen kirlenmesi bile epitaksiyal büyümeyi bozabilir ve yüksek taşıyıcı mobiletesi için gereken kristal mükemmelliğini yok edebilir.

## Katkılama neden zorlaşıyor (ve tuhaflaşıyor)

Transistörler küçüldükçe katkılama varoluşsal bir zorlukla karşılaşır: **istatistiksel dalgalanma**. 2 nm düğümünde gate-all-around nanolevha bir transistör düşünün. Kanal, 5 nm kalınlığında, 25 nm genişliğinde ve 10 nm uzunluğunda bir silikon levha olabilir. Hacmi yaklaşık **1.250 küp nanometre** veya **1,25 × 10⁻¹⁸ cm³** kadardır. 10¹⁸ atom/cm³'lük bir kanal katkı konsantrasyonunda, o kanaldaki beklenen katkı atomu sayısı... **1,25**'tir.

Bir veya iki atom. Bir ile iki arasındaki fark yuvarlama hatası değil — eşik geriliminde **%80'lik bir değişimdir**. Rastgele katkı dalgalanması (RDF), ileri düğümlerde transistör değişkenliğinin baskın kaynaklarından biri haline gelmiştir. Bu yüzden endüstri, FinFET'lerde ve nanolevha FET'lerde **katkısız kanallara** geçmiş ve kanal katkılamasına güvenmek yerine eşik gerilimini ayarlamak için kapı yığınındaki iş fonksiyonu metallerini kullanmıştır.

Ama katkılama ortadan kalkmadı — sadece transistörün farklı bölgelerine taşındı. Kuyular, halolar, kaynak/boşaltım kontakları ve alt tabaka mühendisliğinin tümü hâlâ hassas kontrollü katkılama profilleri gerektiriyor. Araçlar gelişmeye devam ediyor, türler çeşitleniyor ve doğruluk talepleri sürekli artıyor.

---

*Yarın, akımı transistörden çıktıktan sonra takip edeceğiz — milyarlarca transistörü birbirine bağlayan **bakır ara bağlantı** ağında yolculuk. Katkılama her transistöre kişiliğini verdiyse, ara bağlantılar çipe sinir sistemini verir. Ve sadece 20 nanometre genişliğinde, 15 katman yüksekliğinde güvenilir bakır teller inşa etmek, tüm süreçteki en zor mühendislik zorluklarından biri çıkıyor.*

---

<div class="quiz-section">

**Bilginizi test etmeye hazır mısınız?**

</div>

{{#quiz quizzes/gun-10.toml}}
