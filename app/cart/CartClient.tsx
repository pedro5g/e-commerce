"use client";
import { useCart } from "@/hooks/useCart";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BackButton } from "../components/BackButton";
import { ItemContent } from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { User } from "@/@types/user-type";

interface CartClientProps {
  currentUser: User | null | undefined;
}

export const CartClient = ({ currentUser }: CartClientProps) => {
  const { cartTotalAmount, cartProducts, handleClearCart } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className=" w-full flex flex-col gap-3 items-center justify-center">
        <div className=" font-medium text-zinc-800 text-xl sm:text-3xl md:text-5xl">
          Your product cart is empty
        </div>
        <BackButton label="Start shopping" />
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping cart" center />
      <div className=" grid grid-cols-5 text-xs gap-4 mt-8 pb-2 items-center">
        <div className=" col-span-2 justify-self-start">PRODUCT</div>
        <div className=" justify-self-center">PRICE</div>
        <div className=" justify-self-center">QUANTITY</div>
        <div className=" justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 flex justify-between gap-4 py-4">
        <div>
          <Button small outline label="Clear cart" onClick={handleClearCart} />
        </div>
        <div className=" text-sm flex flex-col gap-1 items-start">
          <div className=" flex items-center w-full justify-between text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className=" text-slate-500">
            Taxes and shipping calculate at checkout
          </p>
          <div className=" w-full">
            <Button
              label={currentUser ? "Checkout" : "Login To Checkout"}
              outline={currentUser ? false : true}
              onClick={() => {
                currentUser ? router.push("/checkout") : router.push("/login");
              }}
            />
          </div>
          <div>
            <BackButton label="Continue Shopping" />
          </div>
        </div>
      </div>
    </div>
  );
};
