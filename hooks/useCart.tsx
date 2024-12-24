import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { IoAlertCircle } from "react-icons/io5";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCard: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymenteIntent: (value: string | null) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, SetCartTotalAmount] = useState(0);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems = localStorage.getItem("eCommerceCartItems");
    const eCommercePaymentIntent = localStorage.getItem(
      "eCommercePaymentIntent"
    );

    if (eCommercePaymentIntent) {
      const paymentIntent: string | null = JSON.parse(eCommercePaymentIntent);

      setPaymentIntent(paymentIntent);
    }

    if (cartItems) {
      const cProducts: CartProductType[] | null = JSON.parse(cartItems);

      setCartProducts(cProducts);
    }
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (!cartProducts) return;
      const { qty, total } = cartProducts.reduce(
        (acc, item) => {
          const itemTotal = item.price * item.quantity;
          acc.total += itemTotal;
          acc.qty += item.quantity;

          return acc;
        },
        {
          total: 0,
          qty: 0,
        }
      );

      setCartTotalQty(qty);
      SetCartTotalAmount(total);
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCard = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to cart");
      localStorage.setItem("eCommerceCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProduct);

        toast.success("Product removed to cart");
        localStorage.setItem(
          "eCommerceCartItems",
          JSON.stringify(filteredProduct)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      const MAX_REACHED = 99;
      if (product.quantity === MAX_REACHED) {
        toast.error("Ops! Maximum reached");
        return;
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex((item) => {
          return item.id === product.id;
        });
        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = ++updateCart[existingIndex]
            .quantity;
        }

        setCartProducts(updateCart);
        localStorage.setItem("eCommerceCartItems", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      const MIN_REACHED = 1;
      if (product.quantity === MIN_REACHED) {
        toast.error("Minimum allowed", {
          icon: <IoAlertCircle size={24} />,
        });
        return;
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex((item) => {
          return item.id === product.id;
        });
        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = --updateCart[existingIndex]
            .quantity;
        }

        setCartProducts(updateCart);
        localStorage.setItem("eCommerceCartItems", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartTotalQty(0);
    setCartProducts(null);
    localStorage.setItem("eCommerceCartItems", JSON.stringify(null));
  }, []);

  const handleSetPaymenteIntent = useCallback((value: string | null) => {
    setPaymentIntent(value);
    localStorage.setItem("eCommercePaymentIntent", JSON.stringify(value));
  }, []);

  const value = {
    paymentIntent,
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCard,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymenteIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvide.");
  }

  return context;
};
