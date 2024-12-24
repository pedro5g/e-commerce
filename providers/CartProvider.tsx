"use client";

import { CartContextProvider } from "@/hooks/useCart";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
