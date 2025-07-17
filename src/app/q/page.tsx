"use client";

import { generate } from "@/lib/generate";
import { toPng } from "html-to-image";
import Image from "next/image";
import React, { useState } from "react";

export default function Quote() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");

  const generateQuote = async () => {
    setLoading(true);
    const getQuote = await generate(prompt);

    setQuote(getQuote);
    setLoading(false);
  };

  const downloadImage = () => {
    const node = document.getElementById("quote-card");
    if (!node) return;

    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "quote.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // download(dataUrl, "quote.png");
      })
      .catch((err) => {
        console.error("Image download failed: ", err);
      });
  };

  return (
    <main className="flex flex-col min-h-full p-5 gap-[32px] row-start-2 items-center ">
      <header className="flex gap-5 p-5">
        <input
          className="rounded-full border border-gray-400 px-6 py-2 w-full max-w-2xl text-base focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-black text-white rounded-full px-8 py-2 text-base hover:bg-gray-800 transition-all cursor-pointer"
          onClick={generateQuote}
        >
          Send
        </button>
      </header>
      {loading && <span className="line-md--loading-loop"></span>}
      {quote && (
        <section className="quote flex flex-col py-20">
          <div
            id="quote-card"
            className="quote-card flex flex-col justify-end max-w-xl p-8 bg-white text-[#151515]"
          >
            <p className="text-end font-semibold text-xl opacity-60 self-center mb-4 py-16">
              {quote}
            </p>
            <div className="flex justify-between items-center content-end py-2 opacity-60">
              <span className="opacity-60 text-sm">@innovante_tech</span>
              <Image src={"/logo.png"} alt="logo" width={32} height={32} />
            </div>
          </div>
          <div className="py-5">
            <button onClick={downloadImage} className="opacity-60 ">
              <span className="bx--download"></span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
