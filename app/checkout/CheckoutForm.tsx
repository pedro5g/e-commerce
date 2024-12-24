"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

export const CheckoutForm = ({
  clientSecret,
  handleSetPaymentSuccess,
}: CheckoutFormProps) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymenteIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkount Success!");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymenteIntent(null);
        }

        setIsLoading(false);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit} id="payment-form">
        <div className=" mb-6">
          <Heading title="Enter your datails to complete checkout" />
        </div>
        <h2 className=" font-semibold mb-2">Address Information</h2>
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US", "BR"],
          }}
        />
        <h2 className=" font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
          }}
        />
        <div className=" py-4 text-center text-zinc-600 text-xl font-bold ">
          Total: {formattedPrice}
        </div>
        <Button
          label={isLoading ? "Processing" : "Pay now"}
          disabled={isLoading || !stripe || !elements}
          onClick={() => {}}
        />
      </form>
    </>
  );
};
