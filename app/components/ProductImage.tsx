"use client";

import Image from "next/image";
import {
  ProductInCart,
  ProductWithReviews,
  UploadedImageType,
} from "@/@types/product-types";

interface ProductImageProps {
  cartProduct: ProductInCart;
  product: ProductWithReviews;
  handleColorSelect: (value: UploadedImageType) => void;
}

export const ProductImage = ({
  cartProduct,
  product,
  handleColorSelect,
}: ProductImageProps) => {
  return (
    <div className=" grid grid-cols-6 gap-2 h-full min-h-[300px] max-h-[500px] sm:min-h-[400px]">
      <div className=" flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:max-h-[400px] ">
        {product.images.map((image) => {
          const isSelected = cartProduct.selectedImg.color === image.color;
          return (
            <div
              onClick={() => handleColorSelect(image)}
              key={image.color}
              data-selected={isSelected}
              className="relative w-[80%] aspect-square rounded border-green-400 data-[selected=true]:border-[1.5px] data-[selected=false]:border-none">
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className=" col-span-5 relative aspect-square">
        <Image
          src={cartProduct.selectedImg.image as string}
          alt={cartProduct.name}
          fill
          className=" object-contain h-full min-h-[300px] max-h-[500px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};
