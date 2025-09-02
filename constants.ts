import { GeminiResponse, IslamicQuote, DailyChallenge, Story } from './types';

export const INITIAL_EXAMPLES: { [key: string]: GeminiResponse } = {
  "Sialan": {
    "definition": "Kata umpatan yang digunakan untuk menyatakan kekesalan, kemarahan, atau kekecewaan terhadap seseorang atau suatu keadaan yang dianggap membawa nasib buruk.",
    "category": "Ekspresi Kekecewaan/Frustrasi",
    "alternatives": [
      { "expression": "Astaghfirullah", "context": "Saat menyadari kesalahan atau menghadapi hal yang tidak diinginkan." },
      { "expression": "Haduh", "context": "Menunjukkan frustrasi ringan atau keluhan." },
      { "expression": "Qadarullah", "context": "Menerima takdir Allah saat menghadapi kesulitan." },
      { "expression": "Sabar...", "context": "Untuk menenangkan diri sendiri saat menghadapi kesulitan." },
      { "expression": "Ya ampun", "context": "Ekspresi kekecewaan ringan." }
    ],
    "advice": "Dalam Islam, mengutuk nasib atau keadaan tidak dianjurkan. Sebaiknya kita bersabar (sabr) dan berprasangka baik (husnuzan) kepada Allah, karena setiap kejadian pasti ada hikmahnya."
  },
  "Bego/Bodoh": {
    "definition": "Kata sifat yang digunakan untuk menghina atau merendahkan kecerdasan seseorang, menunjukkan kurangnya kemampuan berpikir atau pemahaman.",
    "category": "Penghinaan/Merendahkan",
    "alternatives": [
      { "expression": "Mari kita diskusikan lagi", "context": "Mengajak untuk refleksi dan mencari solusi bersama." },
      { "expression": "Masih perlu belajar", "context": "Saat mengomentari kesalahan diri sendiri atau orang lain dengan lembut." },
      { "expression": "Sepertinya saya belum paham", "context": "Ketika menanggapi kekeliruan atau ketidakmengertian." },
      { "expression": "Semoga Allah beri pemahaman", "context": "Mendoakan kebaikan saat melihat kekurangan ilmu pada diri sendiri atau orang lain." }
    ],
    "advice": "Menghina ciptaan Allah adalah perbuatan tercela. Rasulullah SAW mengajarkan untuk berkata yang baik atau diam. Mengganti kata kasar dengan ungkapan yang membangun adalah wujud akhlak mulia."
  }
};

export const CORNER_CONTENT: IslamicQuote[] = [
  {
    type: 'Quran',
    text: "Dan ucapkanlah kata-kata yang baik kepada manusia.",
    source: "QS. Al-Baqarah: 83",
    explanation: "Ayat ini mengingatkan kita untuk selalu bertutur kata yang baik kepada siapa pun, tanpa memandang latar belakang mereka, sebagai bagian dari ibadah."
  },
  {
    type: 'Quran',
    text: "Wahai orang-orang yang beriman! Bertakwalah kamu kepada Allah dan ucapkanlah perkataan yang benar.",
    source: "QS. Al-Ahzab: 70",
    explanation: "Perkataan yang benar (Qaulan Sadida) tidak hanya jujur, tetapi juga lurus, tidak berbelit-belit, dan tidak menyakitkan hati lawan bicara."
  },
  {
    type: 'Hadith',
    text: "Barangsiapa yang beriman kepada Allah dan Hari Akhir maka hendaklah ia berkata baik atau diam.",
    source: "HR. Bukhari & Muslim",
    explanation: "Hadits ini menjadi prinsip dasar bagi seorang Muslim dalam menjaga lisannya. Pilihan hanya ada dua: berbicara yang bermanfaat atau menahan diri."
  },
  {
    type: 'Hadith',
    text: "Sesungguhnya seorang hamba yang mengucapkan suatu perkataan yang tidak dipikirkan apa dampaknya, akan membuatnya terjerumus ke dalam neraka yang dalamnya lebih jauh dari jarak timur dengan barat.",
    source: "HR. Bukhari & Muslim",
    explanation: "Peringatan keras dari Rasulullah SAW tentang betapa berbahayanya lisan jika tidak dijaga. Setiap kata memiliki pertanggungjawaban."
  }
];


export const DAILY_CHALLENGES: DailyChallenge[] = [
  "Hari ini, coba puji satu kebaikan kecil dari teman atau keluargamu.",
  "Saat ingin mengeluh, coba ganti dengan ucapan 'Alhamdulillah 'ala kulli hal' (Segala puji bagi Allah atas setiap keadaan).",
  "Jika ada yang membuatmu kesal di media sosial, tantang dirimu untuk tidak berkomentar negatif atau diam saja.",
  "Tantangan hari ini: Ucapkan 'tolong', 'terima kasih', dan 'maaf' dengan tulus setiap kali diperlukan.",
  "Saat rapat atau diskusi, coba dengarkan pendapat orang lain sampai selesai sebelum memberikan tanggapan.",
  "Hari ini, hindari memotong pembicaraan orang lain. Beri mereka kesempatan untuk menyelesaikan kalimatnya."
];

export const INSPIRATIONAL_STORIES: Story[] = [
    {
        title: "Kisah Rasulullah dan Pengemis Yahudi Buta",
        content: "Di sudut pasar Madinah, ada seorang pengemis Yahudi buta yang setiap hari selalu mencela dan memfitnah Rasulullah SAW kepada setiap orang yang mendekatinya. Namun, Rasulullah SAW justru setiap pagi mendatanginya dengan membawakan makanan, dan tanpa berkata sepatah kata pun, beliau menyuapi pengemis itu dengan penuh kelembutan. Rasulullah melakukan ini hingga beliau wafat. Setelah wafatnya Rasulullah, Abu Bakar Ash-Shiddiq RA mencoba melanjutkan kebiasaan ini. Namun, saat Abu Bakar menyuapinya, si pengemis marah dan berkata, 'Kamu bukan orang yang biasa memberiku makan! Orang itu selalu menghaluskan makanannya terlebih dahulu sebelum menyuapkannya ke mulutku.' Abu Bakar pun menangis dan menceritakan bahwa orang yang selama ini melakukannya adalah Rasulullah SAW, orang yang selalu ia caci maki. Seketika itu juga, si pengemis Yahudi buta itu menyesal dan bersyahadat di hadapan Abu Bakar RA."
    },
    {
        title: "Nasihat Imam Al-Ghazali tentang Membuka Aib",
        content: "Suatu hari, seorang pria datang kepada Imam Al-Ghazali dan berkata, 'Wahai Imam, seseorang telah membicarakan keburukanmu di hadapanku.' Imam Al-Ghazali dengan tenang menjawab, 'Dia telah melepaskan tiga panah kepadaku, tetapi untungnya tidak ada yang mengenai. Panah pertama adalah ghibah (menggunjing), dan itu adalah dosa besar. Panah kedua adalah dia membuatku marah padanya, dan aku tidak akan marah. Panah ketiga adalah dia membuatku ingin membalasnya, dan aku memaafkannya.' Kemudian sang Imam menasihati pria itu, 'Adapun engkau, engkau juga melakukan tiga kesalahan: engkau melakukan namimah (adu domba) dengan membawa perkataannya kepadaku, engkau membuatku curiga pada saudaraku yang sebelumnya aku percaya, dan engkau telah ikut serta dalam perbuatan ghibah tersebut.' Pria itu pun terdiam dan menyadari kesalahannya."
    }
];