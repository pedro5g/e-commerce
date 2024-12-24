import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { SetQuantity } from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { ProductInCart } from "@/@types/product-types";

interface ItemContentProps {
  item: ProductInCart;
}

export const ItemContent = ({ item }: ItemContentProps) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <div className=" grid grid-cols-5 py-4 text-sm md:text-xs gap-4 border-t-[1.5px] border-slate-200 items-center ">
      <div className=" flex gap-2 md:gap-4 col-span-2 justify-self-start">
        <Link href={`/product/${item.id}`}>
          <div className=" relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className=" object-contain"
            />
          </div>
        </Link>
        <div className=" flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className=" w-[70px]">
            <button
              onClick={() => handleRemoveProductFromCart(item)}
              className=" text-zinc-800 underline">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className=" justify-self-center">{formatPrice(item.price)}</div>
      <div className=" justify-self-center">
        <SetQuantity
          cartProduct={item}
          cartCounter
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
        />
      </div>
      <div className=" justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};
