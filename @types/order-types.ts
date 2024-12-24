import { User } from "./user-type";

export type Order = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  deliveryStatus: string | null;
  createDate: Date;
  paymentIntentId: string;
} & {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    quantity: number;
    selectedImg: {
      color: string;
      colorCode: string;
      image: string;
    };
  }[];
};

export interface OrderFromUser extends Order {
  user: User;
}
