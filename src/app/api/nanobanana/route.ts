import { NextRequest, NextResponse } from "next/server";

// Start a NanoBanana task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch("https://google-nano-banana4.p.rapidapi.com/index.php", {
      method: "POST",
      headers: {
        "x-rapidapi-key": "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316",
        "x-rapidapi-host": "google-nano-banana4.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body).toString(),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("NanoBanana API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// Get NanoBanana results
export async function GET() {
  try {
    const response = await fetch("https://google-nano-banana4.p.rapidapi.com/result.php", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316",
        "x-rapidapi-host": "google-nano-banana4.p.rapidapi.com",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("NanoBanana result error:", error);
    return NextResponse.json({ error: "Failed to get results" }, { status: 500 });
  }
}
