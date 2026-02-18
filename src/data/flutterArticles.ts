export type ContentBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "p"; content: string }
  | { type: "code"; content: string; language?: string };

export type ArticleTopic = "Flutter" | "AI";

export interface FlutterArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  topic: ArticleTopic;
  emoji: string;
  content: ContentBlock[];
}

export const flutterArticles: FlutterArticle[] = [
  {
    id: "flutter-nedir",
    topic: "Flutter",
    title: "Flutter Nedir? Neden Tercih Edilir?",
    excerpt: "Flutter'ın ne olduğu, tek kod tabanıyla nasıl mobil ve masaüstü uygulama geliştirdiğinizi öğrenin.",
    category: "Temel",
    emoji: "📱",
    content: [
      { type: "h2", content: "Flutter Nedir?" },
      {
        type: "p",
        content:
          "Flutter, Google'ın geliştirdiği açık kaynaklı bir UI (kullanıcı arayüzü) araç setidir. Tek bir kod tabanıyla iOS, Android, web ve masaüstü uygulamaları yazabilirsiniz. Yani bir kez kod yazarsınız, aynı projeyi telefon, tablet ve bilgisayarda çalıştırırsınız.",
      },
      { type: "h3", content: "Neden Flutter?" },
      {
        type: "p",
        content:
          "React Native veya Xamarin gibi alternatiflerde ekranlar büyük oranda native bileşenlerle çizilir. Flutter ise kendi çizim motorunu (Skia) kullanır. Bu sayede her platformda birebir aynı görünümü elde edersiniz; tasarım tutarlılığı ve hızlı render performansı sağlar.",
      },
      { type: "h3", content: "İlk Flutter Uygulaması" },
      {
        type: "p",
        content: "Yeni bir proje oluşturup çalıştırmak için terminalde:",
      },
      {
        type: "code",
        content: "flutter create benim_uygulamam\ncd benim_uygulamam\nflutter run",
        language: "bash",
      },
      {
        type: "p",
        content:
          "flutter run dediğinizde bağlı cihaz veya emülatörde uygulama açılır. Özetle: Flutter = tek dil (Dart) + tek kod tabanı + her platform.",
      },
    ],
  },
  {
    id: "dart-giris",
    topic: "Flutter",
    title: "Dart Diline Giriş",
    excerpt: "Dart'ın sözdizimi, değişkenler, fonksiyonlar ve sınıflar — Flutter için gerekli temeller.",
    category: "Temel",
    emoji: "🎯",
    content: [
      { type: "h2", content: "Dart Nedir?" },
      {
        type: "p",
        content:
          "Dart, Flutter'ın kullandığı programlama dilidir. C# veya Java'ya benzer; sınıf tabanlı, tip güvenli ve hem derlenip (AOT) hem de yorumlanabilir (JIT). Flutter ile uygulama yazarken tüm iş mantığınızı Dart ile yazarsınız.",
      },
      { type: "h3", content: "Değişkenler ve Tipler" },
      {
        type: "p",
        content:
          "Dart'ta tip yazabilir veya tipi var anahtar sözcüğüyle derleyiciye bırakabilirsiniz. final ve const ile değişmeyen değerler tanımlanır:",
      },
      {
        type: "code",
        content: `// Tip açık
String isim = "Berkay";
int yas = 25;

// Tip çıkarımı (var)
var mesaj = "Merhaba";

// Değişmeyen değerler
final String sabitIsim = "Flutter";
const int maxSayi = 100;`,
        language: "dart",
      },
      { type: "h3", content: "Fonksiyonlar" },
      {
        type: "p",
        content: "Fonksiyonlar tanımlanırken parametre ve dönüş tipi isteğe bağlıdır:",
      },
      {
        type: "code",
        content: `// Klasik fonksiyon
int topla(int a, int b) {
  return a + b;
}

// Kısa (arrow) fonksiyon
int carp(int a, int b) => a * b;

// İsteğe bağlı parametreler
void selamla(String isim, [String unvan = "Değerli"]) {
  print("\$unvan \$isim");
}
selamla("Berkay");        // "Değerli Berkay"
selamla("Berkay", "Mr."); // "Mr. Berkay"`,
        language: "dart",
      },
      { type: "h3", content: "Sınıflar (Classes)" },
      {
        type: "p",
        content: "Flutter'da her şey widget; widget'lar da sınıflardan türer. Basit bir sınıf örneği:",
      },
      {
        type: "code",
        content: `class Kullanici {
  final String ad;
  final int yas;
  
  Kullanici({required this.ad, required this.yas});
  
  void tanit() => print("Ben \$ad, \$yas yaşındayım.");
}

var k = Kullanici(ad: "Berkay", yas: 25);
k.tanit();`,
        language: "dart",
      },
    ],
  },
  {
    id: "widget-agaci",
    topic: "Flutter",
    title: "Widget'lar ve Widget Ağacı",
    excerpt: "Her şey widget'tır: Container, Column, Row ve widget ağacı kavramı.",
    category: "UI",
    emoji: "🌳",
    content: [
      { type: "h2", content: "Widget Nedir?" },
      {
        type: "p",
        content:
          "Flutter'da ekranda gördüğünüz her şey bir widget'tır: buton, metin, resim, liste, sayfa... Widget'lar birbirinin içine yerleştirilerek ağaç yapısı oluşturur. Bu yapıya \"widget tree\" denir.",
      },
      { type: "h3", content: "Temel Yerleşim Widget'ları" },
      {
        type: "p",
        content:
          "Column dikey, Row yatay sıralar. Container ise padding, margin, renk gibi özellikler vermek için kullanılır:",
      },
      {
        type: "code",
        content: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Text("Başlık", style: TextStyle(fontSize: 24)),
    SizedBox(height: 16),
    Row(
      children: [
        ElevatedButton(onPressed: () {}, child: Text("Evet")),
        SizedBox(width: 8),
        OutlinedButton(onPressed: () {}, child: Text("Hayır")),
      ],
    ),
  ],
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "SizedBox boşluk eklemek için idealdir. mainAxisAlignment ve crossAxisAlignment ile elemanların hizasını ayarlarsınız.",
      },
      { type: "h3", content: "StatelessWidget vs StatefulWidget" },
      {
        type: "p",
        content:
          "StatelessWidget: içinde değişen veri yok (örn. sabit metin, statik liste). StatefulWidget: kullanıcı etkileşimi veya veri değişince ekranın güncellenmesi gerekir (örn. sayaç, form). State, değişen veriyi tutar ve setState ile güncelleme tetiklenir.",
      },
    ],
  },
  {
    id: "row-column-layout",
    topic: "Flutter",
    title: "Row, Column ve Layout Bileşenleri Detaylı",
    excerpt: "Row, Column, mainAxis, crossAxis, Expanded, Flexible, Container, SizedBox, Stack, Wrap — hepsi örneklerle.",
    category: "UI",
    emoji: "📐",
    content: [
      { type: "h2", content: "Row — Yatay Sıralama" },
      {
        type: "p",
        content:
          "Row, child'ları soldan sağa tek satırda yan yana dizer. Ana eksen (main axis) yatay, çapraz eksen (cross axis) dikeydir. Sınırlı genişlik yoksa children'ın toplam genişliği kadar yer kaplar; sınırsız alanda ise mümkün olduğunca genişler.",
      },
      {
        type: "code",
        content: `Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween, // start, center, end, spaceBetween, spaceAround, spaceEvenly
  crossAxisAlignment: CrossAxisAlignment.center,    // start, center, end, stretch
  mainAxisSize: MainAxisSize.min,                    // min = sadece child'lar kadar; max = tüm genişlik
  children: [
    Icon(Icons.star),
    Text("Favori"),
    ElevatedButton(onPressed: () {}, child: Text("Ekle")),
  ],
)`,
        language: "dart",
      },
      { type: "h3", content: "Row'da Boyut Sıkıntısı" },
      {
        type: "p",
        content:
          "Row içinde sınırsız genişlik isteyen bir widget (örn. Expanded kullanmayan bir Text with maxLines) varsa \"overflow\" hatası alırsınız. Çözüm: Esnek alan için Expanded veya Flexible kullanmak.",
      },
      { type: "h2", content: "Column — Dikey Sıralama" },
      {
        type: "p",
        content:
          "Column, child'ları yukarıdan aşağıya tek sütunda dizer. Ana eksen dikey, çapraz eksen yataydır. mainAxisAlignment ve crossAxisAlignment aynı mantıkla çalışır; Column'da mainAxis dikey olduğu için spaceBetween dikey boşluğu dağıtır.",
      },
      {
        type: "code",
        content: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.stretch,  // child'lar tam genişlikte
  mainAxisSize: MainAxisSize.max,
  children: [
    Text("Başlık", style: TextStyle(fontSize: 22)),
    SizedBox(height: 12),
    Text("Açıklama metni..."),
  ],
)`,
        language: "dart",
      },
      { type: "h2", content: "Expanded ve Flexible" },
      {
        type: "p",
        content:
          "Row veya Column içinde kalan boş alanı paylaştırmak için Expanded kullanılır. Expanded tek bir child alır ve ona tüm ayrılan alanı verir (flex ile oran belirlenir). Flexible ise child'ın kendi boyutuna göre büyümesine izin verir; fit parametresi ile davranış değişir.",
      },
      {
        type: "code",
        content: `Row(
  children: [
    Expanded(flex: 2, child: Container(color: Colors.blue)),   // 2/3 genişlik
    Expanded(flex: 1, child: Container(color: Colors.green)),    // 1/3 genişlik
  ],
)

// Flexible: child gerekirse küçülebilir (overflow önler)
Row(
  children: [
    Text("Uzun metin buraya gelecek..."),
    Flexible(child: Text("Bu kısım taşmaz, kısaltılır veya satır atar.")),
  ],
)`,
        language: "dart",
      },
      { type: "h2", content: "Container" },
      {
        type: "p",
        content:
          "Container, tek bir child'ı saran ve ona padding, margin, genişlik/yükseklik, renk, kenarlık, gölge verebileceğiniz kutu widget'ıdır. Child yoksa bile kendisi bir \"boş kutu\" olarak boyut alabilir. İç içe kullanarak kart veya buton benzeri alanlar oluşturursunuz.",
      },
      {
        type: "code",
        content: `Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
  width: 200,
  height: 100,
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(color: Colors.black26, blurRadius: 6, offset: Offset(0, 2)),
    ],
  ),
  child: Text("Kart içeriği"),
)`,
        language: "dart",
      },
      { type: "h2", content: "SizedBox ve Spacer" },
      {
        type: "p",
        content:
          "SizedBox sabit genişlik ve/veya yükseklik verir; boşluk bırakmak için SizedBox(height: 16) veya SizedBox(width: 8) sık kullanılır. Child verirseniz o boyuta zorlar. Spacer ise Row/Column içinde kalan alanı \"esnek boşluk\" olarak yer kaplar (Expanded(child: SizedBox()) ile aynı etki).",
      },
      {
        type: "code",
        content: `Row(
  children: [
    Text("Sol"),
    SizedBox(width: 24),
    Spacer(),
    Text("Sağ"),
  ],
)`,
        language: "dart",
      },
      { type: "h2", content: "Stack — Üst Üste Binen Widget'lar" },
      {
        type: "p",
        content:
          "Stack, child'ları birbiri üstüne dizer. İlk child en altta, son child en üstte. alignment ile hepsini hizalayabilir; Positioned ile child'ı köşelere veya belirli konuma sabitleyebilirsiniz (örn. sağ üst köşede badge).",
      },
      {
        type: "code",
        content: `Stack(
  alignment: Alignment.center,
  children: [
    Container(width: 200, height: 200, color: Colors.grey),
    Text("Ortadaki yazı"),
    Positioned(
      top: 8,
      right: 8,
      child: CircleAvatar(backgroundColor: Colors.red, radius: 12),
    ),
  ],
)`,
        language: "dart",
      },
      { type: "h2", content: "Wrap — Taşanları Alt Satıra Al" },
      {
        type: "p",
        content:
          "Row gibi yatay dizer ama alan yetmezse bir sonraki satıra geçer (flexbox wrap gibi). Etiket listesi, filtre chip'leri gibi sayı belli olmayan yatay öğeler için idealdir.",
      },
      {
        type: "code",
        content: `Wrap(
  spacing: 8,
  runSpacing: 8,
  children: [
    Chip(label: Text("Flutter")),
    Chip(label: Text("Dart")),
    Chip(label: Text("Widget")),
    Chip(label: Text("State")),
    Chip(label: Text("BLoC")),
  ],
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Özet: Row/Column ile yönü belirleyin; Expanded/Flexible ile alan paylaştırın; Container ile kutu stilini verin; SizedBox/Spacer ile boşluk ekleyin; Stack ile üst üste, Wrap ile taşanları satıra bölün.",
      },
    ],
  },
  {
    id: "state-yonetimi",
    topic: "Flutter",
    title: "State Yönetimi: BLoC ve Cubit",
    excerpt: "BLoC ve Cubit ile event-driven ve reaktif state yönetimi, örneklerle.",
    category: "State",
    emoji: "🔄",
    content: [
      { type: "h2", content: "State (Durum) Nedir?" },
      {
        type: "p",
        content:
          "State, uygulamanın o anki \"durumu\"dur: kullanıcı adı, sepet sayısı, tema (açık/koyu) gibi. Bu veri değiştiğinde ilgili widget'ların yeniden çizilmesi gerekir. BLoC ve Cubit, bu durumu event/method tabanlı ve test edilebilir şekilde yönetmek için kullanılır.",
      },
      { type: "h3", content: "setState ile Yerel State (Kısa)" },
      {
        type: "p",
        content:
          "Sadece tek bir ekranda kullanılan, basit veri için StatefulWidget içinde setState yeterlidir:",
      },
      {
        type: "code",
        content: `class SayaçSayfasi extends StatefulWidget {
  @override
  State<SayaçSayfasi> createState() => _SayaçSayfasiState();
}

class _SayaçSayfasiState extends State<SayaçSayfasi> {
  int sayac = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Tıklanma: \$sayac"),
        ElevatedButton(
          onPressed: () {
            setState(() => sayac++);
          },
          child: Text("Artır"),
        ),
      ],
    );
  }
}`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "setState içinde state değişince Flutter build metodunu tekrar çalıştırır ve ekran güncellenir.",
      },
      { type: "h3", content: "Provider ile Global State" },
      {
        type: "p",
        content:
          "Birden fazla sayfada veya widget'ta kullanılacak veriyi (örn. giriş yapmış kullanıcı) Provider ile üst seviyede tutar, aşağıdaki widget'lar Provider.of veya context.watch ile dinler:",
      },
      {
        type: "code",
        content: `// Örnek: basit bir CounterProvider
class CounterProvider extends ChangeNotifier {
  int _sayac = 0;
  int get sayac => _sayac;
  void artir() {
    _sayac++;
    notifyListeners();
  }
}

// Üst seviyede sağlama
MaterialApp(
  home: ChangeNotifierProvider(
    create: (_) => CounterProvider(),
    child: AnaSayfa(),
  ),
);

// Kullanım
context.watch<CounterProvider>().sayac;
context.read<CounterProvider>().artir();`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Provider ve Riverpod da yaygın seçeneklerdir; BLoC/Cubit ise event-driven yapı ve net ayrım (iş mantığı / UI) ile öne çıkar.",
      },
      { type: "h2", content: "BLoC Nedir?" },
      {
        type: "p",
        content:
          "BLoC (Business Logic Component), iş mantığını UI'dan ayırmak için kullanılan bir desendir. Kullanıcı veya sistem \"event\" üretir; BLoC bu event'i işleyip yeni \"state\" yayınlar; UI sadece state'i dinleyip ekranı günceller. Böylece widget'lar sadece görüntüden sorumlu kalır, test yazmak kolaylaşır.",
      },
      {
        type: "p",
        content:
          "flutter_bloc paketini pubspec.yaml'a ekleyin (flutter_bloc ve bloc). Üç şey tanımlarsınız: Event (ne oldu?), State (ekranda ne gösterilecek?), Bloc (event → state dönüşümü).",
      },
      {
        type: "code",
        content: `// 1) Event'ler — kullanıcı ne yaptı?
abstract class SayaçEvent {}
class SayaçArttir extends SayaçEvent {}
class SayaçAzalt extends SayaçEvent {}

// 2) State — ekranda gösterilecek veri
class SayaçState {
  final int deger;
  SayaçState(this.deger);
}

// 3) Bloc — event geldiğinde state güncelle
class SayaçBloc extends Bloc<SayaçEvent, SayaçState> {
  SayaçBloc() : super(SayaçState(0)) {
    on<SayaçArttir>((event, emit) => emit(SayaçState(state.deger + 1)));
    on<SayaçAzalt>((event, emit) => emit(SayaçState(state.deger - 1)));
  }
}`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "BlocProvider ile BLoC'u üst seviyede sağlayın; BlocBuilder veya BlocConsumer ile state'i dinleyin. Event göndermek için context.read<SayaçBloc>().add(SayaçArttir()) kullanın.",
      },
      {
        type: "code",
        content: `// Uygulama kökünde
BlocProvider(
  create: (context) => SayaçBloc(),
  child: MaterialApp(home: SayaçEkrani()),
)

// Ekranda kullanım
BlocBuilder<SayaçBloc, SayaçState>(
  builder: (context, state) {
    return Column(
      children: [
        Text("Değer: \${state.deger}"),
        Row(
          children: [
            ElevatedButton(
              onPressed: () => context.read<SayaçBloc>().add(SayaçArttir()),
              child: Text("+"),
            ),
            ElevatedButton(
              onPressed: () => context.read<SayaçBloc>().add(SayaçAzalt()),
              child: Text("-"),
            ),
          ],
        ),
      ],
    );
  },
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "BLoC, özellikle form validasyonu, liste filtreleme, API çağrıları gibi birden fazla adım ve koşul içeren senaryolarda faydalıdır. Async işlemlerde BlocBuilder yerine BlocConsumer kullanarak loading ve error durumlarını da tek yerde yönetebilirsiniz.",
      },
      { type: "h2", content: "Cubit Nedir?" },
      {
        type: "p",
        content:
          "Cubit, BLoC'ın sadeleştirilmiş halidir. Event sınıfları yoktur; doğrudan Cubit içinde metod çağırırsınız, metod içinde emit(state) ile yeni state yayınlarsınız. Daha az boilerplate, daha basit senaryolar için idealdir. Aynı flutter_bloc paketinde gelir.",
      },
      {
        type: "code",
        content: `// State aynı kalabilir
class SayaçState {
  final int deger;
  SayaçState(this.deger);
}

// Cubit: Event yerine metodlar
class SayaçCubit extends Cubit<SayaçState> {
  SayaçCubit() : super(SayaçState(0));

  void artir() => emit(SayaçState(state.deger + 1));
  void azalt() => emit(SayaçState(state.deger - 1));
}`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "UI tarafında BlocProvider yerine BlocProvider<Cubit> kullanırsınız; dinleme aynıdır: BlocBuilder<SayaçCubit, SayaçState>. Event göndermek yerine context.read<SayaçCubit>().artir() çağırırsınız.",
      },
      {
        type: "code",
        content: `BlocProvider(
  create: (context) => SayaçCubit(),
  child: ...,
)

// Kullanım
BlocBuilder<SayaçCubit, SayaçState>(
  builder: (context, state) => Text("\${state.deger}"),
)
// Tetiklemek için:
context.read<SayaçCubit>().artir();`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Özet: Karmaşık event tipleri ve trace edilmesi gereken kullanıcı aksiyonları için BLoC; daha basit, metod odaklı güncellemeler için Cubit kullanın. İkisi de aynı pakette ve test etmesi kolaydır.",
      },
    ],
  },
  {
    id: "layout-responsive",
    topic: "Flutter",
    title: "Layout ve Responsive Tasarım",
    excerpt: "Farklı ekran boyutlarına uyum: LayoutBuilder, MediaQuery ve breakpoint kullanımı.",
    category: "UI",
    emoji: "📐",
    content: [
      { type: "h2", content: "Neden Responsive?" },
      {
        type: "p",
        content:
          "Uygulama hem küçük telefonlarda hem tabletlerde hem de masaüstünde açılabiliyor. Aynı sayfada bazen tek sütun, bazen iki sütun veya farklı padding değerleri isteriz. Bunu Flutter'da MediaQuery ve LayoutBuilder ile yaparız.",
      },
      { type: "h3", content: "MediaQuery ile Ekran Bilgisi" },
      {
        type: "code",
        content: `// Ekran genişliği ve yüksekliği
final genislik = MediaQuery.of(context).size.width;
final yukseklik = MediaQuery.of(context).size.height;

// Kısa yol
final ekranGenis = MediaQuery.sizeOf(context).width;

// Tablet mi telefon mu?
final tabletMi = ekranGenis > 600;`,
        language: "dart",
      },
      { type: "h3", content: "LayoutBuilder ile Koşullu Yerleşim" },
      {
        type: "p",
        content:
          "LayoutBuilder, üst widget'ın verdiği kısıtlamalara (constraints) göre farklı widget döndürmenizi sağlar:",
      },
      {
        type: "code",
        content: `LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return Row(
        children: [
          Expanded(child: SolPanel()),
          Expanded(child: SagIcerik()),
        ],
      );
    }
    return Column(
      children: [
        SolPanel(),
        SagIcerik(),
      ],
    );
  },
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Böylece dar ekranda tek sütun, geniş ekranda iki sütun gösterebilirsiniz. Breakpoint değerlerini (örn. 600, 900) projenize göre sabitler veya bir constants dosyasında toplarsınız.",
      },
    ],
  },
  {
    id: "navigasyon",
    topic: "Flutter",
    title: "Navigasyon: Sayfalar Arası Geçiş",
    excerpt: "Navigator.push, pop, named routes ve sonuç döndürme.",
    category: "UI",
    emoji: "🧭",
    content: [
      { type: "h2", content: "Temel Navigasyon" },
      {
        type: "p",
        content:
          "Flutter'da sayfa geçişleri Navigator sınıfıyla yapılır. push ile yeni sayfa açılır, pop ile geri dönülür. Stack yapısı sayesinde her sayfa üst üste eklenir.",
      },
      { type: "h3", content: "Push ve Pop" },
      {
        type: "code",
        content: `// Yeni sayfaya git
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetaySayfasi()),
);

// Geri dön (bir önceki sayfaya)
Navigator.pop(context);

// Sonuç ile geri dön
Navigator.pop(context, "Kaydedildi");

// Açan sayfada sonucu almak
final sonuc = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecimSayfasi()),
);
if (sonuc != null) print("Seçilen: \$sonuc");`,
        language: "dart",
      },
      { type: "h3", content: "Named Routes (İsimli Rotalar)" },
      {
        type: "p",
        content:
          "Route isimleri tanımlayıp routes map'i MaterialApp'e verirseniz, Navigator.pushNamed(context, '/detay') gibi kullanabilirsiniz. Argüman geçmek için settings.arguments veya GoRouter / AutoRoute gibi paketler kullanılır.",
      },
    ],
  },
  {
    id: "api-veri",
    topic: "Flutter",
    title: "API'den Veri Çekme ve Gösterme",
    excerpt: "http paketi, Future, async/await ve loading/hata durumları.",
    category: "Veri",
    emoji: "🌐",
    content: [
      { type: "h2", content: "HTTP İstekleri" },
      {
        type: "p",
        content:
          "Uygulama dışındaki veriyi (API, REST) almak için genelde http veya dio paketi kullanılır. İstekler asenkron olduğu için Future ve async/await kavramlarına ihtiyaç vardır.",
      },
      { type: "h3", content: "Basit GET İsteği" },
      {
        type: "code",
        content: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<Map>> kullanicilariGetir() async {
  final uri = Uri.parse('https://api.ornek.com/users');
  final response = await http.get(uri);
  
  if (response.statusCode == 200) {
    final liste = jsonDecode(response.body) as List;
    return liste.map((e) => e as Map).toList();
  }
  throw Exception('Veri alınamadı');
}`,
        language: "dart",
      },
      { type: "h3", content: "Ekranda Gösterme: FutureBuilder" },
      {
        type: "p",
        content:
          "Veri gelecekte hazır olacağı için FutureBuilder kullanırız. ConnectionState.waiting, .done ve hata durumunu ayrı ayrı ele alırız:",
      },
      {
        type: "code",
        content: `FutureBuilder<List<Map>>(
  future: kullanicilariGetir(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Text("Hata: \${snapshot.error}");
    }
    final liste = snapshot.data ?? [];
    return ListView.builder(
      itemCount: liste.length,
      itemBuilder: (context, i) => ListTile(
        title: Text(liste[i]["name"]?.toString() ?? ""),
      ),
    );
  },
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Gerçek projelerde state management (Provider/Riverpod) veya veri katmanı (Repository) ile bu Future'ı tek yerde yönetip widget'ı sadece dinleyici yapmak daha temiz olur.",
      },
    ],
  },
  {
    id: "form-validasyon",
    topic: "Flutter",
    title: "Formlar ve Validasyon",
    excerpt: "TextFormField, Form, validator ve kullanıcı girdisini doğrulama.",
    category: "UI",
    emoji: "📝",
    content: [
      { type: "h2", content: "Form ve GlobalKey" },
      {
        type: "p",
        content:
          "Birden fazla alanı tek seferde doğrulamak ve kaydetmek için Form widget'ı kullanılır. Form'un state'ine erişmek için GlobalKey<FormState> verilir; save veya validate bu key üzerinden çağrılır.",
      },
      { type: "h3", content: "Örnek: Giriş Formu" },
      {
        type: "code",
        content: `final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(labelText: "E-posta"),
        validator: (value) {
          if (value == null || value.isEmpty) return "Boş bırakılamaz.";
          if (!value.contains("@")) return "Geçerli e-posta girin.";
          return null;
        },
        onSaved: (value) => _email = value,
      ),
      TextFormField(
        decoration: InputDecoration(labelText: "Şifre"),
        obscureText: true,
        validator: (value) {
          if (value == null || value.length < 6) return "En az 6 karakter.";
          return null;
        },
        onSaved: (value) => _sifre = value,
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState?.validate() ?? false) {
            _formKey.currentState!.save();
            // _email ve _sifre ile giriş yap
          }
        },
        child: Text("Giriş"),
      ),
    ],
  ),
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "validator null döndürürse alan geçerli sayılır; string döndürürse o mesaj hata olarak gösterilir. save(), tüm onSaved callback'lerini tetikler.",
      },
    ],
  },
  {
    id: "animasyonlar",
    topic: "Flutter",
    title: "Animasyonlar",
    excerpt: "AnimationController, Tween ve basit animasyon örnekleri.",
    category: "UI",
    emoji: "✨",
    content: [
      { type: "h2", content: "Flutter'da Animasyon" },
      {
        type: "p",
        content:
          "Animasyonlar sayesinde geçişler ve etkileşimler daha akıcı hissettirir. Flutter'da AnimationController zamanı yönetir, Tween başlangıç-bitiş değerlerini tanımlar. Genelde StatefulWidget + TickerProviderStateMixin kullanılır.",
      },
      { type: "h3", content: "Basit Fade/Slide Örneği" },
      {
        type: "code",
        content: `class AnimasyonluKutu extends StatefulWidget {
  @override
  State<AnimasyonluKutu> createState() => _AnimasyonluKutuState();
}

class _AnimasyonluKutuState extends State<AnimasyonluKutu>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;
  late Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _opacity = Tween<double>(begin: 0, end: 1).animate(_controller);
    _slide = Tween<Offset>(
      begin: Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _opacity,
      child: SlideTransition(
        position: _slide,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    );
  }
}
// Başlatmak için: _controller.forward();`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Implicit animasyonlar (AnimatedContainer, AnimatedOpacity) basit durum değişimleri için kod yazmadan kullanılabilir. Daha karmaşık senaryolarda explicit AnimationController tercih edilir.",
      },
    ],
  },
  {
    id: "paketler-pub",
    topic: "Flutter",
    title: "Paketler ve pub.dev",
    excerpt: "pubspec.yaml, paket ekleme ve yaygın paketler.",
    category: "Temel",
    emoji: "📦",
    content: [
      { type: "h2", content: "Paket Sistemi" },
      {
        type: "p",
        content:
          "Flutter ve Dart ekosisteminde hazır kütüphaneler pub.dev üzerinden yayınlanır. Projede kullanmak için pubspec.yaml dosyasına dependency eklenir, sonra flutter pub get çalıştırılır.",
      },
      { type: "h3", content: "pubspec.yaml Örneği" },
      {
        type: "code",
        content: `name: benim_uygulamam
description: Örnek Flutter uygulaması.
publish_to: 'none'
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  provider: ^6.1.1
  shared_preferences: ^2.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0`,
        language: "yaml",
      },
      { type: "h3", content: "Yaygın Paketler" },
      {
        type: "p",
        content:
          "http / dio: API istekleri. provider / riverpod: state management. shared_preferences: basit yerel ayar. hive / sqflite: yerel veritabanı. cached_network_image: resim önbellekleme. go_router: gelişmiş routing. Bu paketleri pub.dev'de arayıp projenize ekleyebilirsiniz.",
      },
    ],
  },
  {
    id: "listview-builder",
    topic: "Flutter",
    title: "ListView ve ListView.builder",
    excerpt: "Liste göstermek için ListView, uzun listelerde performans için builder kullanımı.",
    category: "UI",
    emoji: "📋",
    content: [
      { type: "h2", content: "ListView Nedir?" },
      {
        type: "p",
        content:
          "Liste halinde öğe göstermek için ListView kullanılır. children ile az sayıda widget verirseniz hepsi bir anda oluşturulur. Çok sayıda satır varsa ListView.builder kullanın; sadece ekranda görünen öğeler üretilir, kaydırdıkça yenileri eklenir (lazy loading).",
      },
      { type: "h3", content: "ListView.builder Örneği" },
      {
        type: "code",
        content: `ListView.builder(
  itemCount: urunler.length,
  itemBuilder: (context, index) {
    final urun = urunler[index];
    return ListTile(
      leading: CircleAvatar(backgroundImage: NetworkImage(urun.resimUrl)),
      title: Text(urun.ad),
      subtitle: Text(urun.fiyat.toString()),
      onTap: () => Navigator.push(context, ...),
    );
  },
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "itemCount vermezseniz liste sonsuz kabul edilir. ListView.separated ile itemBuilder yanında separatorBuilder verip satırlar arası çizgi veya boşluk ekleyebilirsiniz.",
      },
    ],
  },
  {
    id: "theme-renkler",
    topic: "Flutter",
    title: "Theme ve Renkler",
    excerpt: "MaterialApp theme, ThemeData ve tutarlı renk/font kullanımı.",
    category: "UI",
    emoji: "🎨",
    content: [
      { type: "h2", content: "ThemeData ile Tema" },
      {
        type: "p",
        content:
          "Tüm uygulama boyunca aynı renk ve yazı stilini kullanmak için MaterialApp içinde theme ve darkTheme verin. Böylece ElevatedButton, AppBar, TextField gibi widget'lar otomatik bu temayı kullanır.",
      },
      { type: "h3", content: "Örnek" },
      {
        type: "code",
        content: `MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
    useMaterial3: true,
    textTheme: TextTheme(
      headlineMedium: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
    ),
  ),
  darkTheme: ThemeData.dark(useMaterial3: true),
  themeMode: ThemeMode.system, // sistem temasına uyum
  home: AnaSayfa(),
)`,
        language: "dart",
      },
      {
        type: "p",
        content:
          "Theme.of(context) ile mevcut temaya erişirsiniz. Örneğin Theme.of(context).colorScheme.primary veya textTheme.bodyLarge. Böylece koyu/açık moda göre otomatik uyum sağlar.",
      },
    ],
  },
  {
    id: "flutter-debug",
    topic: "Flutter",
    title: "Hata Ayıklama (Debug) ve DevTools",
    excerpt: "print, debugPrint, breakpoint ve Flutter DevTools ile sorun giderme.",
    category: "Temel",
    emoji: "🔧",
    content: [
      { type: "h2", content: "Basit Loglama" },
      {
        type: "p",
        content:
          "Kodun bir yerinde değerin ne olduğunu görmek için print() kullanabilirsiniz. Çıktı konsola (terminal veya IDE debug console) yazılır. debugPrint() ise uzun metinleri bölerek yazar; aşırı logda performansı daha az etkiler.",
      },
      { type: "h3", content: "Breakpoint (Durak Noktası)" },
      {
        type: "p",
        content:
          "IDE'de satır numarasının soluna tıklayarak breakpoint koyun. Uygulamayı Run > Debug ile başlatın. O satıra gelindiğinde uygulama durur; değişkenleri inceleyebilir, adım adım ilerleyebilirsiniz.",
      },
      { type: "h3", content: "Flutter DevTools" },
      {
        type: "p",
        content:
          "flutter run ile çalıştırırken konsolda çıkan linke tıklayarak veya VS Code/Android Studio'dan DevTools'u açın. Widget ağacını inceleyebilir, performans profili alabilir, network isteklerini görebilirsiniz. Özellikle layout hatalarında \"overflow\" gibi mesajlar için widget inspector çok işe yarar.",
      },
    ],
  },
  // --- AI yazıları ---
  {
    id: "ai-nedir-llm",
    topic: "AI",
    title: "Yapay Zeka Nedir? LLM ve ChatGPT",
    excerpt: "Yapay zeka, büyük dil modelleri ve günlük hayatta kullandığımız AI araçları.",
    category: "Temel",
    emoji: "🤖",
    content: [
      { type: "h2", content: "Yapay Zeka (AI) Nedir?" },
      {
        type: "p",
        content:
          "Yapay zeka, makinelerin insan benzeri karar verme, öğrenme ve problem çözme yeteneklerini ifade eder. Dar anlamda belirli bir görevi (resim tanıma, metin üretme, çeviri) yapan modeller; genel anlamda ise insan gibi birçok alanda akıl yürüten sistemler kastedilir.",
      },
      { type: "h3", content: "Büyük Dil Modelleri (LLM)" },
      {
        type: "p",
        content:
          "LLM (Large Language Model), çok büyük metin verisiyle eğitilmiş yapay zeka modelleridir. Bir cümle veya soru verdiğinizde, öğrendiği kalıplara göre devamını veya cevabını üretir. ChatGPT, Claude, Gemini bu tür modellere dayalı sohbet arayüzleridir.",
      },
      { type: "h3", content: "Ne İşe Yarar?" },
      {
        type: "p",
        content:
          "Kod yazma, metin özetleme, çeviri, fikir üretme, sınav sorularına cevap, basit mantık ve matematik. Doğruluk her zaman garanti değildir; özellikle güncel olaylar veya nicel hesaplar için sonucu kontrol etmek gerekir.",
      },
    ],
  },
  {
    id: "prompt-muhendisligi",
    topic: "AI",
    title: "Prompt Mühendisliği",
    excerpt: "AI'a nasıl talimat veririz? Net ve etkili prompt yazma ipuçları.",
    category: "Pratik",
    emoji: "✍️",
    content: [
      { type: "h2", content: "Prompt Nedir?" },
      {
        type: "p",
        content:
          "Prompt, modele verdiğiniz giriş metnidir. \"Bana bir şiir yaz\" da bir prompttur, \"Aşağıdaki JSON'da sadece email alanlarını çıkar, Python listesi olarak ver\" de. Sonuçların kalitesi çoğu zaman promptun ne kadar net ve bağlamlı olduğuna bağlıdır.",
      },
      { type: "h3", content: "İpuçları" },
      {
        type: "p",
        content:
          "Rol verin: \"Sen deneyimli bir React geliştiricisisin.\" Görevi net yazın: \"Bu API yanıtını TypeScript interface'e dönüştür.\" Örnek verin: Bir iki örnek giriş-çıkış göstermek (few-shot) modeli doğru formata yönlendirir. Kısıtları belirtin: \"Sadece 3 madde yaz\", \"Türkçe cevap ver.\"",
      },
      { type: "h3", content: "Örnek Prompt" },
      {
        type: "code",
        content: `Sen bir Flutter geliştiricisisin. Aşağıdaki JSON listesini kullanarak 
ListView.builder ile gösterilecek bir widget örneği yaz. 
Sadece Dart kodu ver, açıklama ekleme.`,
        language: "text",
      },
    ],
  },
  {
    id: "ai-ile-kod",
    topic: "AI",
    title: "AI ile Kod Yazmak",
    excerpt: "ChatGPT, Cursor, Copilot gibi araçlarla kod üretirken dikkat edilecekler.",
    category: "Pratik",
    emoji: "💻",
    content: [
      { type: "h2", content: "AI Kod Asistanları" },
      {
        type: "p",
        content:
          "ChatGPT veya Claude'a \"şu özelliği Flutter'da yaz\" diyebilirsiniz; Cursor, GitHub Copilot ise editör içinde satır satır veya blok blok öneri üretir. Hızlı prototip ve tekrarlayan işlerde zaman kazandırır.",
      },
      { type: "h3", content: "Nasıl Verimli Kullanılır?" },
      {
        type: "p",
        content:
          "Görevi parçalayın: \"Tüm uygulamayı yaz\" yerine \"Bu ekranda şu formu göster, validasyon şöyle olsun\" deyin. Dil ve frameworkü belirtin. Üretilen kodu çalıştırıp test edin; bazen API veya paket isimleri güncel olmayabilir. Gizlilik ve güvenlik: Şirket kodu veya şifreleri prompta yapıştırmayın.",
      },
      { type: "h3", content: "Sınırlar" },
      {
        type: "p",
        content:
          "Model bazen eski sürüm sözdizimi veya yanlış paket kullanır. Sonucu anlayıp düzeltmek sizin sorumluluğunuzdadır. Büyük mimari kararları yine insan vermelidir; AI yardımcı olur, yerinize geçmez.",
      },
    ],
  },
  {
    id: "makine-ogrenmesi-temel",
    topic: "AI",
    title: "Makine Öğrenmesi Temelleri",
    excerpt: "Veri, model, eğitim ve tahmin — ML kavramlarına giriş.",
    category: "Temel",
    emoji: "📊",
    content: [
      { type: "h2", content: "Makine Öğrenmesi (ML) Nedir?" },
      {
        type: "p",
        content:
          "Bilgisayarın, açıkça programlamadan veriden öğrenerek bir görevi (sınıflandırma, tahmin, gruplama) yapmasıdır. Örneğin binlerce kedi-köpek fotoğrafıyla eğitilen model, yeni bir fotoğrafı \"kedi\" veya \"köpek\" diye etiketleyebilir.",
      },
      { type: "h3", content: "Temel Kavramlar" },
      {
        type: "p",
        content:
          "Veri: Eğitim için kullandığımız giriş-çıkış çiftleri. Model: Öğrenilen parametreler (ağırlıklar). Eğitim: Veriyi kullanarak bu parametreleri güncelleme (gradient descent vb.). Tahmin: Eğitilmiş modeli yeni veriye uygulayıp sonuç üretme.",
      },
      { type: "h3", content: "LLM ile Fark" },
      {
        type: "p",
        content:
          "LLM'ler de bir tür makine öğrenmesi modelidir; özellikle metin üretimi için eğitilmiş, çok büyük parametreli yapılardır. Klasik ML daha küçük veri ve daha dar görevler (örn. sadece sınıflandırma) için de kullanılır.",
      },
    ],
  },
];
