"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const EXAMPLE_IMAGES = [
  "/assets/til1.png",
  "/assets/til2.png",
  "/assets/til3.png",
];

const PRICING_ROWS = [
  { key: "imageInput" as const, price: "$8.00 / 1M tokens" },
  { key: "imageInputCached" as const, price: "$2.00 / 1M tokens" },
  { key: "imageOutput" as const, price: "$30.00 / 1M tokens" },
  { key: "textInput" as const, price: "$5.00 / 1M tokens" },
  { key: "textInputCached" as const, price: "$1.25 / 1M tokens" },
];

export default function AboutContent() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">{a.title}</h1>
      <p className="text-[#888] text-lg mb-12 leading-relaxed">{a.description}</p>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-5">{a.howItWorksTitle}</h2>
        <ol className="space-y-4">
          {a.steps.map((step, i) => (
            <li key={i} className="flex gap-4 text-[#888]">
              <span className="text-[#e86a6a] font-semibold tabular-nums shrink-0 w-5">
                {i + 1}.
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">{a.pricingTitle}</h2>
        <p className="text-[#888] text-sm mb-4 leading-relaxed">
          {a.pricingDescPre}{" "}
          <span className="text-white">{a.pricingDescHighlight}</span>
          {a.pricingDescPost}
        </p>
        <div className="rounded-xl border border-[#2e2e2e] overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2e2e2e]">
                <th className="text-left px-4 py-3 text-[#888] font-medium">{a.tokenType}</th>
                <th className="text-right px-4 py-3 text-[#888] font-medium">{a.price}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              {PRICING_ROWS.map(({ key, price }) => (
                <tr key={key}>
                  <td className="px-4 py-3 text-white">{a[key]}</td>
                  <td className="px-4 py-3 text-right text-[#888]">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#555] text-xs">
          {a.pricingSeeMore}{" "}
          <a
            href="https://openai.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            openai.com/pricing
          </a>{" "}
          {a.pricingSeeMoreSuffix}
        </p>
      </section>

      {/* Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">{a.examplesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXAMPLE_IMAGES.map((src, i) => (
            <div
              key={src}
              className="rounded-xl overflow-hidden border border-[#2e2e2e] flex flex-col"
            >
              <Image
                src={src}
                alt={a.exampleCaptions[i]}
                width={400}
                height={400}
                className="w-full h-44 object-cover"
              />
              <div className="p-3 flex-1">
                <p className="text-[#888] text-xs leading-relaxed">
                  &ldquo;{a.exampleCaptions[i]}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* License */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">{a.licenseTitle}</h2>
        <p className="text-[#888] text-sm leading-relaxed">
          {a.licenseTextPre}{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            GNU AGPL v3.0
          </a>
          {a.licenseTextMid}{" "}
          <a
            href="https://github.com/manelcomiche/sketchynews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            GitHub
          </a>
          {a.licenseTextPost}
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#e86a6a] hover:bg-[#d45858] text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
        >
          {a.startGenerating}
        </Link>
      </div>
    </div>
  );
}
