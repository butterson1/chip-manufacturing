# Gün 12: Kimyasal Mekanik Düzleştirme
## Atomları Dümdüz Parlatmak

Dün bakır otoyol sistemini izledik — transistörlerin üzerinde 13'ten fazla katmanda yığılmış 130 kilometre kablolama, IBM'in hendek oyup elektrokaplama bakırla doldurma numarasıyla inşa edilmiş. Ama kritik bir adımı atladık. Bakırı o hendeklere elektrokapladıktan sonra plaka yüzeyi Kayalık Dağlar'ın topografik haritasına benzer. Her yerde bakır var — istediğiniz yerde hendeklerin üstünde ve kesinlikle istemediğiniz yerde yalıtkanın üstünde. O fazla bakır her teli komşusuna kısa devre eder. Gitmesi gerekir.

Ve *mükemmel* bir şekilde gitmesi gerekir. Sadece "oldukça düz" değil — 300 mm'lik bir plaka boyunca **tek bir atom katmanı** dahilinde düz. Bu, bir futbol sahasını bir kredi kartı kalınlığında tesviye etmek gibidir, ancak futbol sahası çevredeki araziden farklı bir malzemeyle dolu mikroskobik hendeklerle kaplıdır ve hiçbirini çizemezsiniz.

Bu **Kimyasal Mekanik Düzleştirme** (CMP) işidir — yarı iletken endüstrisinin en beklenmedik süreci — ortaçağdan kalma görünen aşındırıcı parlatmayı, hassas mühendislikle tasarlanmış kimyayla birleştirerek dünyadaki hiçbir başka üretim tekniğinin ulaşamadığı düzlüğe erişen bir teknoloji. Aynı zamanda paradoks olarak, insanların inşa ettiği en temiz fabrikadaki *en kirli* adımdır.

---

## Düzlük neden her şeydir

CMP'nin neden önemli olduğunu anlamak için katmanları üst üste koyduğunuzda ne olduğunu düşünün. Fotolitografi — devre desenlerini yazdıran süreç — plaka yüzeyinin tarayıcı optiğinin **alan derinliği** dahilinde düz olmasını gerektirir. 3 nm düğümünde EUV litografisi için bu alan derinliği yaklaşık **±30 nanometre**dir. Plaka yüzeyinin herhangi bir kısmı bundan daha yüksek veya daha düşükse, desen bulanıklaşır, özellikler birleşir veya kaybolur ve çip ölür.

Şimdi katmanları inşa ederken doğal olarak ne olduğunu düşünün. Her kablolama katmanı topografya yaratır — metal çizgilerin üstünde yüksek bölgeler, yalıtkanın üstünde vadiler. Üstüne bir sonraki yalıtkan katmanı biriktirdiğinizde, o topografyaya uyum sağlar, düz doldurmaz. Birkaç katman yığılayın ve yüzey dalgalanmaları bileşir. Üçüncü veya dördüncü metal katmanda, düzleştirme olmadan yüzey değişimi **mikrometrelerle** ölçülür — alan derinliği bütçesinin yüzlerce katı. Sanki bir gökdelenin her katı alttaki katın eğimlerini ve tümseklerini miras alıp büyütüyormuş gibi.

CMP tanıtılmadan önce fablar bunu **SOG** (döndürmeli cam) ve **yeniden akıtma** gibi tekniklerle yönetmeye çalıştı — yumuşak bir cam katmanı biriktirip vadilere akana kadar ısıtmak. Bu yaklaşımlar topografyayı azalttı ama asla ortadan kaldırmadı. Alan derinliğinin yüzlerce nanometreyle ölçüldüğü 800 nm ve 500 nm süreçleri için yeterliydi. Ama 1990'ların ortalarında endüstri 250 nm ve altına doğru ilerlerken, gerçek düzleştirmeden başka hiçbir şey işe yaramayacaktı.

CMP çözümdü. Ve neredeyse olmuyordu.

---

## Temiz odadaki sapkınlık

İşin aslı şu: yarı iletken üretiminde **her şey** kirlenme kontrolüyle ilgilidir. Fablar HEPA filtrasyonu, ultra saf su sistemleri ve trilyon başına parçacıkla ölçülen kimyasal saflık standartlarına milyarlar harcar. Mühendisler tek bir deri parçacığının bir çipi öldürmemesi için tam vücut tulumları giyer. Modern bir temiz odadaki hava metre küp başına 10'dan az parçacık içerir — bir ameliyathaneden yaklaşık 10.000 kat daha temiz.

Bu saflık tapınağına CMP bir **bulamaç** tanıtır — tipik olarak kolloidal silika (SiO₂) veya serya (CeO₂) olan milyarlarca aşındırıcı nanoparçacığın, parlatılan malzemeye bağlı olarak pH 2 ila 12 arasında değişen kimyasal olarak aktif bir çözeltide asılı kaldığı sıvı bir süspansiyon. Plaka yüzü aşağı döndürülen bir polimer ped üzerine bastırılırken bu bulamaç aralarına dökülür. Temelde *taşlama*dır — insanların yüzyıllardır mercek ve değerli taş parlatmak için kullandığı aynı prensip.

IBM araştırmacısı **Bill Davari** ve ekibi 1980'lerin sonlarında çip üretimi için CMP'yi ilk önerdiğinde, endüstrinin tepkisi dehşet ile alay arasında bir yerdeydi. "Dünyadaki en pahalı, kirliliğe en duyarlı alt tabakayı alıp *aşındırıcı parçacıklarla dolu ıslak bir ped üzerinde ovmak* mı istiyorsunuz?" Fikir, yarı iletken üretiminin temsil ettiği her şeyin antitezi gibi görünüyordu. Journal of the Electrochemical Society en erken CMP makalelerinden bazılarını 1990'ların başında yayımladı ve hakem değerlendirmesinde bile şüphecilik hissediliyordu.

Ama fizik kaçınılmazdı. Başka hiçbir teknik küresel düzleştirme — tüm 300 mm'lik plaka yüzeyini sadece yerel olarak pürüzsüz değil, bütünüyle düz yapma — başaramazdı. Ve ortaya çıktı ki CMP sadece litografi odağı için gerekli değildi. Bakır şam işleminin kendisini **mümkün kılan teknoloji**ydi.

---

## CMP gerçekte nasıl çalışır

Bir CMP aracı — endüstrinin önde gelen tedarikçisi, Reflexion sistemleriyle pazara hakim **Applied Materials** ve ana rakibi **Ebara** — fabdaki diğer ekipmanlardan tamamen farklı görünür. Çekirdeği yanıltıcı biçimde basittir: poliüretan bir pedle kaplı dönen bir tabla (genellikle 500-800 mm çapında büyük dairesel bir masa) ve plakayı yüzü aşağı pede bastıran bir taşıyıcı kafa.

Plaka, hassas kontrollü bir **basma kuvveti** ile — tipik olarak 1 ila 7 **psi** (inç kare başına pound), yaklaşık 7 ila 50 kPa — dönen pede bastırılır. Hem ped hem de taşıyıcı kafa döner, genellikle aynı yönde ama farklı hızlarda — tabla 60-120 RPM'de dönerken taşıyıcı 40-100 RPM'de süpürür. Taşıyıcı ayrıca tekdüze parlatma sağlamak için ped yarıçapı boyunca ileri geri salınır. Bu arada bulamaç, dakikada 100 ila 300 mL hızında ped yüzeyine dökülür.

Sihir — ve bu sürecin çalışmasının nedeni — **kimya ile mekaniğin sinerjisi**dir. İkisi tek başına yeterli olmaz.

**Tek başına kimya** (yüzeyi reaktif kimyasallarla çözmek) izotropik olur — yüksek ve alçak noktaları eşit olarak aşındırır, düzlüğü iyileştirmeden malzeme kaldırır. Ayrıca yüzlerce adım harcayarak oluşturduğunuz desenlere zarar vererek hendeklere saldırırdı.

**Tek başına mekanik** (saf aşındırıcı parlatma) yüzeyi felaket düzeyinde çizer. Bakır yumuşaktır — Mohs sertliği 3, silika aşındırıcı parçacıkların 7'sine kıyasla. Kimyasal aracılık olmadan yumuşak bir yüzeyde sert parçacıklar gezdirmek, ara bağlantı hatlarını kesebilecek derin oluklar olan **mikro çizikler** üretir.

Ama birlikte zarif bir şey olur. Kimyasal bileşen yüzeyi değiştirerek ince bir **pasivleme katmanı** — bakır CMP durumunda tipik olarak sadece 1-3 nm kalınlığında bir bakır oksit — oluşturur. Bu oksit, alttaki bakırdan daha sert ve daha kırılgan, ama yine de toplu yalıtkandan çok daha yumuşaktır. Bulamaçtaki aşındırıcı parçacıklar bu oksit filmi yüzeyin **yüksek noktalarından** (ped temas basıncının en yüksek olduğu yer) mekanik olarak kaldırır ve hemen yeniden oksitlenen taze bakırı açığa çıkarır. **Alçak noktalarda** (girintiler ve hendekler) ped temas etmez, bu yüzden pasivleme katmanı yüzeyi kaldırmadan korur.

Sonuç: malzeme yüksek noktalardan tercihli olarak kaldırılır. Yüzey düzleşir. Güzel bir geri besleme döngüsüdür — kimya feda edici bir katman yaratır, mekanik onu seçici olarak kaldırır, kimya anında yeniler.

---

## Bulamaç: bir şişede 4 milyar dolarlık bir endüstri

CMP beklenmedik bir süreçse, bulamaç onun beklenmedik kalbidir. Modern bir CMP bulamacı, endüstriyel kullanımdaki en hassas mühendislikle tasarlanmış sıvılardan biridir ve onu üreten şirketler — **Cabot Microelectronics** (şimdi CMC Materials, 2022'de Entegris tarafından 6,5 milyar dolara satın alındı), **Fujimi**, **DuPont** (eski adıyla Dow Electronic Materials) ve **AGC** — formülasyonlarını Coca-Cola'nın tarifini koruduğu kadar titizlikle korur.

Bir bakır CMP bulamacı tipik olarak şunları içerir:

- **Aşındırıcı parçacıklar**: Kolloidal silika veya alümina, 20-100 nm çapında, ağırlıkça %1-5 konsantrasyonunda. Parçacık boyut dağılımı *son derece* dar olmalıdır — birkaç büyük boy parçacık bile (200 nm seviyesinde) felaket düzeyinde çizilmeye neden olabilir. "Büyük parçacık sayısı" spesifikasyonu genellikle milyarlarca nanoparçacık içeren bir bulamaçta mililitre başına 100'den az >0,5 μm parçacıktır.
- **Oksitleyici**: Hidrojen peroksit (H₂O₂), %0,5-5 oranında, bakır oksit pasivleme katmanını oluşturur.
- **Kompleks yapıcı ajan**: Glisin veya sitrik asit gibi organik asitler, bakır oksidi çözerek kaldırma hızını kontrol eder. Bu olmadan oksit katmanı birikir ve parlatma durur.
- **Korozyon inhibitörü**: Milyonda bir seviyelerde **BTA** (benzotriazol), girintilerdeki bakır üzerinde koruyucu bir film oluşturarak malzeme kaldırılmasını istemediğiniz yerlerde kimyasal saldırıyı önler.
- **Yüzey aktif maddeler ve pH tamponları**: Bulamacın kararlı kalmasını (parçacıkların topaklanmamasını) ve kimyanın çalışma penceresinde kalmasını sağlar.

Denge ustura gibidir. Çok fazla oksitleyici ve bakır hendeklerde aşınır (**çanaklaşma** — geniş özelliklerdeki bakır çevredeki yalıtkanın altına çöker). Çok fazla BTA ve kaldırma hızı sıfıra düşer. Çok az aşındırıcı ve süreç çok yavaş; çok fazla ve çizilme fırlar. Her formülasyon belirli bir malzeme, düğüm ve entegrasyon şeması için ayarlanır.

Küresel CMP bulamaç pazarı 2024'te yaklaşık **2,2 milyar dolar** değerindeydi ve ileri düğümlerde plaka başına artan CMP adım sayısının etkisiyle 2030'a kadar **4 milyar doları** aşması öngörülüyor.

---

## Ped: poliüretandan fazlası

Parlatma pedi CMP'nin isimsiz kahramanıdır. **Dow** (şimdi DuPont), on yıllardır **IC1000** ve **IC1010** pedleriyle — yaklaşık 2 mm kalınlığında sert, mikro gözenekli poliüretan diskler — bu pazara hakim olmuştur. Ped yüzeyi pürüzsüz değildir; bulamaç taşıyan, basıncı dağıtan ve artıkları uzaklaştıran mikro gözenekler ve oluklar ile kasıtlı olarak dokulu yapılmıştır.

Ama bir sorun var: parlattıkça ped yüzeyi bozulur. Gözenekler parlatma artıklarıyla (kullanılmış bulamaç, kaldırılmış malzeme) dolur ve yüzey **cilalanmış** hale gelir — pürüzsüz ve sert, bulamaç tutma ve tutarlı temas yapma yeteneğini kaybeder. Birkaç plaka içinde kaldırma hızı %50 veya daha fazla düşebilir.

Çözüm **yerinde ped koşullandırma**dır: parlatma sırasında ped yüzeyini sürekli süpüren, pürüzlendiren ve gözenekleri açan elmas kaplı bir disk (tipik olarak paslanmaz çelik disk üzerine elektrokaplama veya lehimlenmiş elmas taneleri). Evet — plakayı parlatırken *aynı anda* pedi de taşlıyorsunuz. Koşullandırma diski, parlatılan her plaka başına yaklaşık **1-3 μm** ped malzemesi kaldırır. 2 mm kalınlığındaki bir ped değiştirilmeden önce yaklaşık 500-1000 plaka dayanır.

Koşullandırmayı doğru yapmak kritiktir. Çok agresif olursa ped hızla aşınır ve plakaları çizen artıklar saçar. Çok nazik olursa ped cilalanır ve kaldırma hızı kayar. Elmas diskin kendisi karakterize edilmelidir — her elmas tanesinin boyutu, yoğunluğu ve çıkıntı yüksekliği önemlidir.

---

## Bakır CMP: üç adımlı dans

Şam ara bağlantıları için bakır CMP yaptığınızda, asla tek bir parlatma değildir. Endüstri standardı, her biri farklı bulamaç ve ped kombinasyonuna sahip **üç adımlı (veya en az iki adımlı) bir süreç**tir:

**Adım 1 — Toplu bakır kaldırma.** Amaç hızdır: elektrokaplamayla biriken kalın bakır fazlasını (tipik olarak hendek seviyesinin 500-1000 nm üstünde) mümkün olduğunca hızlı kaldırın. Bulamaç kimyasal olarak agresiftir, yüksek oksitleyici konsantrasyonu ve nispeten büyük aşındırıcı parçacıklarla. Kaldırma hızları bakırda **500-800 nm/dk**'ya ulaşır. Ama bu adımın seçiciliği düşüktür — bariyer katmanında temiz bir şekilde duramaz.

**Adım 2 — Bariyer kaldırma.** Toplu bakır gittikten sonra **TaN/Ta bariyer katmanına** (Gün 11'de tartışılan) ve alttaki dielektriğe ulaşırsınız. Bariyer bakırdan çok daha serttir (tantal nitrürün Mohs sertliği 9'a yakındır) ve farklı bulamaç kimyası gerektirir — genellikle alümina bazlı aşındırıcılar ve asidik pH. Bu adım, bakır çanaklaşmasını ve **oksit erozyonu**nu (yoğun desen alanlarında yalıtkan yüksekliği kaybı) en aza indirirken bariyer bölgesini alan alanlarından kaldırmalıdır.

**Adım 3 — Cilalama.** Yumuşak bir ped ve seyreltik bulamaçla artık çizikleri ve parçacıkları önemli malzeme kaldırma olmadan temizleyen nazik bir son parlatma. Kaldırma hızı: sadece 5-20 nm/dk.

Her adım aynı araçtaki farklı bir tabla kullanır — Applied Materials'ın modern CMP sistemlerinde 3-4 tabla artı bir temizleme istasyonu bulunur, böylece plaka makineden çıkmadan bir pedden diğerine geçer. Eksiksiz bir bakır CMP dizisi **plaka başına yaklaşık 90-120 saniye** sürer ve araç kabaca **saatte 30-40 plaka** işler.

---

## Son nokta tespiti: ne zaman duracağını bilmek

CMP'deki en zor sorunlardan biri tam olarak doğru miktarda malzeme kaldırıp kaldırmadığınızı bilmektir. Çok az kaldırın ve komşu hatlar arasında bakır kısa devreleri kalır. Çok fazla kaldırın ve telleri inceltirsiniz (direnci artırarak) veya sonraki katmanlara yayılan çanaklaşma/erozyon yaratırsınız.

Endüstri birkaç **son nokta tespit** yöntemi kullanır:

- **Motor akımı/sürtünme izleme.** Farklı malzemelerin pede karşı farklı sürtünme katsayıları vardır. Bakır fazlasını aşındırıp bariyer katmanına ulaştığınızda sürtünme ani değişir — tablayı veya taşıyıcıyı süren motor aniden daha fazla (veya daha az) tork gerektirir. Bu geçiş, şaşırtıcı hassasiyetle gerçek zamanlı algılanabilir.

- **Optik son nokta.** Parlatma pedine kesilen bir pencere, tablayın altındaki bir spektrometrenin ped boyunca plaka yüzeyine ışık göndermesine ve yansıma spektrumunu ölçmesine olanak tanır. Bakır, tantal ve oksit farklı optik imzalara sahiptir. **Applied Materials'ın ISRM**'si (Yerinde Hız İzleme) bunu, angström seviyesinde çözünürlükle gerçek zamanlı film kalınlığı takibi için kullanır.

- **Eddy akımı algılama.** Tablayın altındaki bir bobin değişken bir manyetik alan üretir. İletken filmler (bakır) bobinin algıladığı eddy akımları oluşturur. Bakır parlatma sırasında inceldiğinde eddy akımı sinyali değişerek optik erişim olmadan sürekli bir kalınlık ölçümü sağlar.

Modern araçlar güvenilirlik için üç yöntemi de birleştirir ve birbirleriyle çapraz kontrol eder. İleri düğümlerde son nokta doğruluğu tipik olarak plaka boyunca **±5 nm** — yaklaşık 15 atom katmanı bakır.

---

## Sayı oyunu: kaç CMP adımı?

İşte çoğu insanı şaşırtan bir rakam. **3 nm düğümünde**, tek bir plaka fabtaki 60-80 günlük yolculuğu sırasında yaklaşık **20 ila 25 ayrı CMP adımından** geçer. Her bakır katmanın CMP'ye ihtiyacı vardır (yalnızca metal katmanlar için 13-15 adım). Ama CMP ayrıca şunlar için de kullanılır:

- **Sığ Hendek Yalıtımı (STI)**: transistörleri birbirinden yalıtan oksit dolguyu parlatma — plakanın karşılaştığı ilk CMP adımlarından biri.
- **Poli-CMP / kapı CMP**: kapı yapılarını düzleştirme.
- **Tungsten CMP**: yerel kontaklar için kullanılan tungsten tıkaçları parlatma.
- **ILD (katmanlar arası dielektrik) düzleştirme**: metal katmanlar arasındaki oksidi düzleştirme.

Her adımın kendi bulamacı, pedi, tarifi ve son nokta kriterleri vardır. 3 nm düğümünde ayda 100.000 plaka işleyen bir fab yılda yaklaşık **3-5 milyon litre CMP bulamacı** tüketir — formülasyona bağlı olarak litre başına 50-200 dolar maliyetle. Yalnızca CMP sarf malzemeleri bütçesi (bulamaç + pedler + koşullandırma diskleri + CMP sonrası temizleme kimyasalları) yüksek hacimli öncü bir fab için yıllık **200-400 milyon dolara** ulaşabilir.

---

## CMP sonrası temizlik: asıl kabus

CMP fabtaki en kirli adımsa, **CMP sonrası temizlik** onun kefaretıdır. Parlatmadan sonra plaka yüzeyi şunlarla kirlenmiştir:

- Artık bulamaç parçacıkları (milyarlarca silika veya alümina nanoparçacık)
- Çözünmüş bakır iyonları (transistörler için öldürücü kirleticiler — bakır silikona yayılır ve öldürücü kusur durumları oluşturur)
- Bulamaç katkı maddelerinden organik kalıntılar
- Ped koşullandırıcısından metalik kirleticiler

Tüm bunların metaller için **10⁹ atom/cm²**'nin altına (bir tek tabakanın yaklaşık 0,001'i) ve 20 nm üzeri parçacıklar için esasen sıfıra indirilmesi gerekir. Temizleme dizisi tipik olarak şunları içerir:

1. Parçacıkları kaldırmak için seyreltik amonyum hidroksit (SC-1 kimyası) ile **megasonik temizlik**.
2. Bakır iyonlarını kaldırmak için seyreltik sitrik asit ve PVA (polivinil alkol) silindirlerle **fırça ovma**.
3. 18,2 MΩ·cm ultra saf su ile **DI su durulama**.
4. Parçacıksız bir yüzey bırakmak için **santrifüj kurutma veya Marangoni kurutma**.

Tüm temizlik plaka başına 60-90 saniye sürer ve genellikle CMP aracının içine entegre edilmiş olarak parlatmadan hemen sonra gerçekleşir. Örneğin Applied Materials'ın Reflexion LK Prime'ı megasonik, fırça ve kenar pah temizleme istasyonlarına sahip çok odalı bir temizleme modülü içerir.

---

## Sezgiye aykırı gerçek: CMP sabırla iyileşir

İşte CMP mühendislerini hem gururlandıran hem de tedirgin eden şaşırtıcı gerçek: CMP, **düzleştirmede kendi kendini sınırlar**. Onu çalıştıran fizik — yüksek noktalarda daha fazla, alçak noktalarda daha az kaldırma — sürecin doğal olarak düz bir yüzeye *yakınsaması* anlamına gelir. Yeterince uzun parlarsanız herhangi bir başlangıç topografyası düzleşir.

Ama "yeterince uzun" her zaman karşılanabilir değildir. Düzleştirme hızı **desen yoğunluğuna** — yüzeyin ne kadarının yüksek, ne kadarının alçak olduğu oranına — bağlıdır. Yalıtılmış yüksek özellikler hızla düzleşir (tüm ped basıncı onlara yoğunlaşır). Ama yüzeyin %80'inin yüksek ve %20'sinin alçak olduğu bir bölgede ped basıncı neredeyse tekdüze dağılır ve düzleştirme hızı çöker. Bu **desene bağlı etkiler**, çipin farklı bölgelerinin farklı hızlarda düzleşmesi anlamına gelir.

Bu yüzden çip tasarımcıları katı **CMP tasarım kuralları**na uymalıdır: maksimum metal yoğunluğu (tipik olarak %20-80), minimum metal yoğunluğu (genellikle desen yoğunluğunu eşitlemek için eklenen işlevsel olmayan metal kareler olan **kukla dolgu** gerektiren), maksimum özellik genişliği ve yasaklanmış geometriler. Bu kurallar herhangi bir elektriksel tasarım kısıtlaması kadar katıdır. Fiziksel çip düzeni, devre işlevinden çok CMP gereksinimleri tarafından şekillenir — 1970'te kimsenin öngöremeyeceği bir ironi.

---

## Gelecek: 2 nm ve ötesinde CMP

Endüstri 2 nm ve **gate-all-around (GAA)** transistör çağına doğru ilerlerken CMP yeni zorluklarla karşılaşıyor:

- **Yeni malzemeler**: GAA nanolevha süreçleri, yeni bulamaç kimyaları gerektiren silikon-germanyum (SiGe) üst örgü yapıları tanıtıyor. Si ve SiGe arasındaki seçicilik son derece hassas kontrol edilmelidir.
- **Arka taraf güç dağıtımı**: Intel'in PowerVia ve TSMC'nin BSPDN mimarileri (Gün 11'de tartışılan) plakanın *her iki tarafına* metal katmanlar koyarak CMP adım sayısını ikiye katlar.
- **3D istifleme**: Çiplet entegrasyonu için hibrit bağlama, **±0,5 nm** dahilinde — kabaca iki atom katmanı silikon — düz plaka yüzeyleri gerektirir. Bu, geleneksel CMP'yi kaba gösterir.
- **Rutenyum ve molibden CMP**: Bakır en dar adımlarda alternatif metallere yerini bıraktıkça, yeni CMP süreçleri sıfırdan geliştirilmelidir. Rutenyum kimyasal olarak inert ve son derece serttir — onu kusursuz parlatmak bir malzeme bilimi sınırıdır.

CMP araç pazarı yıllık yaklaşık **5 milyar dolar** değerindedir ve büyüyor. Her yeni transistör mimarisi, her ek metal katmanı, her yeni malzeme başka bir CMP adımı demektir. Bir zamanlar temiz oda için çok kirli kabul edilen süreç, yarı iletken üretimindeki en çok tekrarlanan, en fazla sarf malzemesi tüketen ve tartışmasız en kritik birim süreç haline gelmiştir.

---

## İleriye bakış

Yarın **Gün 13: Paketleme** — çiplet'ler, 3D istifleme ve paketin neden yeni darboğaz olduğu. On bir gün boyunca düz bir silikon kalıp üzerinde transistörler inşa ettik ve birbirine bağladık. Ama çıplak bir kalıp işe yaramaz — dış dünyaya bağlanması, çevreden korunması ve giderek artan biçimde, tek bir silikon parçasının tek başına sunamayacağı performansı sağlamak için *diğer kalıplarla istiflenmelidir*. Paket, çiplerin ürüne dönüştüğü yerdir ve yarı iletkenlerdeki en radikal yeniliğin bir kısmı şu anda orada gerçekleşiyor. Bugün elde ettiğimiz düzlük mü? Birden fazla çipi nanometre hassasiyetinde yüz yüze birleştirmenin temeli olmak üzere.

---

<div class="quiz-section">

## Bilginizi Test Edin

{{#quiz quizzes/gun-12.toml}}

</div>
