"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
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
        <div>
          <Image src={imageUrl} alt="image" width={500} height={300} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
