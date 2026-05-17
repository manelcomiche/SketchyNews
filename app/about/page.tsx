import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — SketchyNews",
  description: "Learn how SketchyNews turns headlines into AI-generated illustrations.",
};

const EXAMPLES = [
  {
    src: "/assets/til1.png",
    caption: "Scientists discover a new species of deep-sea fish",
  },
  {
    src: "/assets/til2.png",
    caption: "Record heatwave sweeps across southern Europe",
  },
  {
    src: "/assets/til3.png",
    caption: "Space agency announces return mission to the Moon",
  },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
        About SketchyNews
      </h1>
      <p className="text-[#888] text-lg mb-12 leading-relaxed">
        SketchyNews transforms news headlines into striking AI-generated illustrations
        using OpenAI&apos;s <span className="text-white">GPT-Image-2</span> — the
        state-of-the-art model for image generation. Type any headline, and the tool
        creates a unique artistic interpretation — dramatic, visual, and shareable.
      </p>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-5">How it works</h2>
        <ol className="space-y-4">
          {[
            "Click API Key in the header and enter your OpenAI API key. It's stored locally in your browser — never on any server.",
            "Type a news headline or a short scene description in the input field.",
            "Click Generate Image (or press ⌘+Enter). GPT-Image-2 will create a 1024×1024 illustration in a few seconds.",
            "Download the PNG or share it directly.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4 text-[#888]">
              <span className="text-[#e86a6a] font-semibold tabular-nums shrink-0 w-5">
                {i + 1}.
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Cost notice */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Pricing</h2>
        <p className="text-[#888] text-sm mb-4 leading-relaxed">
          Each generation calls OpenAI using{" "}
          <span className="text-white">your own API key</span>. GPT-Image-2 is
          billed by token usage:
        </p>
        <div className="rounded-xl border border-[#2e2e2e] overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2e2e2e]">
                <th className="text-left px-4 py-3 text-[#888] font-medium">Token type</th>
                <th className="text-right px-4 py-3 text-[#888] font-medium">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              <tr>
                <td className="px-4 py-3 text-white">Image input</td>
                <td className="px-4 py-3 text-right text-[#888]">$8.00 / 1M tokens</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Image input (cached)</td>
                <td className="px-4 py-3 text-right text-[#888]">$2.00 / 1M tokens</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Image output</td>
                <td className="px-4 py-3 text-right text-[#888]">$30.00 / 1M tokens</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Text input</td>
                <td className="px-4 py-3 text-right text-[#888]">$5.00 / 1M tokens</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white">Text input (cached)</td>
                <td className="px-4 py-3 text-right text-[#888]">$1.25 / 1M tokens</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[#555] text-xs">
          See{" "}
          <a
            href="https://openai.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            openai.com/pricing
          </a>{" "}
          for the latest rates.
        </p>
      </section>

      {/* Example gallery */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Example generations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXAMPLES.map(({ src, caption }) => (
            <div
              key={src}
              className="rounded-xl overflow-hidden border border-[#2e2e2e] flex flex-col"
            >
              <Image
                src={src}
                alt={caption}
                width={400}
                height={400}
                className="w-full h-44 object-cover"
              />
              <div className="p-3 flex-1">
                <p className="text-[#888] text-xs leading-relaxed">
                  &ldquo;{caption}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* License */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">License</h2>
        <p className="text-[#888] text-sm leading-relaxed">
          SketchyNews is open source under the{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            GNU AGPL v3.0
          </a>{" "}
          license. Source code is available on{" "}
          <a
            href="https://github.com/manelcomiche/sketchynews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            GitHub
          </a>
          . If you deploy a modified version, you must make the source available
          to your users.
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#e86a6a] hover:bg-[#d45858] text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
        >
          Start generating
        </Link>
      </div>
    </div>
  );
}
