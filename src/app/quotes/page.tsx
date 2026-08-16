"use client";

import { generate } from "@/lib/generate";
import { getQuotePosts } from "@/lib/getQuotePosts";
import { saveQuote } from "@/lib/save";
import { Timestamp } from "firebase/firestore";
import { toPng } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type MemoryItem = {
  id: string;
  title: string;
  quote: string;
  createdAt: Timestamp;
};

type Category = "market" | "growth" | "education";

export default function Quote() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState("");
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState<Category>("growth");

  const categories = ["market", "growth", "education"];

  const prompts = {
    market: (service: string) =>
      `Create a short, powerful quote that highlights the value of ${service}. Speak as if you're inspiring an African entrepreneur to believe in the future of this solution.`,
    growth: () =>
      `Generate a short motivational quote about growth, branding, or showing up consistently. Make it practical and raw, not fluffy.`,
    education: (topic: string) =>
      `Write a short educational quote that teaches African business owners why ${topic} is essential. Keep it simple but powerful.`,
  };

  const generateQuote = async () => {
    setLoading(true);

    const generatedPrompt =
      category === "market"
        ? prompts.market(prompt)
        : category === "education"
          ? prompts.education(prompt)
          : prompts.growth();

    const getQuote = await generate(generatedPrompt);

    setQuote(getQuote);
    setLoading(false);
    setSaving(true);
    await saveQuote(getQuote, generatedPrompt);
    setSaving(false);
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
      })
      .catch((err) => {
        console.error("Image download failed: ", err);
      });
  };

  useEffect(() => {
    const fetchMemory = async () => {
      const data: MemoryItem[] = await getQuotePosts();
      setMemory(data);
    };
    fetchMemory();
  }, []);

  return (
    <main className="flex flex-col min-h-full p-10 gap-[32px] row-start-2 items-center ">
      <section>
        <h2 className="text-2xl font-medium">Quote Memory</h2>
      </section>
      <section className="history max-w-xs flex flex-col">
        <div className="menu-header opacity-60 flex justify-between items-center p-1">
          <h2 className="text-sm px-1">Memory</h2>
          <button
            onClick={() => setQuote("")}
            className="flex items-center clear text-sm px-1"
          >
            Clear
          </button>
          <button
            className="flex items-center"
            onClick={() => setMenu((prev) => !prev)}
          >
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
          <Link href="/quotes">
            <li className="text-xs ">more...</li>
          </Link>
        </ul>
      </section>
    </main>
  );
}
