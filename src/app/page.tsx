import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-col min-w-full justify-center min-h-screen gap-[32px] row-start-2 items-center ">
      <Link href="/c">Chat</Link>
      <Link href="/q">Quote</Link>
    </main>
  );
}
