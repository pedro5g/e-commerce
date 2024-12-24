import { Review } from "./review-type";
import { User } from "./user-type";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: UploadedImageType[];
};

export type ProductInCart = {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  selectedImg: {
    color: string;
    colorCode: string;
    image: string;
  };
};

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null | string;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export interface Reviews extends Review {
  user: User;
}

export type ProductWithReviews = Product & { reviews: Reviews[] };
