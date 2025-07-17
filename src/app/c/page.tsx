"use client";

import { generate } from "@/lib/generate";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await generate(prompt);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-5 items-center flex-col-reverse ">
          {result && !loading && (
            <div className="w-full  rounded-lg bg-gray-100 px-6 py-10 shadow-sm space-y-4 max-w-none ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {result}
              </ReactMarkdown>
            </div>
          )}
          {result && !loading && (
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-sm bg-black text-white rounded px-4 py-e hover:bg-gray-800 self-end"
            >
              Copy
            </button>
          )}
          {loading && <span className="line-md--loading-loop"></span>}
          <div className="flex items-center gap-4">
            <input
              className="rounded-full border border-gray-400 px-6 py-2 w-full max-w-xl text-base focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="How can I help?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="bg-black text-white rounded-full px-8 py-2 text-base hover:bg-gray-800 transition-all cursor-pointer"
              onClick={handleGenerate}
            >
              Send
            </button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
