"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { API_KEY_STORAGE_KEY } from "@/lib/constants";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [serverHasKey, setServerHasKey] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setApiKey(localStorage.getItem(API_KEY_STORAGE_KEY));

    fetch("/api/has-server-key")
      .then((r) => r.json())
      .then((d) => setServerHasKey(d.hasKey))
      .catch(() => {});

    const onStorage = () => setApiKey(localStorage.getItem(API_KEY_STORAGE_KEY));
    const onFocus = () => setApiKey(localStorage.getItem(API_KEY_STORAGE_KEY));
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const handleGenerate = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) headers["x-openai-key"] = apiKey;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate image.");
      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    // data URLs (base64) download directly; remote URLs go through the proxy
    a.href = imageUrl.startsWith("data:")
      ? imageUrl
      : `/api/download?url=${encodeURIComponent(imageUrl)}`;
    a.download = `sketchynews-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
  };

  const needsKey = !apiKey && !serverHasKey;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/SketchyNewsCercle.png"
            alt="SketchyNews"
            width={88}
            height={88}
            className="rounded-full ring-2 ring-[#2e2e2e]"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
          News into{" "}
          <span className="text-[#e86a6a]">AI Art</span>
        </h1>
        <p className="text-[#888] text-lg">
          Turn any headline into a striking AI-generated illustration.
        </p>
      </div>

      {/* API key notice */}
      {needsKey && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-[#e86a6a]/20 bg-[#e86a6a]/5 text-sm text-[#888]">
          <span className="text-[#e86a6a] font-medium">API key required —</span>{" "}
          click the <span className="text-white font-medium">API Key</span> button in the
          header to add your OpenAI key.
        </div>
      )}

      {/* Prompt input */}
      <div className="relative mb-3">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a news headline or scene description…"
          rows={3}
          disabled={loading}
          className="w-full resize-none bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl px-5 py-4 pb-10 text-white placeholder:text-[#555] text-base focus:outline-none focus:border-[#e86a6a]/40 transition-colors disabled:opacity-50 leading-relaxed"
        />
        <span className="absolute bottom-3.5 right-4 text-[#555] text-xs select-none pointer-events-none">
          ⌘ ↵
        </span>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full bg-[#e86a6a] hover:bg-[#d45858] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating image…
          </>
        ) : (
          "Generate Image"
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {imageUrl && (
        <div className="mt-8 space-y-3">
          <div className="rounded-2xl overflow-hidden border border-[#2e2e2e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={prompt}
              className="w-full h-auto block"
            />
          </div>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#2e2e2e] hover:border-[#e86a6a]/30 text-[#888] hover:text-white transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
