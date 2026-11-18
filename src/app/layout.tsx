import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "খাঁটি খেজুর গুড় — শাহিন ই মার্ট | ভোর ৪টার প্রথম রসের আসল স্বাদ",
  description:
    "রাজশাহীর নিজস্ব তাফালে তৈরি ০% চিনি, হাইড্রোজ ও ফিটকিরিমুক্ত খাঁটি খেজুর গুড়। পাটালি, ঝোলা, বীজ ও দানাদার গুড় — ক্যাশ অন ডেলিভারি। কল/WhatsApp: 09611901170",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FBF6EE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link
          rel="preload"
          href="/images/winter-mist.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/fonts/shohid-salam.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/alinur-tarunya.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@500;700&family=Noto+Serif+Bengali:wght@800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
