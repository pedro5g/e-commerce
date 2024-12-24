"use client";

import { ProductInCart } from "@/@types/product-types";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: ProductInCart;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

export const SetQuantity = ({
  cartProduct,
  cartCounter,
  handleQtyDecrease,
  handleQtyIncrease,
}: SetQuantityProps) => {
  return (
    <div className=" flex items-center gap-8">
      {cartCounter ? null : <div className=" font-semibold">QUANTITY:</div>}
      <div className=" flex gap-4 items-center text-base">
        <button
          className="border-[1.2px] border-slate-300 px-2 rounded"
          onClick={handleQtyDecrease}>
          -
        </button>
        <span>{cartProduct.quantity}</span>
        <button
          className="border-[1.2px] border-slate-300 px-2 rounded"
          onClick={handleQtyIncrease}>
          +
        </button>
      </div>
    </div>
  );
};
