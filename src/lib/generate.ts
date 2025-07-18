export async function generate(prompt: string): Promise<string> {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma:2b",
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();
    return data.response;
  }

  export async function summarizeQuote(quote: string): Promise<string> {
    const prompt = `Write this quote summarized in 5 words or less:\n"${quote}"`;
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma:2b",
      prompt,
      stream: false,
    })
    })

    const data = await response.json();
    const summary = data.response.trim();

    return summary.length > 0 ? summary : "Untitled"; 
  }