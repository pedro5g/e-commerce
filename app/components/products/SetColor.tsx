"use client";

import { ProductInCart, UploadedImageType } from "@/@types/product-types";

interface SetColorProps {
  images: UploadedImageType[];
  cartProduct: ProductInCart;
  handleSetColor: (value: UploadedImageType) => void;
}

export const SetColor = ({
  images,
  cartProduct,
  handleSetColor,
}: SetColorProps) => {
  return (
    <div>
      <div className=" flex gap-4 items-center">
        <span className=" font-semibold">COLOR:</span>
        <div className=" flex gap-1">
          {images.map((image) => {
            return (
              <div
                onClick={() => handleSetColor(image)}
                key={image.color}
                className={`${
                  cartProduct.selectedImg.color === image.color
                    ? "border-[2px]"
                    : "border-none"
                } w-7 h-7 rounded-full border-green-400 flex items-center justify-center`}>
                <button
                  style={{
                    background: image.colorCode,
                  }}
                  className=" w-5 h-5 rounded-full border-[1.2px] border-slate-300"></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
