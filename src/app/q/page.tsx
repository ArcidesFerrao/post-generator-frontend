"use client";

import { generate } from "@/lib/generate";
import { getQuotePosts } from "@/lib/getQuotePosts";
import { saveQuote } from "@/lib/save";
import { Timestamp } from "firebase/firestore";
import { toPng } from "html-to-image";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type MemoryItem = {
  id: string;
  title: string;
  quote: string;
  createdAt: Timestamp;
};

export default function Quote() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [menu, setMenu] = useState(false);

  // const memorizedQuote = (memo: string) => {
  //   setQuote(memo);
  // };

  const generateQuote = async () => {
    setLoading(true);
    const getQuote = await generate(prompt);

    setQuote(getQuote);
    await saveQuote(getQuote, prompt);
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
  const downloadCard = () => {
    const node = document.getElementById("fancy-card");
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

  useEffect(() => {
    const fetchMemory = async () => {
      const data: MemoryItem[] = await getQuotePosts();
      console.log(data);
      setMemory(data);
    };
    fetchMemory();
  }, []);

  return (
    <main className="flex flex-col min-h-full p-10 gap-[32px] row-start-2 items-center ">
      <section>
        <h2 className="text-2xl font-medium">Post Quote Generator</h2>
      </section>
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
        <section className="quote flex flex-col gap-5 py-20">
          <section>
            <div
              id="fancy-card"
              className="quote-card relative flex flex-col justify-between max-w-xl p-8 overflow-hidden"
            >
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 animate-shimmer"></div>

              {/* Quote section */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Quote text */}
                <p className="text-2xl font-light text-center leading-relaxed mb-6 relative">
                  <span className="absolute left-0 text-6xl font-serif text-gray-400 opacity-60 leading-none mb-4">
                    &quot;
                  </span>
                  {quote.replace(/"/g, "")}
                  {/* Closing quote mark */}
                  <span className="absolute right-0 text-6xl font-serif text-gray-400 opacity-60">
                    &quot;
                  </span>
                </p>
              </div>

              {/* Author section */}
              <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-600">
                {/* Author info */}
                <div className="text-left">
                  <div className="font-semibold text-gray-200 text-base">
                    INNOVANTE
                  </div>
                  <p className="text-gray-400 text-xs">@innovante_tech</p>
                </div>
              </div>

              {/* Logo watermark */}
              <div className="absolute bottom-6 right-4 opacity-70">
                <Image src="/logo.png" alt="logo" width={24} height={24} />
              </div>
            </div>
            <div className="py-5">
              <button onClick={downloadCard} className="opacity-60 ">
                <span className="bx--download"></span>
              </button>
            </div>
          </section>
          <div
            id="quote-card"
            className="quote-card flex flex-col justify-end max-w-xl p-8"
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
      <section className="menu absolute top-10 left-5 ">
        {!menu ? (
          <button
            className="opacity-55 flex items-center"
            onClick={() => setMenu((prev) => !prev)}
          >
            <span className="ion--menu-sharp"></span>
          </button>
        ) : (
          <section className="history max-w-xs flex flex-col">
            <div className="menu-header opacity-60 flex justify-between items-center p-1">
              <h2 className="text-sm px-1">Memory</h2>
              <button onClick={() => setQuote("")} className="clear">
                Clear
              </button>
              <button onClick={() => setMenu((prev) => !prev)}>
                <span className="line-md--menu-to-close-transition"></span>
              </button>
            </div>
            <ul className="flex flex-col">
              {memory.map((item) => (
                <li
                  key={item.id}
                  className="text-black flex gap-4 py-2 items-center"
                >
                  <span className="text-xs ">
                    {item.createdAt.toDate().toLocaleDateString()}
                  </span>
                  <button onClick={() => setQuote(item.quote)}>
                    <p className="text-xs">
                      {item.title.length > 32
                        ? item.title.slice(0, 32) + "..."
                        : item.title}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
