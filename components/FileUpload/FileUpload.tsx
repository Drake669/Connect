"use client";

import React from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type FileUploadProps = {
  endpoint: "serverLogo" | "messageFiles";
  value: string;
  onChange: (url?: string) => void;
};

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-32 w-28">
        <Avatar className="w-28 h-28">
          <AvatarImage src={value} />
        </Avatar>
        <button
          className="absolute top-0  right-0 bg-rose-500 rounded-full text-white p-1"
          onClick={() => {
            onChange("");
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
