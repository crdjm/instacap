import ImageUpload from "./components/image-upload";

// const fetch = require('node-fetch');

// const imageUrl = "Your URL here";
// const imageUrlData = await fetch(imageUrl);
// const buffer = await imageUrlData.arrayBuffer();
// const stringifiedBuffer = Buffer.from(buffer).toString('base64');
// const contentType = imageUrlData.headers.get('content-type');
// const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
//
//
// function bufToGenerativePart(buf: string, mimeType: string) {
//   return {
//     inlineData: {
//       data: Buffer.from(buf).toString("base64"),
//       mimeType
//     },
//   };
// }

// const ai_prompt = "Write an informative instagram caption with hashtags";

// const imageParts = [
//    fileToGenerativePart(imgName, "image/jpeg"),
//  ];

//  const result = await model.generateContent([ai_prompt, ...imageParts]);
//  const response = await result.response;
//  const text = response.text();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ImageUpload />
    </main>
  );
}
