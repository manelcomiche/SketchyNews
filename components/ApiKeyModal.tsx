"use client";

import { useState, useEffect, useRef } from "react";
import { API_KEY_STORAGE_KEY } from "@/lib/constants";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  const [value, setValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem(API_KEY_STORAGE_KEY) ?? "";
      setValue(stored);
      setShowKey(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed) {
      localStorage.setItem(API_KEY_STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
    onSave(trimmed);
    onClose();
  };

  const handleClear = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setValue("");
    onSave("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative z-10 w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-[#2e2e2e] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">OpenAI API Key</h2>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#2e2e2e]"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-[#888] text-sm mb-4 leading-relaxed">
          Your key is stored only in your browser&apos;s local storage and sent over HTTPS
          to call the OpenAI API. It is never logged or stored server-side.
        </p>

        <div className="relative mb-2">
          <input
            ref={inputRef}
            type={showKey ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="sk-..."
            className="w-full bg-[#242424] border border-[#2e2e2e] rounded-xl px-4 py-3 pr-20 text-white placeholder:text-[#555] text-sm focus:outline-none focus:border-[#e86a6a]/50 transition-colors font-mono"
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888] hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-[#2e2e2e]"
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>

        <p className="text-[#555] text-xs mb-5">
          Get a key at{" "}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86a6a] hover:underline"
          >
            platform.openai.com/api-keys
          </a>
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#e86a6a] hover:bg-[#d45858] text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
          >
            Save Key
          </button>
          <button
            onClick={handleClear}
            className="px-4 border border-[#2e2e2e] text-[#888] hover:text-white hover:bg-[#2e2e2e] rounded-xl transition-colors text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
