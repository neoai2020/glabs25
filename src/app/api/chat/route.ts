import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json();

    const response = await fetch("https://chatgpt-42.p.rapidapi.com/conversationgpt4", {
      method: "POST",
      headers: {
        "x-rapidapi-key": "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        system_prompt: systemPrompt || "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 1024,
        web_access: false,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
