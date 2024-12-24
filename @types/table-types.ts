import { ImageType } from "./product-types";

export type RowProductType = {
  id: string;
  name: string;
  price: string;
  category: string;
  brand: string;
  inStock: boolean;
  images: ImageType[];
};

export type RowOrderType = {
  id: string;
  customer: string | null;
  amount: string;
  paymentStatus: string;
  date: string;
  deliveryStatus: string | null;
};
