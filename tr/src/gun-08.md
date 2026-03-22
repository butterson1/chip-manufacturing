# Gün 8: EUV Litografisi
## İnsanoğlunun Yaptığı En Karmaşık Makine

Dün fabın içinden geçtik — çiplerin doğduğu 20 milyar dolarlık temiz oda katedrali. Virüsten küçük detaylar basan 380 milyon dolarlık bir makineyle bitirmiştik. Bugün o makineyle tanışıyoruz: ASML NXE ve EXE serisi aşırı morötesi (EUV) litografi tarayıcıları. Bu kurstan yalnızca bir teknoloji hatırlayacaksanız, bu olsun. EUV, makul her ölçüte göre insanlığın bir araya getirdiği en karmaşık mühendislik parçasıdır.

Bu abartı değil. Tek bir EUV tarayıcısı, onlarca ülkede yüzlerce uzman tedarikçiden sağlanan yaklaşık **100.000 ayrı parça** içerir. Yaklaşık 180 metrik ton ağırlığındadır — kabaca bir Boeing 747 kadar — ama dahili optiklerini 0,1 nanometreden az, yani tek bir hidrojen atomu çapı kadar hassasiyetle konumlandırmalıdır. 40 yük konteynerinde sevk edilir ve kurulup kalibre edilmesi altı ay sürer. Ve Veldhoven, Hollanda merkezli ASML bunları üreten *yeryüzündeki tek tedarikçidir*. Önde gelen tedarikçilerden biri değil — **tek** olan.

## Neden EUV? Çözünürlük Sorunu

Yarı iletken endüstrisinin neden yaklaşık üç on yıl ve tahminen 10-15 milyar dolar harcayarak EUV geliştirdiğini anlamak için, 3. Günden temel bir limiti tekrar ziyaret etmeliyiz: **Rayleigh kriteri**. En küçük basılabilir detay, kabaca kullanılan ışığın dalga boyuyla orantılıdır.

On yıllar boyunca endüstri 193 nanometre dalga boyundaki derin morötesi (DUV) ışığı kullandı. Kahramanca mühendislik — daldırma litografisi, çoklu desenleme — ile 193nm DUV'u kimsenin mümkün görmediğinin çok ötesine uzattılar. TSMC'nin 2018'de çıkan 7nm düğümü hâlâ dörtlü desenlemeyle 193nm DUV kullanılarak üretiliyordu. Yani tek bir katman basmak için plaka litografi-aşındırma döngüsünden **dört kez** geçmeliydi.

5nm'de en sıkı metal katmanlar için beşli hatta altılı desenlemeye ihtiyaç duyulacaktı — verimi düşüren ve maliyetleri tırmandıran lojistik bir kabus. Endüstri daha kısa bir dalga boyuna ihtiyaç duyuyordu.

EUV **13,5 nanometrede** çalışır — DUV'un 193nm'sinden yaklaşık 14 kat daha kısa. Tek bir EUV pozlamasıyla, dört veya daha fazla DUV geçişi gerektirecek desenleri basabilirsiniz. Temel değer önerisi budur. Ama "13,5nm ışık iyi olurdu"dan "günde 200 plaka basan çalışan bir makine"ye gelmek, neredeyse tüm endüstriyi kıran bir fizik sorunları çağlayanını çözmeyi gerektirdi.

## Işığı Üretmek: Kalay Damlacıkları ve Bir Lazer Topu

İlk sorun: 13,5nm ışığa *hiçbir şey* geçirgen değildir. Cam değil. Kuvars değil. Hava değil. Bu dalga boyunda fotonlar o kadar enerjiktir ki havanın kendisi de dahil hemen hemen her malzeme tarafından emilir. Mercek kullanamazsınız çünkü ışık asla içlerinden geçmez. Tüm optik yol **neredeyse mükemmel bir vakumda** çalışmalıdır.

Peki EUV ışığını nasıl *üretirsiniz*? ASML ve ışık kaynağı ortağı **Trumpf**'un (Alman endüstriyel lazer şirketi) çözümü görkemli derecede şiddetlidir: erimiş kalayı absürt derecede güçlü bir CO₂ lazeriyle buharlaştırırsınız.

Süreç şöyle çalışır. Bir kalay damlacık üreteci, her biri yaklaşık **25 mikrometre çapında**, saniyede **50.000 damlacık** hızında küçük erimiş kalay damlacıkları ateşler. Her damlacık odak noktasına ulaştığında, önce düşük güçlü bir **ön darbe** lazeri onu düzleştirip yüzey alanını artıran ince bir gözleme şekline getirir. Ardından yaklaşık bir mikrosaniye sonra, Trumpf'un ürettiği **25 kilovat**lık ana CO₂ lazeri — var olan en güçlü endüstriyel lazerlerden biri — düzleştirilmiş kalay hedefine çarpar.

Enerji o kadar yoğundur ki kalay yaklaşık **500.000°C**'ye — Güneş yüzeyinden yaklaşık 40 kat daha sıcak — ısıtılır ve geniş bir dalga boyu spektrumunda fotonlar yayan bir **plazma** oluşturur. 13,5nm EUV fotonları toplam çıktının yalnızca bir kesridir: lazer gücünden kullanılabilir EUV ışığına **dönüşüm verimliliği** sadece yaklaşık **%5-6**'dır.

Bu, 25kW CO₂ lazerin sonuçta yalnızca yaklaşık 250-400 vat kullanılabilir EUV ışığı ürettiği anlamına gelir — ve optik sistem kayıplarından sonra plakaya kabaca **200-250 vat** ulaşır. İlk prototipler 2000'lerde zar zor 10 vat üretiyordu. Her güç ikiye katlaması çok yıllık bir mühendislik mücadelesiydi.

## Optik: Atomik Düzeyde Pürüzsüz Aynalar

Mercekler 13,5nm'de işe yaramadığından, EUV sistemleri **yansıtıcı optik** — aynalar — kullanır. Ama sıradan aynalar değil. EUV aynaları **çok katmanlı kaplamalar** kullanır: her çifti tam 6,9 nanometre kalınlığında, yaklaşık **40-50 çift katman** derinliğinde yığılmış alternatif molibden ve silikon katmanları. Bu yapı, Bragg yansıtıcı olarak işlev görür.

Bu hilelerle bile her ayna gelen EUV ışığının yalnızca yaklaşık **%67-70**'ini yansıtır. Bir EUV tarayıcısının optik kolonu maske ile plaka arasında **altı ayna** içerir. Her ayna %67 yansıtırsa, seri altı ayna yalnızca 0,67⁶ ≈ **%9** geçirir. Toplam optik iletim kaynaktan plakaya kabaca **%2-4**'tür. Kaynak gücünün bu kadar çaresizce önemli olmasının nedeni budur — ışığınızın %96-98'ini gitmesi gereken yere ulaştırırken kaybediyorsunuz.

Bu aynalar Almanya Oberkochen'deki **Carl Zeiss SMT** tarafından üretilir. Gereken yüzey kalitesi neredeyse kavranılamaz. RMS yüzey pürüzlülüğü **0,05 nanometreden** az olmalıdır — bu yaklaşık **bir silikon atomunun çapının dörtte biri**. Zeiss şöyle tanımlamıştır: aynalarından birini Almanya boyutuna (yaklaşık 900 km) büyütseniz, yüzeydeki en büyük çıkıntı **0,1 milimetreden** az yükseklikte olurdu.

## Maske (Retikl): Saydam Şablonlar Artık Yok

13,5nm ışık hiçbir şeyden geçmediğinden, EUV maskeleri de **yansıtıcı** olmalıdır. Aynı Mo/Si çok katmanlı Bragg yansıtıcı ile kaplanmış ultra düşük termal genleşme alt tabandan oluşur. Devre deseni, yansıtıcı kaplamanın üzerine biriktirilen bir **soğurucu katman** (genellikle tantal bazlı bileşikler) ile oluşturulur. Tek bir EUV maske boşluğu, herhangi bir desen yazılmadan önce **50.000-100.000 dolara** mal olabilir.

## Tarayıcı: Saatte 90 Milde Kaos Yönetimi

Maske ve plaka, pozlama yarığı boyunca senkronize bir çift platform sistemiyle **ters yönlerde** hareket eder. Maske saniyede yaklaşık **2 metre**, plaka platformu ise yaklaşık **0,6 m/s** hızda ilerler (optik 4× küçültme oranına sahip olduğundan).

**Plaka platformu** bir mekatronik harikadır. Manyetik kaldırma kullanır — plaka tutucu sıfır mekanik temasla manyetik yataklar üzerinde süzülür. Platform bindirme doğruluğu — her yeni katmanın öncekiyle ne kadar iyi hizalandığı — ASML'nin NXE:3800E sisteminde şu an **1,5 nanometrenin** altındadır. Yaklaşık beş silikon atomu.

**Verimlilik** diğer kritik metriktir. NXE:3800E saatte yaklaşık **220 plaka** başarır — yani her 300mm plaka yaklaşık 16 saniyede tamamen pozlanır.

## Fiyat Etiketi ve Tekel

Bir NXE:3800E yaklaşık **380-410 milyon dolar**. Yeni nesil Yüksek-NA EXE:5200 yaklaşık **350 milyon euro** birim başına. En ileri bir fab **15-20 EUV tarayıcı** gerektirir, yani sadece litografi araçları fabın toplam yatırımının 6-8 milyar dolarını temsil eder.

ASML'nin tekeli salt ticari değildir — fiziğin ve tedarik zinciri karmaşıklığının bir ürünüdür. CO₂ lazeri Almanya'daki **Trumpf**'tan, aynalar Almanya'daki **Zeiss**'tan, maske denetim araçları Japonya'daki **Lasertec**'ten, fotorezistler Japonya'daki **JSR**, **Tokyo Ohka Kogyo** ve **Shin-Etsu**'dan gelir. Tek bir ülke tam yığını kopyalayamaz — bu nedenle EUV jeopolitik bir boğaz noktası haline gelmiştir: Hollanda hükümeti 2023'te ABD baskısıyla ASML'nin Çin'e EUV ihracatını kısıtladığında, Çin'in yaklaşık 7nm düğümün ötesinde çip üretme kapasitesini fiilen sınırladı.

## Yüksek-NA: Sonraki Bölüm

Mevcut NXE sistemleri **0,33** sayısal açıklık kullanır. Bu, basılabilir minimum yarım adımı kabaca 13nm ile sınırlar. ASML'nin cevabı, sayısal açıklığı **0,55**'e çıkaran **Yüksek-NA EUV** — EXE serisi. Bu, 0,33 → 0,55 gibi mütevazı görünür, ama devasa bir mühendislik revizyonudur. Zeiss yeni anamorfik (X ve Y'de farklı büyütme: bir eksende 4×, diğerinde 8×) optik kolonu geliştirmek için on yılı aşkın süre harcadı.

Yüksek-NA EUV, tek pozlamayla yaklaşık **8nm yarım adıma** kadar detay basabilir — endüstriye en az iki-üç düğüm nesli daha ölçekleme pisti kazandırır. Intel ilk EXE:5000'i 2023 sonlarında Oregon Ar-Ge fabına kurarak Intel 14A düğümü (~2026-2027) geliştirmesi için hazırladı.

## Akıl Almaz Sayılar

Bir EUV tarayıcısının içinde 7/24 neler olduğunu takdir edelim:

- Saniyede **50.000** kalay damlacığı ateşlenir, ön darbe ile vurulur, 25kW CO₂ lazeriyle buharlaştırılır ve 500.000°C'de plazma oluşturulur
- Plazma, atom-altı pürüzsüzlüğe parlatılmış 6+ aynadan seken **13,5nm fotonlar** yayar
- Fotonlar bir **vakum odasından** geçer ve üretimi 300.000-500.000 dolara mal olan bir maskeden yansır
- Desen, manyetik kaldırmalı platformlar tarafından **1,5 nanometre** dahilinde konumlandırılan, 0,6 m/s hızda hareket eden plakaya yansıtılır
- Bu saatte **220 kez** gerçekleşir
- Makinenin tamamı yaklaşık **1,2 megavat** güç çeker — yaklaşık 1.000 eve yetecek kadar
- Ve makine **380 milyon dolara** — kabaca bir Boeing 787 Dreamliner fiyatına — mal olur

20. yüzyılın ikonik makinesi Saturn V roketiyse, 21. yüzyılınki muhtemelen EUV tarayıcısıdır.

## Sonrasında Ne Var?

13,5nm'de EUV yolun sonu değil. Araştırmacılar daha kısa dalga boylarında **BEUV (EUV Ötesi)** — muhtemelen 6.x nm — araştırıyor. Ama bu muhtemelen on yıllar sonra. Daha acil yol, Yüksek-NA EUV'dan son damla çözünürlüğü sıkmak ve en sıkı katmanlar için EUV çift desenlemeyle birleştirmektir.

---

{{#quiz quizzes/gun-08.toml}}
