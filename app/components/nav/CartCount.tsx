"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";

export const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <button className="relative" onClick={() => router.push("/cart")}>
      {cartTotalQty > 0 && (
        <div className=" absolute flex items-center p-0 justify-center z-0 -top-[10px] -right-2 w-4 h-4 rounded-full bg-red-600">
          {cartTotalQty}
        </div>
      )}
      <BsCart3 className=" text-3xl relative z-10" />
    </button>
  );
};
