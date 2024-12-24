"use client";
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductWithReviews } from "@/@types/product-types";

interface ProductsCardProps {
  data: ProductWithReviews;
}
export const ProductCard = ({ data }: ProductsCardProps) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc, item) => item.reting + acc, 0) /
    data.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className=" col-span-1 cursor-pointer text-center text-sm border-[1.2px] border-zinc-300 bg-slate-50 rounded-sm p-2 transition hover:scale-105">
      <div className=" flex flex-col items-center w-full gap-1">
        <div className="relative aspect-square overflow-hidden w-full">
          <Image
            fill
            alt={data.name}
            className=" w-full h-full object-contain"
            src={data.images[0]?.image}
          />
        </div>
        <div className=" mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className=" font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};
