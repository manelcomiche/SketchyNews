import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body as { prompt?: string };

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "A news headline is required." },
        { status: 400 }
      );
    }

    const userApiKey = request.headers.get("x-openai-key");
    const apiKey = userApiKey || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "An OpenAI API key is required. Add yours via the API Key button in the header.",
        },
        { status: 401 }
      );
    }

    const openai = new OpenAI({
      apiKey,
      ...(process.env.OPENAI_BASE_URL
        ? { baseURL: process.env.OPENAI_BASE_URL }
        : {}),
    });

    const response = await openai.images.generate({
      model: "GPT-Image-2",
      prompt: `Create a dramatic, artistic news illustration depicting: ${prompt.trim()}`,
      n: 1,
      size: "1024x1024",
    });

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "No image data received from OpenAI." },
        { status: 500 }
      );
    }

    const b64 = response.data[0]?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { error: "Failed to generate image. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: `data:image/png;base64,${b64}` });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 500 }
      );
    }
    console.error("[generate]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
