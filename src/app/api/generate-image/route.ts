import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, width = 1024, height = 1024 } = await request.json();

    console.log("Generating image with prompt:", prompt);

    const response = await fetch("https://chatgpt-42.p.rapidapi.com/texttoimage3", {
      method: "POST",
      headers: {
        "x-rapidapi-key": "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: prompt,
        width,
        height,
        steps: 20,
      }),
    });

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    // Handle various response formats from the API
    let imageUrl = null;
    
    if (data.generated_image) {
      imageUrl = data.generated_image;
    } else if (data.image_url) {
      imageUrl = data.image_url;
    } else if (data.result) {
      imageUrl = data.result;
    } else if (data.url) {
      imageUrl = data.url;
    } else if (data.image) {
      imageUrl = data.image;
    } else if (data.data?.url) {
      imageUrl = data.data.url;
    } else if (Array.isArray(data) && data[0]?.url) {
      imageUrl = data[0].url;
    }

    if (imageUrl) {
      return NextResponse.json({ success: true, image_url: imageUrl });
    }

    // If we couldn't find an image URL, return the full response for debugging
    console.log("Could not find image URL in response");
    return NextResponse.json({ 
      success: false, 
      error: "Could not extract image URL", 
      raw_response: data 
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to generate image" 
    }, { status: 500 });
  }
}
