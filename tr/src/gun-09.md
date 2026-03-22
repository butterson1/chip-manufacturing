# Gün 9: Aşındırma ve Biriktirme
## Atomik Ölçekte Oyma ve Kaplama

Dün ışık hassas kısmını yaptı. Bir EUV tarayıcısı, yüz milyonlarca dolar ve birkaç fizik mucizesi harcayarak bir deseni fotorezist üzerine yansıttı. Ama rezistteki desen sadece geçici bir şablondur — tıpkı bir inşaat alanındaki tebeşir çizgileri gibi. Asıl iş, çip üreticilerinin o soluk gizli görüntüyü somut maddeye dönüştürmesiyle başlar: silikondaki hendekler, hafniyum oksitle sarılmış kapılar, yalnızca birkaç on nanometre genişliğindeki kontakları dolduran tungsten tıkaçlar.

Burası çip üretiminin baskıdan çıkıp kontrollü vandalizme dönüştüğü noktadır. Bazı adımlar, 5 mikrometre derinliğinde ve 100 nanometre genişliğinde bir kuyu açabilecek kadar yönlü plazmayla atomları **kaldırır** — 50:1'lik bir en-boy oranı. Diğer adımlar ise film kalınlığının döngü başına birkaç onda bir angströmlük hassasiyetle kontrol edilebildiği bir disiplinle atomları **ekler**. Modern fab bu zıtlıklar arasında gidip gelir — oy, kapla, oy, kapla — yüzlerce kez.

Litografi kalem ise aşındırma ve biriktirme keski ve harçtır.

## Temel numara: desen aktarımı

Litografiden sonra plaka yüzeyi, kullanılan rezistin pozitif mi negatif mi olduğuna bağlı olarak açığa çıkan bölgeleri çözülmüş ya da yerinde bırakılmış fotorezistle kaplıdır. Ama fotorezist dayanıksızdır. Modern bir kimyasal amplifikasyonlu EUV rezisti yalnızca **20 ila 40 nanometre** kalınlığında olabilir. Tüm süreç akışına dayanamaz ve kesinlikle bir çipteki son yapı olarak hizmet edemez. Bu yüzden üreticiler onu, deseni daha dayanıklı bir malzemeye aktarmak için geçici bir maske olarak kullanır.

O "daha dayanıklı malzeme" silisyum dioksit, silisyum nitrür, polisilikon, kobalt, tungsten, bakır bariyer metali veya modern lojik düğümlerde kullanılan giderek daha egzotik malzemelerden biri olabilir. Öncü bir transistör yığını **silikon, silikon germanyum, hafniyum oksit, titanyum nitrür, tungsten, rutenyum, kobalt, düşük-k dielektrikler ve çeşitli sert maskeler** içerebilir. Her malzeme kimyaya ve plazmaya farklı tepki verir. İşte bu yüzden süreç entegrasyon mühendisleri üç kelimeye takıntılıdır: **seçicilik, anizotropi ve tekdüzelik**.

- **Seçicilik**, bir malzemeyi diğerinden çok daha hızlı aşındırmak demektir. Altındaki silisyum dioksite neredeyse dokunmadan silisyum nitrürü aşındırmak istiyorsanız yüksek seçiciliğe ihtiyacınız var.
- **Anizotropi**, yanlara değil düz aşağı doğru aşındırma demektir. Bu olmadan özellikler genişler, çizgiler çöker ve transistör boyutları spesifikasyon dışına çıkar.
- **Tekdüzelik**, **300 mm**'lik bir plakanın merkezinde ve kenarında aynı şeyi yapmak, bir sonraki plakada tekrarlamak ve odanın binlerce plazma darbesi gördüğü bir hafta sonra yine tekrarlamak demektir.

Bunlar akademik incelikler değildir. Bir SRAM bit hücresi çizgisi amaçlanandan 2 nm daha darsa, daha yavaş anahtarlayabilir. Bir kontak deliği hedeften 3 nm daha derin aşınırsa, yanlış katmana nüfuz edebilir. Modern düğümlerde süreç pencereleri tek haneli nanometreler ve saniyenin kesirleriyle ölçülür.

## Aşındırma: vakum odasında kontrollü yıldırım

"Aşındırma" kelimesi, asit kullanan bir baskıcı gibi kulağa eski moda gelir. Yarı iletken fablarında aşındırma genellikle **plazma aşındırma** veya **reaktif iyon aşındırma (RIE)** anlamına gelir. Kabaca bir çamaşır makinesi tamburu boyutunda, ancak alüminyum, seramik, kuvars ve titizlikle tasarlanmış elektrotlardan yapılmış bir vakum odası hayal edin. İçeride mühendisler, genellikle **5 ila 100 millitorr** civarında basınçlarda — atmosfer basıncından yüzlerce ila binlerce kat düşük — **CF₄, CHF₃, SF₆, NF₃, Cl₂, BCl₃, HBr, O₂, Ar ve C₄F₈** gibi gazlar besler.

Ardından radyo frekansı gücüyle, genellikle **13,56 MHz** ile bir plazma ateşlenir; modern yüksek yoğunluklu sistemler ayrıca **2 MHz** aralığında ayrı RF kaynakları veya hatta mikrodalga uyarımı kullanır. Oda mor veya mavi renkte parıldar. Elektronlar, iyonlardan çok daha hafif olduğu için salınımlı alandan kolayca enerji kazanır ve **1 ila 10 elektron-volt** — termal dile çevrilirse yaklaşık **11.600 ila 116.000 kelvin** — etkin sıcaklıklara ulaşabilir. Yine de toplu gaz oda sıcaklığına yakın kalabilir.

İşte ilk harika sezgiye aykırı gerçek: **Plazmanın elektronları Güneş'in yüzeyinden "daha sıcak" olabilirken plakanın kendisi 20°C ila 80°C civarında durur.** Yarı iletken üretimi tam da bu dengesizliğe bağlıdır. Enerjik elektronlar radikaller ve iyonlar oluşturur; plakanın erimemesi gerekir.

Bu alandaki ekipman liderleri **Lam Research**, **Applied Materials**, **Tokyo Electron (TEL)** ve **Hitachi High-Tech** gibi şirketlerdir. Özellikle Lam, aşındırmanın lojik ve 3D NAND'da en zor problemlerden birine dönüşmesiyle dev bir şirket haline geldi. Kiyo ve Sense.i platformları, son nokta sensörleri, elektrostatik tutucular, arka taraf helyum soğutması ve bir yan duvarın dikey mi yoksa eğimli mi olacağına karar verebilecek kadar hassas kaynak/bias güç kontrolüne sahip, yüksek derecede ayarlanmış plazma ekosistemleridir.

### Neden plazma?

Tamamen ıslak kimyasal aşındırma — plakaları asit veya baza batırma — önceki dönemlerde yaygındı ve hâlâ bazı temizleme ve izotropik adımlar için kullanılır. Ama ıslak aşındırma her yönde etkiler. Plazma, mühendislerin **kimya** ile **yönlü iyon bombardımanını** birleştirmesine olanak tanır.

Flor kimyasıyla silikon aşındırmayı ele alalım. Flor radikalleri silikonla tepkimeye girerek yüzeyden gaz olarak ayrılan uçucu **SiF₄** oluşturur. Ama radikaller tek başına biraz izotropik aşındırır. İyon bombardımanı ekleyin ve plakaya doğru hızlandırılan iyonlar bir hendeğin tabanını tercihli olarak aktive eder. Aslında kimya tepkimeye istekliliği sağlar; iyon yönlülüğü şekli verir.

Oksit aşındırma için **C₄F₈/CO/Ar/O₂** gibi florokarbon plazmaları yan duvarlara polimer biriktirebilirken iyonlar tabanı açık tutar. İletken aşındırma için — örneğin tungsten, titanyum nitrür veya polisilikon — klor veya brom bazlı kimyalar yaygındır çünkü tepkime ürünleri bu malzemeler için daha iyi uçuculuğa veya yönetilebilir yüzey davranışına sahiptir.

Bu yüzden bir aşındırma tarifi tek bir malzemeden çok bir kokteyle benzer. Gaz oranları, basınç, RF biası, plaka sıcaklığı, tutucu malzeme, oda duvarı durumu ve hatta plaka üzerindeki desen yoğunluğunun tamamı önemlidir. Farklı yerel desen yoğunluğuna sahip iki plaka farklı hızlarda aşınabilir çünkü radikaller farklı şekilde tüketilir — **yükleme** adı verilen bir fenomen.

## Derin hendekler ve atomik vahşet

Aşırı aşındırmanın poster çocuğu muhtemelen **DRIE — derin reaktif iyon aşındırma** — MEMS ve bazı güç cihazlarında yoğun olarak kullanılır. 1990'larda Robert Bosch GmbH'de geliştirilen klasik **Bosch prosesi**, **SF₆** kullanan bir aşındırma adımı ile **C₄F₈** kullanan bir pasivleme adımı arasında gidip gelir. Pasivleme her şeyi bir floropolimerle kaplar; bir sonraki iyon bombardımanı tercihen tabanı temizler; döngü tekrarlanarak hendeği aşağıya doğru ilerletir. **100 mikrometre** derinliğinde, neredeyse dikey yan duvarlı silikon hendekleri böyle yapılır.

Lojik çipler genellikle böyle karikatürleştirilmiş derin hendeklere ihtiyaç duymaz, ama aynı prensip — dönüşümlü saldırı ve koruma — her yerde karşımıza çıkar. FinFET üretiminde aşındırma, çizgi kenarı pürüzlülüğünü korurken yalnızca birkaç on nanometre genişliğinde kanatçıklar tanımlamalıdır. **Gate-All-Around nanolevha** cihazlarda aşındırma, silikon kanallarını sağlam bırakırken feda edilen **silikon-germanyum** katmanlarını seçici olarak kaldırmalı ve askıda levhalar oluşturmalıdır. Kimyanın farkı bilmesi gerekir.

Bu seçicilik, transistör tasarımındaki malzeme seçimlerinin asla tamamen elektriksel olmayışının nedenlerinden biridir. Daha sonra yeterli seçicilikle temizce aşındırılamayacak bir kanal veya feda malzemesi seçerseniz, güzel cihaz konseptiniz süreç entegrasyonunda ölür.

### Yan duvarlar neden bu kadar önemli

Bir hendek sadece bir delik değildir; elektriksel bir gelecektir. Pürüzlü yan duvarlar taşıyıcıları saçar. Kamburlaşmış profiller etkin çizgi genişliğini değiştirir. Tabana yakın "ayak oluşumu" kontak direncini mahvedebilir. "Mikro hendekleme" — hendek köşelerinde daha hızlı aşınma — yerel zayıf noktalar oluşturabilir. Profil kontrolü kadere dönüşür.

Şaşırtıcı olan şudur ki bu şekiller üretimde insan mikroskop operatörüyle her bir hendeğe bakılarak değil, bir **metroloji** ve istatistiksel kontrol ağıyla izlenir. Fablar, **KLA** ve **Hitachi** gibi şirketlerin **CD-SEM** araçlarına, optik saçılma ölçümüne, elipsometriye, son nokta optik emisyon spektroskopisine ve zaman zaman TEM ile yapılan yıkıcı kesitlere güvenir. Mühendisler daha sonra tarifleri, sürecin kaprisli bir plazma fırtınası yerine istikrarlı bir endüstriyel operasyon gibi davranması için ayarlar.

## Biriktirme: atom atom film oluşturma

Aşındırma çıkarma ise biriktirme toplamadır. Çip üreticilerinin her biri belirli kalınlık, yoğunluk, stokiyometri, gerilim, özdirenç ve konformaliteye sahip film üzerine film büyütmesi veya biriktirmesi gerekir. **Konformalite** kelimesi önemlidir çünkü bazı yapılar artık düz değildir. Modern cihazlar, bir inşaat mühendisini tedirgin edecek en-boy oranlarına sahip dar delikler, yan duvarlar, gömülü kanallar ve 3D bellek yığınları içerir.

Birkaç ana biriktirme ailesi vardır:

### Fiziksel Buhar Biriktirme (PVD)

PVD, yarı iletken üretiminin sprey boyamaya en yakın şeyidir, ancak "sprey" vakumda bir hedeften fırlatılan atomlardan oluşur. **Sıçratma** yönteminde argon iyonları bir metal hedefe — örneğin titanyum, tantal, kobalt veya bakır tohum — çarparak atomları fırlatır; bu atomlar oda boyunca yol alarak plaka üzerine iner.

PVD hızlı ve nispeten basittir, ancak doğrusal görüş hattına bağlıdır. Bu da onu derin, dar özellikleri kaplamak için daha az ideal kılar. Birçok metal film ve bariyer katmanı için, özellikle yüksek verimin önemli olduğu yerlerde kritik olmaya devam eder. Applied Materials ve TEL burada büyük segmentlere uzun süredir hakim olmuştur.

### Kimyasal Buhar Biriktirme (CVD)

CVD, öncü gazların plaka üzerinden akıtılarak yüzeyde ayrışması veya tepkimeye girmesi ve geride katı bir film bırakmasıyla çalışır. PVD'nin aksine, reaktif türler girintilere yayılabildiği için karmaşık şekilleri daha tekdüze biçimde kaplayabilir.

Çeşitleri vardır:

- **LPCVD**, düşük basınçta, genellikle **550°C ila 800°C**'de, tarihsel olarak yüksek kaliteli polisilikon ve silisyum nitrür için kullanılmıştır.
- **PECVD**, plazmanın kimyayı daha düşük sıcaklıklarda, genellikle **250°C ila 400°C**'de yürütmesine yardımcı olduğu, termal bütçenin sınırlı olduğu durumlarda vazgeçilmez olan yöntemdir.
- **SACVD, HDP-CVD, alt-atmosferik CVD** ve farklı filmler için birçok özel varyant.

"Termal bütçe" noktası çok önemlidir. Sürecin başlarındaki bir ön uç plaka **900°C+** tavlamalara dayanabilir. Hassas eklemler ve metal yığınları olan kısmen bitmiş bir lojik plaka dayanamaz. Her yüksek sıcaklık adımı katkı difüzyonu, film gerilimi değişiklikleri veya önceki katmanlara hasar riski taşır. Bu yüzden ileri üretimin büyük bölümü düşük sıcaklıklı süreçlere doğru bir yarışa dönüştü.

### Atomik Katman Biriktirme (ALD)

ALD, biriktirme biliminin mücevheridir. 1970'lerde Fin fizikçi **Tuomo Suntola** tarafından icat edilen ALD, öncüleri birer birer besler böylece her yarı tepkime **kendi kendini sınırlar**. Bir öncü mevcut yüzey bölgelerine kimyasal olarak adsorbe olur ve durur. Oda temizlenir. İkinci bir öncü o tek tabaka ile tepkimeye girer ve durur. Tekrar temizle. Tekrarla.

ALD, plaka üzerine film dökmek yerine, yüzeyden her seferinde bir moleküler el sıkışma ile kibarca izin ister.

Büyüme hızları yavaştır — birçok oksit için genellikle **döngü başına 0,8 ila 1,2 angström** civarında, yani **100 döngü** yalnızca **8 ila 12 nanometre** biriktirebilir. Ama karşılığı, acımasızca dar özelliklerin içinde bile nefes kesen kontrol ve konformalitedir. Bu, Intel'in **45 nm** düğümünde 2007'de silisyum dioksit kapı dielektriğini **hafniyum bazlı** filmlerle değiştirerek **yüksek-k metal kapı** teknolojisini tanıtmasıyla vazgeçilmez hale geldi. Yalnızca birkaç nanometre kalınlığındaki bir kapı dielektriği her yerde tekdüze olmalıdır. ALD tam da bu iş için yapılmıştı.

Bugün ALD, **HfO₂, Al₂O₃, TiN, TaN, tungsten çekirdeklenme katmanları, kobalt astarlar** ve birçok başka film için kullanılmaktadır. **ASM International** bu alanın öncülerinden biridir; Applied Materials, TEL, Lam ve diğerlerinin de büyük ALD portföyleri vardır.

İşte ikinci sezgiye aykırı gerçek: **Bazen üretimi daha hassas yapmanın en iyi yolu onu yavaşlatmaktır.** ALD hızla değil, aşırı tepki vermeyi reddederek kazanır. Nanometre rejiminde ölçülülük, farklı bir verim türüdür — verim verimidir.

## Boşluk doldurma, kovuklar ve geometrinin tiranlığı

Yapılar üç boyutlu hale geldikçe biriktirme sadece "üstüne film koy" olmaktan çıktı. "Yan duvarları kapla, boşluğu doldur, açıklığı tıkama, dikiş hapsetme, anahtar deliği oluşturma ve termal bütçeyi aşma" haline geldi.

Kontak delikleri veya silikon içinden geçen viaları düşünün. Bir film açıklığa yakın yerde çok hızlı büyürse, kovuk dolmadan önce üstü kapanabilir ve gömülü bir boşluk bırakabilir. Bu boşluk direnci artırabilir, kirlenme hapedebilir veya yıllar sonra sahada bir elektromigrasyon zayıf noktası oluşturabilir.

İşte bu yüzden çip üreticileri teknikleri birleştirir: belki mükemmel konformalite için ince bir ALD çekirdeklenme katmanı, ardından dolgu için CVD tungsten, sonra fazlalığı kaldırmak için CMP. Modern fabrikasyon, birbirini tamamlayan kusursuzlukların bayrak yarışıdır.

**3D NAND**'da biriktirme ve aşındırma neredeyse absürt hale gelir. Samsung, SK hynix, Micron ve Kioxia/Western Digital'in cihazları **200'den fazla** dönüşümlü film katmanı yığar. Bunları inşa etmek, oksit/nitrür yığınlarının tekrarlanan biriktirilmesini ve süreç mühendislerinin "yüksek en-boy oranı"ndan sanki ayrı bir akışkanlar dinamiği dalıymış gibi bahsettiği kadar agresif en-boy oranlarıyla tüm kulenin içinden kanallar aşındırmayı içerir. Zorluk sadece bir dikey delik yapmak değildir. Üretim hızında, ticari olarak kabul edilebilir hata oranıyla milyarlarcasını aynı şekilde yapmaktır.

## Kirlenmenin tiranlığı

Aşındırma ve biriktirme odaları statik değildir. Duvarları kimyayı emer, film biriktirir ve kullanımla değişir. Bütün gün florokarbon oksit aşındırma işlemi yapan bir oda, taze temizlenmiş bir odadan kimyasal olarak farklıdır. Bu yüzden fablar **koşullandırma** hakkında konuşur — kritik plakalar işlenmeden önce istikrarlı bir çalışma koşuluna ulaşmak için oda duvarlarını kasıtlı olarak kaplamak.

Bu sistemler paslanmaz çelik tencerelerden çok dökme demir tavalara benzer. Oda geçmişi önemlidir.

Partiküller sürekli bir düşmandır. Oda birikintilerinden kopan pullar bir plakaya konabilir ve düzinelerce kalıbı öldürebilir. **Milyarda bir** seviyesindeki metalik kirlenme azınlık taşıyıcı ömrünü mahvedebilir veya cihaz davranışını kaydırabilir. Yanlış biriktirme modülündeki oksijen veya nem izleri, atomik olarak keskin olması gereken bir arayüzü zehirleyebilir.

Bu yüzden fab temizlikle savaşır. Oda temizlikleri. Plaka temizlikleri. **NF₃** ile uzaktan plazma temizlikleri. **SC-1, SC-2, seyreltik HF, ozonlu su** kullanan ıslak temizlikler. Her süreç adımı başka bir süreç adımının ihtiyacını doğurur.

## Bu aşama neden Moore Yasası'nın gerçek olup olmadığına karar verir

İnsanlar yarı iletken ilerlemesini hayal ettiğinde, ASML'nin makineleri teatral ve pahalı olduğu için genellikle litografiyi düşünür. Ama birçok mühendis için ileri düğümlerin gerçek zorluğu burada yaşanır. Aşındırma dikey duvarları pürüzlü mağaralara dönüştürürse veya biriktirme bir arayüzü beklenenden bir angström daha pürüzlü bırakırsa, güzel bir EUV deseni işe yaramaz.

Burası aynı zamanda ekonomik gücün yer değiştirdiği noktadır. Son yirmi yılda **Lam Research, Applied Materials ve Tokyo Electron**, en gösterişli araçları yaptıkları için değil, her küçülmenin titizlikle kontrol edilen plazma ve film mühendisliğine bağımlılığı artırması nedeniyle merkezi konuma geldi. Öncü kenarda, desenleme hikayenin sadece yarısıdır; **desen aktarımı**, atomlara doğrudan dokunan yarıdır.

Ve tüm bunların ardındaki neden tek bir cümleye sığacak kadar basittir: **Transistörler ancak madde, tasarımın varsaydığı yere tam olarak yerleşirse çalışır.** Aşındırma, maddenin nereden kaldırılacağına karar verir. Biriktirme, maddenin nereye ekleneceğine karar verir. Birlikte bir tasarım veritabanını fiziksel topolojiye dönüştürürler.

Yarın fabdaki en derin malzeme ikna eylemlerinden birine geçiyoruz: **katkılama ve iyon implantasyonu**. Şimdiye kadar çoğunlukla malzemeyi şekillendirdik. Sırada, elektriksel kişiliğini değiştirmek var — normalde akıma direnen bir kristalin, tam olarak doğru yerlerde akım taşımaya istekli hale gelmesi için bor, fosfor ve arsenik iyonlarını onlarca ila yüzlerce kiloelektron-volt hızında silikona ateşlemek.

---

<div style="text-align: center; margin: 2em 0;">

**Bilginizi test etmeye hazır mısınız?**

</div>

{{#quiz quizzes/gun-09.toml}}
