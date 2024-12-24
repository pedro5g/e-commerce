"use client";

import { ImageType } from "@/@types/product-types";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

export const SelectImage = ({ item, handleFileChange }: SelectImageProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".webp"] },
  });
  return (
    <>
      <div
        {...getRootProps()}
        className=" 
      border-2 border-zinc-400 p-2 border-dashed
      cursor-pointer text-sm font-normal text-zinc-400 flex items-center justify-center
      ">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the Image here...</p> : <p> {item?.color}</p>}
      </div>
    </>
  );
};
