import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[12px] font-extrabold tracking-[0.12em] text-gur">
        শাহিন ই মার্ট · রাজশাহী
      </p>
      <h1 className="font-display mt-2 text-[28px] font-black text-ink">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 max-w-[320px] text-[14px] text-ink/75">
        খাঁটি খেজুরের গুড় ও পিঠার আয়োজনের মূল পাতায় ফিরে যেতে নিচের বাটনে চাপুন।
      </p>
      <Link
        href="/"
        className="sticky-capsule-btn mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-extrabold"
      >
        হোম পেজে ফিরে যান →
      </Link>
    </main>
  );
}
