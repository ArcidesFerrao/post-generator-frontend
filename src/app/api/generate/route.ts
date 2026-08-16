import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt,
        stream: false,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json(
        { error },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      response: data.response,
    });
  } catch (error) {
    console.error("Ollama error:", error);

    return NextResponse.json(
      { error: "Failed to connect to Ollama" },
      { status: 500 }
    );
  }
}