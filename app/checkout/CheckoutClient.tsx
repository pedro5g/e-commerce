"use client";

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutForm } from "./CheckoutForm";
import { Button } from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CheckoutClient = () => {
  //utils
  const router = useRouter();

  //states
  const { cartProducts, paymentIntent, handleSetPaymenteIntent } = useCart();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  console.log("paymentintent", paymentIntent);
  console.log("clienteSecret", clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts.map((product) => {
            const { inStock, ...rest } = product;

            return { ...rest };
          }),
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymenteIntent(data.paymentIntent.id);
        })
        .catch((err) => {
          setError(true);
          console.error("Error", err);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, handleSetPaymenteIntent, paymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handlePaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
  return (
    <>
      <div className=" w-full">
        {clientSecret && cartProducts && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        )}
        {loading && <div className=" text-center">Loading Checkout...</div>}
        {error && (
          <div className=" text-center text-red-500">
            Something went wrong...
          </div>
        )}
        {paymentSuccess && (
          <div className=" flex items-center flex-col gap-4">
            <div className="  text-teal-500 text-center"> Payment Success</div>
            <div className=" max-w-[220px] w-full">
              <Button
                label="View Your Orders"
                onClick={() => router.push("/order")}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
