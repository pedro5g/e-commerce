"use client";

import { Rating } from "@mui/material";
import { Heading } from "@/app/components/Heading";
import moment from "moment";
import { Avatar } from "@/app/components/Avatar";
import { ProductWithReviews } from "@/@types/product-types";

interface ListRatingProps {
  product: ProductWithReviews;
}

export const ListRating = ({ product }: ListRatingProps) => {
  if (!product.reviews.length) return null;
  return (
    <div>
      <Heading title="Product Review" />
      <div className=" text-sm mt-2 ">
        {product.reviews &&
          product.reviews.map((review) => {
            return (
              <div key={review.id} className=" max-w-[300px]">
                <div className=" flex items-center gap-2">
                  <Avatar src={review.user.image} />
                  <div className=" font-semibold">{review.user.name}</div>
                  <div>{moment(review.createdDate).fromNow()}</div>
                </div>
                <div className="mt-2">
                  <p className=" ml-1">{review.comment}</p>
                  <Rating value={review.reting} readOnly />
                  <hr className=" my-8" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
