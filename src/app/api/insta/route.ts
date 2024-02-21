import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
import sharp from "sharp";

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

  try {
    const url = searchParams.get("url");
    if (!url) {
      return Response.json({ caption: "No image url provided" });
    }

    const instaType = searchParams.get("instaType");
    if (!instaType) {
      return Response.json({ caption: "No instaType provided" });
    }

    const gemini = process.env.GEMINI_KEY;

    if (!gemini) {
      return Response.json({ caption: "No AI key defined" });
    }

    const genAI = new GoogleGenerativeAI(gemini);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // const imageUrl = "Your URL here";
    const imageUrlData = await fetch(url);

    const buffer = await imageUrlData.arrayBuffer();

    let smaller;

    try {
      smaller = await sharp(buffer).resize(200).jpeg().toBuffer();
    } catch (err) {
      smaller = buffer;
    }

    // const stringifiedBuffer = Buffer.from(buffer).toString("base64");
    const stringifiedBuffer = Buffer.from(smaller).toString("base64");
    // const contentType = imageUrlData.headers.get("content-type");
    // const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;

    const imageParts = [bufToGenerativePart(stringifiedBuffer, "image/jpeg")];

    let ai_prompt =
      /* instaType='informative' */
      "Write an informative instagram caption including at most 10 hashtags. In your response, do not include any introductory text that isn't the caption or hashtags.";

    if (instaType === "funny") {
      ai_prompt =
        "Write a funny instagram caption including at most 10 hashtags. In your response, do not include any introductory text that isn't the caption or hashtags.";
    }

    if (instaType === "long") {
      ai_prompt =
        "Write a long instagram caption including at most 10 hashtags. In your response, do not include any introductory text that isn't the caption or hashtags.";
    }

    // "Write a long descriptive instagram caption including at most 10 hashtags. In your response, do not include any introductory text that isn't the caption or hashtags.";
    // "Write a very short instagram caption including at most 10 hashtags. In your response, do not include any introductory text that isn't the caption or hashtags.";
    // "Write alt text. In your response, do not include any introductory text that isn't the alt text.";

    const result = await model.generateContent([ai_prompt, ...imageParts]);
    const response = result.response;
    const text = response.text();

    return Response.json({ caption: text });
  } catch (err) {
    return Response.json({
      caption: "Sorry, something went wrong with this image",
    });
  }
}
