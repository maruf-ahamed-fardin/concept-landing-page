export const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBn = (n: number | string): string =>
  String(n).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

export const toTk = (n: number): string =>
  "৳" + toBn(Number(n).toLocaleString("en-IN"));

export const PHONE = "09611901170";
export const WA_NUMBER = "8809611901170";

export interface ProductItem {
  id: string;
  name: string;
  en: string;
  unit: string;
  price: number;
  regular?: number;
  tags: ("pitha" | "payesh" | "direct")[];
  desc: string;
  sensoryHook: string;
  badge?: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "combo",
    name: "৫ প্রকার খাঁটি খেজুর গুড় কম্বো",
    en: "5-in-1 Royal Winter Combo · 2.5kg",
    unit: "২.৫ কেজি",
    price: 850,
    regular: 950,
    tags: ["pitha", "payesh", "direct"],
    desc: "ঝোলা, চকলেট বীজ, দানাদার, গোল পাটালি ও ফয়েল পাটালি — প্রতিটি ৫০০ গ্রাম করে মোট ২.৫ কেজি।",
    sensoryHook: "পুরো শীতের পিঠা, পায়েস ও চায়ের সব আয়োজন এক বক্সেই!",
    badge: "বেস্টসেলার",
  },
  {
    id: "jhola",
    name: "প্রথম রসের ঝোলা গুড়",
    en: "Liquid Golden Jhola Gur",
    unit: "১ কেজি",
    price: 400,
    tags: ["pitha", "payesh"],
    desc: "সোনালি ঘন তরল গুড় — গরম ভাপা, চিতই কিংবা রুটি-পরোটার ওপর ঢেলে খাওয়ার জন্য সেরা।",
    sensoryHook: "চামচ থেকে ধীরে গড়িয়ে পড়ে, এক চামচেই ঘর ভরে যায় ঘ্রাণে",
    badge: "পিঠার রাজা",
  },
  {
    id: "bij",
    name: "চকলেট বা বীজ গুড়",
    en: "Artisanal Chocolate / Bij Gur",
    unit: "১ কেজি",
    price: 500,
    tags: ["payesh", "direct"],
    desc: "ঘন জ্বালে দানা বাঁধা গাঢ় চকলেট রঙের রাজকীয় গুড় — সবচেয়ে গভীর, ক্যারামেল স্বাদ।",
    sensoryHook: "মুখে দিলেই মাখনের মতো গলে যায়, চায়ের চিনির সেরা বিকল্প",
    badge: "প্রিমিয়াম",
  },
  {
    id: "gol",
    name: "রাজশাহীর গোল পাটালি",
    en: "Traditional Gol Patali",
    unit: "১ কেজি",
    price: 400,
    tags: ["pitha", "payesh", "direct"],
    desc: "ছাঁচে ঢালা গোল চাকতি — বাইরে মুচমুচে, আঙুলের চাপে ভেতরে নরম দানা ভেঙে যায়।",
    sensoryHook: "দুধের পায়েস বা ক্ষীরে দিলে দুধ ফাটে না, আনে রাজকীয় রং",
  },
  {
    id: "foil",
    name: "ফয়েল পাটালি",
    en: "Foil-Wrapped Soft Patali",
    unit: "১ কেজি",
    price: 400,
    tags: ["pitha", "direct"],
    desc: "ফুড-গ্রেড ফয়েলে মোড়ানো নরম পাটালি — বাতাস ঢোকে না, ঘ্রাণ ও সতেজতা থাকে অটুট।",
    sensoryHook: "ভাগ করে খাওয়া ও সংরক্ষণ করা সবচেয়ে সহজ",
  },
  {
    id: "danadar",
    name: "দানাদার গুড়",
    en: "Crystalline Danadar Gur",
    unit: "১ কেজি",
    price: 420,
    tags: ["payesh", "direct"],
    desc: "মুক্তোর মতো ঝুরঝুরে দানা গুড় — পায়েস, ক্ষীর, সেমাই আর লাল চায়ে চিনির বদলে।",
    sensoryHook: "চামচে তুলে সরাসরি কিংবা গরম দুধে নিমেষেই মিশে যায়",
  },
  {
    id: "lomba",
    name: "লম্বা পাটালি",
    en: "Classic Bar Patali",
    unit: "১ কেজি",
    price: 400,
    tags: ["payesh", "direct"],
    desc: "লম্বা বারের মতো ঐতিহ্যবাহী পাটালি — স্লাইস করে কেটে মুড়ি বা বিকেলের নাস্তায়।",
    sensoryHook: "শীতের সকালে এক বাটি মুড়ি আর এক টুকরো পাটালির চিরচেনা জুটি",
  },
];

export const COMBO_ITEM_IDS = ["jhola", "bij", "danadar", "gol", "foil"];

export const TAG_LABELS: Record<string, string> = {
  pitha: "🥟 ভাপা/চিতই পিঠা",
  payesh: "🥣 পায়েস ও ক্ষীর",
  direct: "🍫 সরাসরি/মুড়ি/চা",
};
