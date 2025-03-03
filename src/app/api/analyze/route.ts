import { NextResponse } from "next/server";
import { experimental_buildAgent } from "@vercel/ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    const model = gemini.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following resume and provide insights about the candidate's:
        1. Key skills and expertise
        2. Years of experience
        3. Educational background
        4. Career progression
        5. Areas of improvement or missing information

        Resume:
        ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
