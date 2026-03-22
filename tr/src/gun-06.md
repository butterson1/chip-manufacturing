# Gün 6: Üretim Düğümleri (Process Node)
## "3nm" Aslında Ne Anlama Geliyor (ve Neden Büyük Ölçüde Pazarlama)

Dün sıfırdan bir CPU inşa ettik — NAND kapılarından toplayıcılara, boru hatlarına. Bu yolculuğun her adımı tek bir varsayıma dayanıyordu: transistörleri *daha küçük* yapabilmemize. Transistörü küçültün, çipe daha fazla sığdırın, vat başına daha fazla hesaplayın. Basit.

Ama yarı iletken endüstrisinin kirli bir sırrı var: **üretim düğümü adındaki sayı, yaklaşık 2009'dan beri çipteki herhangi bir fiziksel ölçüme karşılık gelmiyor.** Intel "Intel 4" ya da TSMC "N3" dediğinde, bu sayılar pazarlama etiketleridir — Starbucks'taki "Grande" gibi marka isimleri. Bir sürecin nesiller sıralamasında yaklaşık nereye oturduğunu söylerler, ama bir elektron mikroskobuyla "3nm" çipi incelemeye başlarsanız 3 nanometre olan bir şey bulamazsınız.

Bu dolandırıcılık değil. Bir endüstrinin ölçüm sisteminin fiziksel gerçeklikten nasıl yavaşça ayrıldığının — ve bu ayrışmayı anlamanın modern yarı iletkenleri kavramak için neden vazgeçilmez olduğunun hikâyesi.

## Altın Çağ: Sayının Bir Anlamı Olduğunda

Geriye saralım. 1970'ler ve 1980'lerde süreç düğümü adları keyifli biçimde gerçekçiydi. Intel 1979'da 8086 için 3 mikron sürecini tanıttığında, basılabilecek en küçük detay — genellikle transistörün kapı uzunluğu — gerçekten yaklaşık 3 mikrometreydi (3.000nm). Adlandırma betimleyiciydi.

1990'lar boyunca adlandırma sözleşmesi geçerliliğini korudu. 250nm düğüm (~1997) gerçekten 250nm'ye yakın kapı uzunluklarına sahipti. Her nesil kritik boyutu yaklaşık 0,7× küçültüyordu — karelendiğinde nesil başına transistör yoğunluğunda 2× artış sağlayan bir faktör. Bu, Moore Yasası'na gömülü ölçekleme faktörüdür.

Sonra işler... yaratıcılaştı.

## Büyük Ayrışma: Kapı Uzunluğu ile Düğüm Adı

130nm düğüm (~2001) civarında bir uçurum açılmaya başladı. Fiziksel kapı uzunlukları düğüm adının ima ettiğinden daha hızlı küçülmeye başladı, çünkü mühendisler kapı uzunluğunun basılabilir adımla eşleşmek zorunda olmadığını keşfetti. 65nm düğümde (~2005-2006) fiziksel kapı uzunluğu yaklaşık 35nm'ye — düğüm adının kabaca yarısına — düşmüştü.

Ama asıl kopuş 22nm'de geldi. 2012'de Intel, devrim niteliğinde FinFET transistörüyle 22nm sürecini tanıttı. Düz bir kanal üzerine oturan planar kapı yerine, kanal ince bir dikey yüzgece oyulmuş ve kapı üç tarafından sarılmıştı. Bu temelden üç boyutlu bir yapıydı. "Kapı uzunluğu nedir?" sorusu aniden garip bir yanıt aldı — yüzgeç yüksekliğini mi, yüzgeç genişliğini mi, kapının kanal yönünde sardığı mesafeyi mi kastediyorsunuz? Tek bir tanımlayıcı boyut kavramı artık cihazın karmaşıklığını yakalayamıyordu.

Intel buna 22nm süreci dedi. Yüzgeç adımı 60nm'ydi. Minimum metal adımı 80nm'ydi. "22" bu sayıların hiçbiri değildi. Sadece... isimdi.

## Bugün Bir Süreci Gerçekte Ne Tanımlar

Düğüm adı fiziksel bir detaya karşılık gelmiyorsa, bir süreci diğerinden *gerçekte* ne ayırır? Endüstri birkaç gerçek metrik izler:

**Transistör yoğunluğu** en dürüst ölçüdür. Milimetrekare silikon başına kaç transistör sığdırabildiğiniz. TSMC'nin N5 (5nm) süreci mm² başına yaklaşık 173 milyon transistör barındırır. N3E (geliştirilmiş 3nm) yaklaşık 291 milyon/mm²'ye ulaşır. Intel 4 yaklaşık 160 milyon/mm²'dir.

**Metal adımı** — en dar metal ara bağlantı katmanının merkezden merkeze aralığı — muhtemelen fiziksel olarak en anlamlı metriktir. TSMC'nin N3'ünde minimum metal adımı (M1) yaklaşık 23nm'dir. Intel 4'te yaklaşık 21nm. Bunlar elektron mikroskobuyla ölçebileceğiniz gerçek mesafelerdir.

**Kapı adımı** (CPP — temaslı poli adımı olarak da bilinir) komşu transistör kapıları arasındaki tekrarlayan mesafeyi ölçer. **Yüzgeç adımı** (veya GAA düğümlerinde nano-levha adımı) transistör kanalını oluşturan yüzgeçler veya nano-levhalar arasındaki aralığı ölçer.

Yani bir "süreç düğümü" gerçekte bu boyutların bir *demeti* artı tasarım kuralları ve mevcut metal katman sayısıdır. Tek bir ölçümden çok şarap üzerindeki yıl etiketine benzer — kabaca ne zaman yapıldığını söyler ve kaba bir kalite sinyali verir, ama teruar yıldan daha önemlidir.

## Adlandırma Silahlanma Yarışı

İşte sinik biçimde büyüleyici olan kısım. 2016 civarında dökümhaneler, düğüm adlarının pazarlama silahına dönüştüğünü fark etti. En küçük sayıya sahip olmak için muazzam rekabet baskısı vardı.

2018'de TSMC "7nm" sürecini (N7) sevk etti. Intel hâlâ "14nm" (14nm++) sevk ediyordu. Salt isimlere bakarsanız Intel iki tam nesil gerideydi. Ama transistör yoğunluğunu ölçerseniz, Intel'in 14nm'si mm² başına yaklaşık 100 milyon transistör sunuyordu — TSMC'nin yaklaşık 96 milyon/mm²'lik N7'siyle neredeyse aynı seviyede. Intel'in "14nm"si, gerçek transistör yoğunluğunda TSMC'nin "7nm"sine kabaca denkti.

Bu Intel'i çileden çıkardı, haklı olarak. Sonunda pes ettiler ve süreçlerini yeniden adlandırdılar: "10nm Enhanced SuperFin" "Intel 7" oldu. "7nm" "Intel 4" oldu. Eski numaralandırma daha dürüst olabilirdi, ama transistör yoğunlukları karşılaştırılabilirken "Intel 10nm"yi "TSMC 5nm"ye karşı satmak ticari intihar olurdu.

Samsung yangına benzin döktü. 2022'de tanıttıkları "3nm" GAA süreci, varyanta bağlı olarak yaklaşık 150-170 milyon/mm² transistör yoğunluğuna sahipti — TSMC'nin 173 milyon/mm²'lik "5nm"sine denk veya daha düşük. Samsung aslında yoğunluk metrikleriyle 5nm sınıfı bir ürüne "3nm" etiketini yapıştırdı.

## Şaşırtıcı Gerçek: Daha Büyük Düğüm, Daha İyi Ürün?

İşte teknik olarak okuryazar insanları bile şaşırtan sezgilere aykırı gerçek: **"daha büyük" bir süreç düğümünde üretilen bir çip, "daha küçük" bir düğümdekinden kesinlikle daha iyi performans gösterebilir.**

Analog ve RF çipleri düşünün. Texas Instruments'ın en çok satan ürünleri 65nm ve 130nm süreçlerde üretilir — dijital tasarımcıların 15-20 yıl önce terk ettiği düğümler. Ama güç yönetimi, sensör arayüzleri ve radyo frekansı devreleri için bu eski süreçler *üstündür*. Daha yüksek voltajları kaldırır, daha düşük gürültüye sahiptir ve en ileri dijital süreçlerin bir kesirine mal olur. TI, 130nm fabrikalarından bazılarını neredeyse %100 kapasite kullanımıyla işletir.

## Gerçek Fizik: Tabanı Ne Belirler

İsimler pazarlamaysa, gerçek fiziksel sınırlar nerede? Şeyleri gerçekte ne kadar küçük yapabileceğinizi ne belirler?

**Kuantum tünelleme** kapı oksit kalınlığı için bir taban belirler. Modern kapı oksitleri yaklaşık 1-2nm eşdeğer oksit kalınlığındadır — kabaca 5-10 atom kalınlığında. Bundan çok daha ince yapamazsınız.

**Kısa kanal etkileri** kanalın ne kadar kısa olabileceğine bir taban belirler. Kanal çok kısaldığında (şu an üretimde yaklaşık 5-12nm) kaynak ve akıtma elektrik alanları birbirine müdahale etmeye başlar ve kapı kanal kontrolünü kaybeder. Endüstrinin planar transistörlerden FinFET'lere ve şimdi GAA nano-levhalara geçmesinin nedeni budur.

**Çizgi kenarı pürüzlülüğü (LER)** detaylar küçüldükçe orantılı olarak daha yıkıcı hale gelir. 20nm genişliğinde basılması gereken bir çizgide kenarlar ±1-2nm dalgalanır. 200nm'de bu %1 — önemsiz. 20nm'de aynı dalgalanma %10 — transistörün elektriksel özelliklerini önemli ölçüde değiştirir.

**Elektromigrasyon** küçük bakır (veya şimdi kobalt ve rutenyum) ara bağlantı tellerinden ne kadar akım geçirebileceğinizi sınırlar. Yaklaşık 20nm tel genişliğinin altında bakır atomlar elektron akımı tarafından fiziksel olarak itilir. Endüstrinin en sıkı tel katmanları için rutenyum ve molibden araştırmasının nedeni budur.

## Ekonomi: Adlandırmanın Fizikten Neden Daha Önemli Olduğu

Pazarlama absürdlüğünün arkasında ölümcül ciddi bir ekonomik gerçeklik yatar. Her süreç düğümünü geliştirmek akıl almaz derecede pahalıdır.

TSMC yalnızca 2023'te yaklaşık 36 milyar dolar sermaye harcaması yaptı. 3nm süreçte karmaşık bir çip tasarlamak 500-800 milyon dolara mal olur. 28nm'de yaklaşık 40-50 milyon. Bu 10× maliyet farkı, yalnızca bir avuç ürünün en ileri tasarımı haklı kılacak kadar hacme sahip olduğu anlamına gelir.

Dürüst metrik — transistör başına maliyet — gerçek hikâyeyi anlatır. On yıllar boyunca her düğüm transistörleri daha ucuz yaptı. Bu eğilim 28nm civarında kırıldı. 28nm'nin altında, EUV maliyetleri ve düşük ilk verimler nedeniyle transistör başına maliyet ileri düğümlerde *artmaya* başladı. 28nm düğümü, transistör başına maliyet tatlı noktası olarak kalmaya devam ediyor — dünyanın en yaygın üretilen süreci olmasının ve fabrikaların 28nm kapasitesi inşa etmeye devam etmesinin nedeni budur.

## Çıkarımlar

Süreç düğümü adları nesil etiketleridir, ölçüm değil. Gerçek metrikler — transistör yoğunluğu, metal adımı, kapı adımı — bir sürecin gerçekte neler yapabileceğini söyler. Ve her düğümün ekonomisi hangi ürünlerin onu kullanmaya gücü yettiğini belirler.

Yarın, insanoğlunun yarattığı en olağanüstü üretim ortamının içine adım atacağız: yarı iletken fabrikasının kendisi. Havanın bir hastane ameliyathnesinden 10.000 kat daha temiz olduğu, tek bir toz zerresinin felaket olduğu ve makinelerin ticari yolcu uçaklarından daha pahalıya mal olduğu bir yer.

---

{{#quiz quizzes/gun-06.toml}}
