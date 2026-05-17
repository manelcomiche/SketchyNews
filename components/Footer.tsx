import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2e2e2e] mt-20">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#888] text-sm">
          © {new Date().getFullYear()} SketchyNews —{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            AGPL-3.0
          </a>
        </p>
        <nav className="flex items-center gap-5 text-sm text-[#888]">
          <Link href="/" className="hover:text-white transition-colors">
            Generate
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <a
            href="https://github.com/manelcomiche/sketchynews"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
