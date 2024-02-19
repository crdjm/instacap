import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
require("dotenv").config();

function bufToGenerativePart(buf: string, mimeType: string) {
  return {
    inlineData: {
      // data: Buffer.from(buf).toString("base64"),
      data: buf,
      mimeType,
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  // const imageUrl = "Your URL here";
  const imageUrlData = await fetch(url);

  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString("base64");
  // const contentType = imageUrlData.headers.get("content-type");
  // const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;

  const imageParts = [bufToGenerativePart(stringifiedBuffer, "image/jpeg")];

  const ai_prompt =
    // "Write an informative instagram caption with at most 10 hashtags";
    "Write a funny instagram caption including at most 10 hashtags";

  const result = await model.generateContent([ai_prompt, ...imageParts]);
  const response = result.response;
  const text = response.text();

  return Response.json({ caption: text });
}
