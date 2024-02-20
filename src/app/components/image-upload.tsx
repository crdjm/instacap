"use client";

import { UploadDropzone } from "@/utils/uploadthing";
// import Image from "next/image";
import { useState } from "react";
// import fetch from "node-fetch";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://utfs.io/f/264153b7-0920-4184-ab29-bce62a33e301-2487m.jpg",
  );

  const [caption, setCaption] = useState<string>(
    "This is a sample image to experiment with generating captions. Upload your own image above.",
  );
  const [buttonText, setButtonText] = useState<string>(
    "Generate Instagram Caption",
  );

  const [instaType, setInstaType] = useState<string>("informative");

  const fetchData = async () => {
    const req = await fetch(
      "/api/insta?url=" + imageUrl + "&instaType=" + instaType,
    );
    const newData = await req.json();
    setButtonText("Generate Instagram Caption");

    return setCaption(newData.caption);
  };

  function handleClick() {
    setButtonText("Generating caption...");
    setCaption("");
    fetchData();
  }

  return (
    <div className="m-0 p-0">
      <div className="flex justify-center py-5">
        {/* <UploadButton */}
        <UploadDropzone
          appearance={{ container: { border: "1px solid black" } }}
          endpoint="imageUploader"
          onUploadBegin={() => {
            // Do something once upload begins
            setImageUrl("");
            setCaption("");
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            // console.log("Files: ", res);
            setImageUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      {imageUrl ? (
        <div className="grid grid-flow-col gap-5">
          {/* <Image src={imageUrl} alt="image" width={400} height={200} /> */}
          <img src={imageUrl} alt="image" width={200} />

          <div className="">
            <div className="grid grid-flow-col gap-5">
              <button
                className="rounded bg-blue-500 px-4 py-2 pr-5 font-bold text-white hover:bg-blue-700"
                onClick={handleClick}
                disabled={imageUrl.length === 0}
              >
                {buttonText}
              </button>
              <span>
                <input
                  type="radio"
                  name="instaType"
                  value="funny"
                  id="funny"
                  checked={instaType === "funny"}
                  onChange={(e) => setInstaType(e.target.value)}
                />
                <label htmlFor="funny">Funny</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="instaType"
                  value="informative"
                  id="informative"
                  checked={instaType === "informative"}
                  onChange={(e) => setInstaType(e.target.value)}
                />
                <label htmlFor="informative">Informative</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="instaType"
                  value="long"
                  id="long"
                  checked={instaType === "long"}
                  onChange={(e) => setInstaType(e.target.value)}
                />
                <label htmlFor="long">Long</label>
              </span>
            </div>
            <div className="size-fit justify-self-auto pt-5">{caption}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
