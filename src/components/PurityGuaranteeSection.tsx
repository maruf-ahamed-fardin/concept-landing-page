import React from "react";

export function PurityGuaranteeSection() {
  return (
    <section className="relative overflow-hidden bg-sand/75 px-4 py-9">
      <svg
        className="wm"
        style={{ right: -50, top: -20, width: 185, height: 185 }}
        aria-hidden="true"
      >
        <use href="#s-thala" />
      </svg>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[12.5px] font-bold tracking-wide text-leaf">
              🔬 শতভাগ খাঁটিত্বের চ্যালেঞ্জ
            </p>
            <h2 className="font-display mt-0.5 text-[23px] font-black leading-[1.38] text-ink">
              ডেলিভারি ম্যানের সামনেই{" "}
              <span className="gurtext">যাচাই করে নিন</span>
            </h2>
          </div>

          {/* Rotating Wax Seal Stamp SVG */}
          <div className="relative h-16 w-16 flex-none">
            <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#9E3B24"
                stroke="#F2B44A"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#FFE5B4"
                strokeWidth="1"
              />
              <text
                x="50"
                y="44"
                textAnchor="middle"
                fill="#FFE5B4"
                fontFamily="'Noto Serif Bengali', serif"
                fontWeight="800"
                fontSize="14"
              >
                ১০০%
              </text>
              <text
                x="50"
                y="60"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="'Noto Sans Bengali', sans-serif"
                fontWeight="700"
                fontSize="10.5"
              >
                খাঁটি গ্যারান্টি
              </text>
            </svg>
          </div>
        </div>

        {/* 3 Compact Visual Purity Tests */}
        <div className="mt-4 space-y-3">
          <article className="kantha relative flex items-start gap-3.5 rounded-[22px] bg-card p-4 shadow-sm">
            <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-[#FFF3DF] font-serif text-[22px] font-extrabold text-clay shadow-inner">
              ০১
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[16px] font-bold leading-snug text-ink">
                  প্রাকৃতিক গাঢ় বাদামি রং টেস্ট
                </h3>
                <span className="flex-none whitespace-nowrap rounded-full bg-leaf/10 px-2 py-0.5 text-[10.5px] font-bold text-leaf">
                  ০% হাইড্রোজ
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-[1.62] text-ink/75">
                রং উজ্জ্বল করতে হাইড্রোজ বা ফিটকিরি মেশানো হয় না। তাই আমাদের গুড়ের রং প্রাকৃতিক গাঢ় বাদামি—ঝকঝকে কৃত্রিম হলুদ নয়।
              </p>
            </div>
          </article>

          <article className="kantha relative flex items-start gap-3.5 rounded-[22px] bg-card p-4 shadow-sm">
            <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-[#FFF3DF] font-serif text-[22px] font-extrabold text-clay shadow-inner">
              ০২
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[16px] font-bold leading-snug text-ink">
                  আঙুলের চাপে নরম দানাদার ভাঙন
                </h3>
                <span className="flex-none whitespace-nowrap rounded-full bg-gur/[0.12] px-2 py-0.5 text-[10.5px] font-bold text-gur">
                  ০% চিনি
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-[1.62] text-ink/75">
                খাঁটি পাটালিতে আঙুলে চাপ দিলে নরম দানা দানা হয়ে ভেঙে যায় এবং মুখে দিলেই গলে যায়। চিনি মেশানো গুড় হয় ইটের মতো শক্ত।
              </p>
            </div>
          </article>

          <article className="kantha relative flex items-start gap-3.5 rounded-[22px] bg-card p-4 shadow-sm">
            <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-[#FFF3DF] font-serif text-[22px] font-extrabold text-clay shadow-inner">
              ০৩
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[16px] font-bold leading-snug text-ink">
                  ফুড-গ্রেড লিক-প্রুফ প্যাকেজিং
                </h3>
                <span className="flex-none whitespace-nowrap rounded-full bg-clay/10 px-2 py-0.5 text-[10.5px] font-bold text-clay">
                  সারা দেশে ডেলিভারি
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-[1.62] text-ink/75">
                ঝোলা গুড় সিল করা এয়ারটাইট জারে এবং পাটালি আলাদা সুরক্ষিত মোড়কে পাঠানো হয়—যাতে এক ফোঁটাও না গড়ায়, ঘ্রাণ থাকে অটুট।
              </p>
            </div>
          </article>
        </div>

        {/* Ironclad Risk-Reversal Banner */}
        <div className="mt-4 rounded-[20px] border-2 border-leaf/30 bg-[#EFF9F2] p-3.5 text-center shadow-sm">
          <p className="serif text-[15.5px] font-extrabold text-leaf">
            🛡️ “ভেজাল বা চিনি প্রমাণ করতে পারলে ১০০% মূল্য ফেরত গ্যারান্টি”
          </p>
          <p className="mt-0.5 text-[12.5px] font-medium text-ink/75">
            পণ্য হাতে পেয়ে দেখে-শুনে ডেলিভারি ম্যানকে টাকা পরিশোধ করুন।
          </p>
        </div>
      </div>
    </section>
  );
}
