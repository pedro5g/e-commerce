"use client";

import { Order } from "@/@types/order-types";
import { ProductWithReviews } from "@/@types/product-types";
import { User } from "@/@types/user-type";
import { Button } from "@/app/components/Button";
import { Heading } from "@/app/components/Heading";
import { Input } from "@/app/components/inputs/Input";
import { Rating } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: ProductWithReviews;
  user?: (User & { orders: Order[] }) | null;
}

export const AddRating = ({ product, user }: AddRatingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (key: string, value: any) => {
    setValue(key, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No rating selected");
    }

    axios
      .post("/api/rating", {
        comment: data.comment,
        rating: data.rating,
        userId: user?.id,
        product: product,
      })
      .then(() => {
        toast.success("Rating submitted");
        route.refresh();
        reset();
      })
      .catch((e) => {
        toast.error("Something went wrong");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  const deliveredOrder = user.orders.some((order) => {
    return (
      order.products.find((p) => p.id === product.id) &&
      order.deliveryStatus === "delivered"
    );
  });

  const userReview = product.reviews.find((review) => {
    return review.userId === user.id;
  });

  if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this Product" />
      <Rating onChange={(e, newValue) => setCustomValue("rating", newValue)} />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading" : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};
