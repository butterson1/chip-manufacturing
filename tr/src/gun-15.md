# Gün 15: RTL'den GDSII'ye
## Bir Çip Nasıl Tasarlanır — Koddan Silikon Planına

Son on dört gündür fiziksel dünyanın derinliklerindeydik: fotonlar maskelerin arasından geçiyor, plazma silikonun içine hendekler oyuyor, bakır atomları nanometre ölçeğindeki kanallara elektrokaplama yapıyordu. Çiplerin *nasıl* üretildiğini öğrendiniz. Bugün bakış açısını tamamen değiştiriyoruz. Daha tek bir foton bile wafer'a ulaşmadan, tek bir atom bile biriktirilmeden, birinin çipi *tasarlaması* gerekiyor — ve bu süreç, kendi içinde, üretim kadar olağanüstü.

İşte sizi şaşırtabilecek bir şey: **modern çipler kodla yazılıyor**. C değil, Python değil, ama Verilog ve VHDL gibi özelleşmiş donanım tanımlama dilleriyle. Bir mühendis artık transistörleri elle çizmez, tıpkı bir romancının harfleri taşa oymaması gibi. Yazılıma oldukça benzeyen bir şeyler yazıyor, "derle" düğmesine basıyor ve yıllık **15 milyar doları** aşan gelire sahip bir yazılım araçları zinciri — bu kodu, ASML'nin tarayıcılarına 300 mm'lik bir wafer üzerindeki her yapının tam olarak nereye yerleştirileceğini söyleyen fiziksel plana dönüştürüyor.

Bu dönüşüm — Register Transfer Level (RTL) tanımından GDSII dosyasına (maske verileri için endüstri standardı format) — gezegendeki en yoğun hesaplama gerektiren mühendislik iş akışlarından biri. Apple'ın **134 milyar transistörlü** M2 Ultra'sını tasarlamak tahminen **10-15 milyon CPU-saatlik** işlem gücü gerektirdi. Bunu mümkün kılan yazılımları üreten iki şirket olan Synopsys ve Cadence'in toplam piyasa değeri **150 milyar doları** aşıyor — birçok yarı iletken şirketinin kendisinden büyük. Çipleri *tasarlayan* araçlar, çipleri *üreten* birçok şirketten daha değerli.

İlk Verilog satırından tape-out kutlamasına kadar tüm sürecin içinden geçelim.

---

## Adım 1: Çipi yazmak — RTL ve donanım tanımlama dilleri

Yolculuk RTL koduyla başlar ve "Register Transfer Level"ın ne anlama geldiğini anlamak tüm soyutlamayı açar. Bu düzeyde tasarımcı, donanımı **yazmaçlar (kaydediciler) arasında akan veri** (bitleri depolayan flip-floplar) ve bu veriyi saat döngüleri arasında dönüştüren **kombinasyonel mantık** cinsinden tanımlar. Tek tek transistörleri değil — işlevi düşünüyorsunuz.

Verilog'da basit bir 8-bit sayıcının nasıl göründüğüne bakalım:

```verilog
module counter (
    input  wire       clk,
    input  wire       reset,
    output reg [7:0]  count
);
    always @(posedge clk) begin
        if (reset)
            count <= 8'b0;
        else
            count <= count + 1;
    end
endmodule
```

Bu on satırlık bir kod. Her yükselen saat kenarında bir artırılan bir yazmaç (`count`) tanımlıyor. Ama bu gerçek kapılara ve kablolara sentezlendiğinde, kabaca **80-100 transistöre** dönüşür — bir 8-bit toplayıcı, sekiz flip-flop, sıfırlama mantığı, saat dağıtım tamponları. RTL soyutlaması, tek bir mühendisin transistör düzeyinde çizmesi günler sürecek bir davranışı tanımlamasına olanak verir.

Şimdi bunu ölçeklendirin. Apple'ın A17 Pro'su yaklaşık **19 milyar transistöre** sahip. Böyle bir çipin RTL'i, 2-3 yıl boyunca **yüzlerce mühendisin** yazdığı **on milyonlarca satır** Verilog/SystemVerilog kodundan oluşur. Sadece CPU çekirdeği 500.000-1.000.000 satır olabilir. GPU, Neural Engine, görüntü sinyal işlemcisi, ekran denetleyicisi, PCIe ve USB denetleyicileri, bellek arayüzleri — her biri uzmanlaşmış bir ekip tarafından tasarlanan büyük bir alt sistemdir.

Kritik bir ayrım: **RTL yazılım değildir**. `count <= count + 1` yazdığınızda, bir işlemciye toplama komutu yürütmesini söylemiyorsunuz. **Silikonda fiziksel olarak var olacak donanımı** tanımlıyorsunuz — gerçek transistörlerden yapılmış, tek bir saat döngüsünde bu toplamayı yapacak, her saat döngüsünde yapacak, biri istese de istemese de, çipin ömrü boyunca çalışacak gerçek bir toplayıcı devresi. RTL'deki her şey eşzamanlı olarak çalışır. Her `always` bloğu her saat kenarında, paralel olarak tetiklenir. Bu, donanım mühendislerini yazılım mühendislerinden ayıran temel zihinsel dönüşümdür ve deneyimli RTL tasarımcılarının teknolojideki en aranan mühendisler arasında olmasının nedenidir — Apple, NVIDIA ve AMD gibi şirketlerde **300.000-500.000$+** maaş alırlar.

---

## Adım 2: Doğrulama — Kimsenin konuşmadığı %70

İşte çip tasarımının kirli sırrı: **doğrulama, tüm proje çabasının %60-70'ini tüketir**. Çipi doğrulayan mühendis sayısı, onu tasarlayandan fazladır. Nedeni basit ama korkutucu: silikona yama yapamazsınız. Bir tasarımı tape-out edip TSMC'ye wafer üzerine bastırdığınızda — 3nm düğümünde **300-500 milyon dolara** mal olan bir süreç — geri dönüşünüz yoktur. GPU gölgelendirici boru hattındaki bir hata veya bellek denetleyicisindeki bir yarış durumu bir düzeltme eki almaz. Yeniden döndürülür — 3-6 ay daha ve 300-500 milyon dolar daha.

Endüstrinin en ünlü doğrulama başarısızlığı? Intel'in 1994'teki **Pentium FDIV hatası** — kayan nokta bölenindeki bir arama tablosu hatası, belirli nadir bölen çiftleri için yanlış sonuçlar üretiyordu. Intel başta bunu küçümsedi, ardından etkilenen işlemcileri değiştirmek için **475 milyon dolarlık** bir zarar yazmak zorunda kaldı. Enflasyona göre düzeltildiğinde bu bugün yaklaşık 1 milyar dolar — 1.066 girdisi olan bir tabloda beşinin yanlış olmasından kaynaklanan bir hata.

Modern doğrulama katmanlı bir yaklaşım kullanır:

**Simülasyon** temel iş gücüdür. Synopsys VCS ve Cadence Xcelium gibi araçlar RTL'i bir yazılım modeline derler ve test senaryolarını ona karşı çalıştırır. Ama sorun şu: mütevazı bir CPU çekirdeğinin bile durum uzayı o kadar büyüktür ki kapsamlı simülasyon evrenin yaşından daha uzun sürer. 200 mimari yazmaca, 256 girişli bir yeniden sıralama tamponuna ve çok seviyeli bir önbellek hiyerarşisine sahip sıra dışı bir çekirdeğin olası durumları, gözlemlenebilir evrendeki atom sayısından fazladır. Hepsini test edemezsiniz.

**Kısıtlamalı rastgele doğrulama** (CRV), tanımlı kısıtlamalar dahilinde milyonlarca sözde rastgele uyarıcı desen üreterek buna saldırır. Her test senaryosunu elle yazmak yerine mühendisler geçerli girdilerin *uzayını* tanımlar ve aracın keşfetmesine izin verir. Bir SystemVerilog test ortamı rastgele komut dizileri, rastgele bellek erişim desenleri, rastgele kesme zamanlaması üretebilir — ve ardından RTL'in bir referans modele göre doğru sonuçlar üretip üretmediğini kontrol eder. Kapsam metrikleri, hangi durumların, geçişlerin ve köşe durumlarının test edildiğini izler. Ekipler genellikle tape-out öncesinde **>%95 işlevsel kapsam** hedefler.

**Biçimsel doğrulama** tamamen farklı bir yaklaşım benimser: matematiksel ispat. Synopsys VC Formal ve Cadence JasperGold gibi araçlar, SAT çözücüler ve model denetleme kullanarak belirli özelliklerin yalnızca test ettiğiniz girdiler için değil, *tüm* olası girdiler için geçerli olduğunu *kanıtlar*. Örneğin, bir hakemcinin asla aynı anda iki ana birime yetki vermediğini veya bir FIFO'nun protokolün zamanlama kısıtlamaları altında asla taşmadığını biçimsel olarak kanıtlayabilirsiniz. Biçimsel doğrulama kontrol mantığı ve protokoller için inanılmaz güçlüdür, ancak veri yolu ağırlıklı tasarımlara iyi ölçeklenmez — 64-bit kayan nokta çarpıcısı hakkındaki özellikleri kanıtlamak modern SAT çözücüleri bile zorlayabilir.

**Emülasyon ve FPGA prototipleme**, simülasyon hızı ile silikon doğruluğu arasında bir orta yol sunar. Synopsys ZeBu ve Cadence Palladium, **5-20 milyon dolara** mal olan sunucu rafı boyutunda devasa emülasyon sistemleridir; RTL'i özelleşmiş donanıma eşleyerek yazılım simülasyonundan 1.000-10.000× daha hızlı çalıştırır. Bu, ekiplerin silikon gelmeden aylar önce tasarım üzerinde bir işletim sistemi başlatmasına olanak tanır. FPGA prototipleme (Xilinx/AMD Versal veya Intel Agilex FPGA'ları kullanarak) daha da yüksek hız sunar, ancak hata ayıklama görünürlüğü daha azdır.

---

## Adım 3: Mantık sentezi — Davranıştan kapılara

RTL doğrulandıktan sonra, **mantık sentezi** davranışsal tanımı, dökümhanenin **standart hücre kütüphanesinden** belirli mantık kapılarının bir netlistine dönüştürür. Bu, soyut tasarımın belirli bir üretim sürecinin fiziksel gerçekliğiyle buluştuğu ilk andır.

Standart hücre kütüphanesi, önceden tasarlanmış, önceden karakterize edilmiş mantık fonksiyonlarının kataloğudur: NAND2, NOR3, eviriciler, flip-floplar, çoklayıcılar, toplayıcılar ve daha egzotik hücreler — genellikle kütüphane başına **500-1.000 farklı hücre**. Her hücre transistör düzeyinde tasarlanmış, gerilim ve sıcaklık köşelerinde simüle edilmiş ve zamanlama, güç ve alan için karakterize edilmiştir. TSMC'nin N3E kütüphanesi, 1× sürücü gücüne sahip, 0,051 µm yüksekliğinde ve 0,040 µm genişliğinde, sinyali 12 pikosaniye geciktiren ve 0,3 femtowatt kaçak güç tüketen bir NAND2 kapısı içerebilir.

Sentez aracı — genellikle Synopsys Design Compiler veya Cadence Genus — RTL'i ve bir dizi **kısıtlamayı** okur: hedef saat frekansı, maksimum alan, güç bütçesi. Ardından bir dizi dönüşüm gerçekleştirir:

1. **Detaylandırma**: RTL'i ayrıştırır ve teknolojiden bağımsız bir Boolean ağı oluşturur
2. **Teknoloji eşleme**: genel işlemleri belirli standart hücrelere eşler
3. **Optimizasyon**: zamanlama, alan ve güç hedeflerini karşılamak için mantığı yinelemeli olarak yeniden yapılandırır

Optimizasyon, sentezin gerçek değerini gösterdiği yerdir. Araç, dört adet 2-girişli NAND kapısı zincirinin tek bir 4-girişli AND-OR-Invert (AOI) karmaşık kapısıyla değiştirilebileceğini fark edebilir, böylece alan tasarrufu sağlanır ve hız artar. Kritik bir yolda fan-out gecikmesini azaltmak için mantığı çoğaltabilir. Ağır yüklü bir sinyali dağıtmak için tampon ağaçları ekleyebilir. Bunlar, milyarlarca kapılı bir tasarımda hiçbir insanın verimli bir şekilde yapamayacağı kararlardır.

Sentez çıktısı bir **kapı düzeyi netlistidir**: her kapı örneğini ve bunları bağlayan her kabloyu listeleyen devasa bir metin dosyası. Apple'ın M2'si gibi bir tasarım için bu netlist yaklaşık **5-10 milyar** kapı örneği içerir. Dosyanın kendisi onlarca gigabayt olabilir.

---

## Adım 4: Kat planı — Mimarın planı

Bireysel hücreler yerleştirilmeden önce, çipin bir **kat planına** ihtiyacı vardır — ana blokları kalıbın belirli bölgelerine atayan üst düzey bir yerleşim. Bu kısmen mühendislik, kısmen sanattır ve sonuçları muazzamdır.

Kat planlayıcısı şunları göz önünde bulundurmalıdır:

- **Veri akışı**: yoğun iletişim kuran bloklar bitişik olmalıdır. L2 önbelleğini hizmet ettiği CPU çekirdeğinden uzağa yerleştirmek, performansı mahveden kablo gecikmesi ekler.
- **Güç dağılımı**: yüksek güçlü bloklar (CPU çekirdekleri, GPU gölgelendirici dizileri) termal sıcak noktaları önlemek için kalıp üzerine yayılmalıdır. NVIDIA'nın Blackwell B200 GPU'su yaklaşık 800 mm² üzerinde **1.000W** harcar — bu, mm² başına 1,25 W'dır ve yerel sıcak noktalar 3-4 W/mm²'yi aşabilir, gelişmiş soğutma çözümlerini bile zorlayan **400°C/cm²** ısı akı yoğunluklarına yaklaşır.
- **G/Ç yerleşimi**: güç, toprak ve sinyal pedleri kalıp kenarında olmalı ve hizmet ettikleri bloklar yakınında bulunmalıdır.
- **Saat dağılımı**: saat sinyali her flip-flopa dar bir zamanlama penceresinde (saat kayması) ulaşmalıdır, bu da merkezi saat kaynaklarını ve simetrik yerleşimleri tercih eder.

Kat planı ayrıca **güç ızgarasını** tanımlar — üst metal katmanlarındaki VDD ve VSS'yi kalıp boyunca dağıtan geniş metal hatlardan oluşan bir ağ. Modern bir SoC, **üst metal katmanlarının %30-40'ını** tamamen güç dağıtımına ayırabilir. Intel'in PowerVia teknolojisi (11. Günde ele aldığımız) bu ızgarayı wafer'ın arka yüzüne taşıyarak ön yüzdeki değerli yönlendirme kaynaklarını serbest bırakır.

---

## Adım 5: Yerleştirme ve yönlendirme — Planı doldurmak

Kaba hesaplama gücünün işe girdiği yer burasıdır. **Yerleştirme**, sentezlenmiş netlistteki milyarlarca standart hücreyi alır ve her birine kalıp üzerinde fiziksel bir konum atar. **Yönlendirme** daha sonra bunları 12-15+ metal katman boyunca metal kablolarla birbirine bağlar.

Modern yerleştirme ve yönlendirme (PnR) araçları — Synopsys IC Compiler II ve Cadence Innovus — tartışmasız en fazla hesaplama gerektiren EDA araçlarıdır. 5 milyar hücreli bir tasarımı yerleştirmek, özünde, gezgin satıcı problemini önemsiz gösteren bir kombinatoryal optimizasyon problemidir. Araçlar bir dizi algoritma kullanır:

1. **Genel yerleştirme**: toplam kablo uzunluğunu en aza indirmek için hücreleri kalıp boyunca dağıtır; hücreleri birbirini iten yüklü parçacıklar gibi ele alırken optimal konumlarına çekilen analitik yöntemler kullanır
2. **Yasallaştırma**: hücreleri ayrık standart hücre satırlarına oturtur, çakışmaları çözer
3. **Ayrıntılı yerleştirme**: yerel düzeltmeler — bitişik hücreleri takas etme, küçük grupları kaydırma — kritik yollardaki zamanlamayı iyileştirir
4. **Saat ağacı sentezi** (CTS): saat sinyalini minimum kaymayla dağıtmak için dengeli bir tampon ağacı oluşturur. 3+ GHz'de çalışan modern bir SoC'de saat ağacı **500.000-1.000.000 tampon** içerebilir ve kayma bütçesi **5-10 pikosaniye** kadar dar olabilir — ışığın 1,5-3 milimetre yol aldığı süre.
5. **Genel yönlendirme**: çipin yönlendirme ızgarası boyunca her net için kaba yollar planlar
6. **Ayrıntılı yönlendirme**: belirli metal izleri ve geçişler atar, birden fazla netin aynı yönlendirme kaynakları için rekabet ettiği çakışmaları çözer

Yönlendirme adımı, fiziksel tasarımın 11. Gün'deki ara bağlantı fiziğiyle buluştuğu yerdir. Her kablonun uzunluğu, genişliği, metal katmanı ve komşularla arasındaki mesafe tarafından belirlenen direnci ve kapasitansı vardır. Araç, her sinyalin hedefine saat periyodu içinde ulaşmasını sağlamalıdır — ve 3nm'de, 13+ metal katman ve **milyarlarca yönlendirilmiş net** ile bu, inanılmaz derecede karmaşık bir kısıt sağlama problemidir.

Büyük bir SoC için tam bir PnR çalışması, **binlerce CPU çekirdeği** ve **terabaytlarca RAM** içeren bir hesaplama çiftliğinde **2-4 haftalık gerçek zamanlı süre** alabilir. Cadence ve Synopsys her ikisi de PnR motorlarına **makine öğrenmesi** eklemiştir: Synopsys DSO.ai, araç ayarlarının uzayını keşfetmek için pekiştirmeli öğrenme kullanır ve bazı durumlarda insan mühendislerin haftalarca manuel ayarlama sonrasında ulaşacağı sonuçlarla eşleşen veya daha iyi sonuçlar elde ettiği bildirilmektedir.

---

## Adım 6: Zamanlama kapanışı — Olur ya da olmaz anı

Tasarım, **zamanlamayı geçene** kadar bitmez. Statik Zamanlama Analizi (STA) — Synopsys PrimeTime gibi araçlarla gerçekleştirilir — her flip-floptan her kapı üzerinden diğer her flip-flopa giden her yolu kontrol eder ve sinyalin bir sonraki saat kenarından önce ulaştığından emin olur.

Ama işin inceliği şu: zamanlama tek bir sayı değildir. Şunlara göre değişir:

- **Süreç**: üretim varyasyonu bazı transistörlerin daha hızlı, diğerlerinin daha yavaş olduğu anlamına gelir
- **Gerilim**: VDD yoğun yük altında düşer, kapıları yavaşlatır
- **Sıcaklık**: daha sıcak transistörler daha yavaştır (çoğunlukla — ileri düğümlerde aslında bir ters dönüş noktası vardır)

STA, düzinelerce **PVT köşesinde** — {yavaş süreç, düşük gerilim, yüksek sıcaklık} gibi kurulum kontrolleri için ve {hızlı süreç, yüksek gerilim, düşük sıcaklık} gibi tutma kontrolleri için kombinasyonlar — zamanlamayı analiz eder. Bir tasarım **tüm** köşelerde aynı anda zamanlamayı geçmelidir.

Yollar zamanlamayı karşılamadığında — **zamanlama ihlalleri** — ekip, **zamanlama kapanışının** yinelemeli çilesine girer: yerleşimi ayarlama, kapıları yeniden boyutlandırma, tamponlar ekleme, mantığı yeniden yapılandırma, bazen RTL'i bile değiştirme. Karmaşık bir SoC'de zamanlama kapanışı **toplam fiziksel tasarım programının %40-50'sini** tüketebilir. Ekiplerin tape-out öncesindeki haftalarda sabah 3'te zamanlama ihlallerini kapattığı nadir görülen bir durum değildir.

---

## Adım 7: Fiziksel doğrulama ve tape-out

Veriyi dökümhaneye göndermeden önceki son engel iki kritik kontrol içerir:

**Tasarım Kuralı Denetimi (DRC)**, yerleşimdeki her geometrik şeklin dökümhanenin üretim kurallarına uyduğunu doğrular — minimum kablo genişlikleri, yapılar arası minimum mesafe, metallerin geçişleri minimum çevreleme miktarı ve yüzlerce diğer kısıtlama. TSMC'nin N3 DRC kural paketi **binlerce kural** içerir. Tek bir ihlal potansiyel bir verim katilidir. Modern tasarımlar ilk yönlendirmeden sonra **milyonlarca DRC ihlaliyle** başlayabilir ve araçlar bunları yinelemeli olarak düzeltir.

**Yerleşim Şematik Karşılaştırması (LVS)**, fiziksel yerleşimden gerçek devreyi çıkarır — her transistörü, her kabloyu, her bağlantıyı tanımlar — ve sentezden gelen orijinal netlist ile karşılaştırır. LVS, çizdiğiniz şeyin tasarladığınız şey olduğunu doğrulamalıdır. LVS temiz bir tasarım, yerleşimin amaçlanan devreyi sadakatle temsil ettiği anlamına gelir. Milyar transistörlü bir tasarımda "LVS temiz" durumuna ulaşmak, ekiplerin kutladığı bir kilometre taşıdır.

DRC ve LVS temiz olduğunda, parazitik çıkarma araçları (Synopsys StarRC gibi) yerleşimdeki her kablonun direncini ve kapasitansını çıkarır ve son bir STA çalışması, zamanlamanın bu gerçek parazitiklerle hâlâ geçtiğini doğrular. Ardından **onay** gelir: tasarımın hazır olduğunun resmi beyanı.

Son çıktı bir **GDSII** dosyasıdır (veya giderek daha fazla modern halefi **OASIS**), çipin her katmanı için geometrik şekilleri içerir. Modern bir SoC için bu dosya **1-2 terabayt** boyutunda olabilir. Güvenli, özel bir ağ bağlantısı üzerinden dökümhaneye iletilir — e-postayla gönderilmez, USB'ye konulmaz. Bu ana **tape-out** denir; 1970'lerde maske verilerinin gerçekten manyetik banda yazıldığı zamanlara dayanan bir terim. Büyük yarı iletken şirketlerinde tape-out bir ekip kutlamasıyla işaretlenir — çünkü bir sonraki kilometre taşı, aylar sonra ilk fiziksel çiplerin fabrikadan döndüğü **silikon geri dönüşüdür**.

---

## Sezgiye aykırı gerçek: EDA neden bir düopoldür

Merak edebilirsiniz: çip tasarlayan araçlar bu kadar kritikse — 500 milyar dolarlık bir yarı iletken endüstrisi bunlara bağlıysa — neden yalnızca iki büyük EDA şirketi var? Synopsys ve Cadence birlikte **15+ milyar dolarlık EDA pazarının** yaklaşık **%70'ini** kontrol ederken, Siemens EDA (eski adıyla Mentor Graphics) geri kalanın büyük bölümünü elinde tutuyor.

Cevap **geçiş maliyetleri ve entegrasyondur**. PnR aracı izole çalışmaz — zamanlama verilerini STA aracına besler, STA aracı çıkarma aracından parazitik veri okur, çıkarma aracı da PnR aracının oluşturduğu fiziksel tasarım veritabanını tüketir. Her araç, dökümhanenin süreç modelleri ve DRC paketleriyle kalibre edilmiştir. Akıştaki tek bir araç için bile Synopsys'ten Cadence'e geçmek **6-12 aylık** yeniden yeterlilik süreci gerektirebilir. Ve dökümhaneler, süreç tasarım kitlerini (PDK'larını) belirli EDA satıcılarıyla birlikte geliştirdiğinden, bir alternatifi kolayca takamazsınız. TSMC ve Synopsys, N3 ve N2 araç akışlarını bu düğümler üretime ulaşmadan yıllar önce birlikte geliştirmektedir.

Bu nedenle Synopsys'in 2024'teki 35 milyar dolarlık Ansys satın alması stratejik olarak mantıklıydı: güç, termal ve elektromanyetik simülasyonu RTL-GDSII akışına entegre etmek daha da derin bir hendek oluşturur.

---

## Önemli sayılar

Bunu somut ekonomik verilerle temelllendirelim. 3nm düğümünde öncü bir çip tasarlamak toplamda tahminen **500-800 milyon dolara** mal olur — ve bunun büyük bir kısmı EDA lisansları ve bunları çalıştırmak için gereken işlem gücüdür. Tek bir Synopsys PrimeTime lisansı yılda **100.000-200.000$** tutabilir. Büyük bir tasarım ekibinin akış boyunca 500-1.000 araç lisansına ihtiyacı olabilir. PnR, simülasyon ve doğrulama için hesaplama çiftliği yıllarca gece gündüz çalışan **50.000-100.000 CPU çekirdeğinden** oluşabilir.

Bu maliyet patlaması, yalnızca bir avuç şirketin öncü düzeyde tasarım yapabilmesinin temel nedenlerinden biridir: Apple, Qualcomm, NVIDIA, AMD, MediaTek ve birkaç diğeri. Google, Amazon ve Microsoft bile — trilyon dolarlık şirketler — özel çip projelerine (TPU, Graviton, Maia) tasarım maliyetlerinin tek başına yüz milyonları bulacağını bilerek başladı.

---

## Yarın ne var

Artık koddan silikon planına tüm yolculuğu anlıyorsunuz. Ama çip yapıldıktan sonra ne *yapar*? Yarın **CPU mimarisine** dalıyoruz — boru hatları, önbellekler, dal tahmini ve sıra dışı yürütme yoluyla tek bir çekirdeğin komutları mümkün olduğunca hızlı yürütme sanatı. 3 GHz'lik bir işlemcinin neden saniyede 3 milyar komut yürütmediğini (aslında *daha fazlasını* yapabilir) ve geleceği tahmin etmenin bir CPU'nun yaptığı en önemli şey olduğunu göreceksiniz.

---

<div class="quiz-placeholder" data-quiz-path="quizzes/gun-15.toml"></div>
