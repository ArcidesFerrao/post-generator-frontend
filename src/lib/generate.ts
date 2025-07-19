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
    
    const summary = quote.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).slice(0, 5).join(' ');
    return summary.length > 0 ? summary : "Untitled"; 
  }