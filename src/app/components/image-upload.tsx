"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
// import fetch from "node-fetch";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://utfs.io/f/264153b7-0920-4184-ab29-bce62a33e301-2487m.jpg",
  );

  const [caption, setCaption] = useState<string>("");

  const fetchData = async () => {
    const req = await fetch("/api/insta?url=" + imageUrl);
    const newData = await req.json();
    return setCaption(newData.caption);
  };

  function handleClick() {
    fetchData();
  }

  return (
    <div>
      {/* <UploadButton */}
      <UploadDropzone
        appearance={{ container: { border: "1px solid black" } }}
        endpoint="imageUploader"
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
      {imageUrl ? (
        <div className="flex">
          <Image src={imageUrl} alt="image" width={400} height={200} />
          <div className="flex-row">
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleClick}
            >
              Generate Instagram Caption
            </button>
            <div>{caption}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
