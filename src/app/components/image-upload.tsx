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
  const [buttonText, setButtonText] = useState<string>("Generate Caption");

  const [instaType, setInstaType] = useState<string>("funny");

  const fetchData = async () => {
    const req = await fetch(
      "/api/insta?url=" + imageUrl + "&instaType=" + instaType,
    );
    const newData = await req.json();
    setButtonText("Generate Caption");

    return setCaption(newData.caption);
  };

  function handleClick() {
    setButtonText("Generating...");
    setCaption("");
    fetchData();
  }

  return (
    <div className="m-0 p-0">
      <div className="flex justify-center py-4">
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
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
          {/* grid-flow-col <Image src={imageUrl} alt="image" width={400} height={200} /> */}

          <div className="col-span-3">
            <div className="grid grid-flow-col gap-1">
              <button
                className="relative rounded bg-blue-500 px-4 py-2 pr-5 font-bold text-white hover:bg-blue-700"
                onClick={handleClick}
                disabled={imageUrl.length === 0}
              >
                {buttonText}
              </button>
              <span className="grid grid-flow-col gap-1 text-sm">
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
                <span>
                  <input
                    type="radio"
                    name="instaType"
                    value="uplifting"
                    id="uplifting"
                    checked={instaType === "uplifting"}
                    onChange={(e) => setInstaType(e.target.value)}
                  />
                  <label htmlFor="uplifting">Uplifting</label>
                </span>

                <span>
                  <input
                    type="radio"
                    name="instaType"
                    value="alt"
                    id="alt"
                    checked={instaType === "alt"}
                    onChange={(e) => setInstaType(e.target.value)}
                  />
                  <label htmlFor="alt">alt text</label>
                </span>
              </span>
            </div>
            <div className="size-fit justify-self-auto pt-5">{caption}</div>
          </div>
          <img src={imageUrl} alt="image" width={200} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
