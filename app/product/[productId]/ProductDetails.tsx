"use client";

import { Button } from "@/app/components/Button";
import { ProductImage } from "@/app/components/ProductImage";
import { SetColor } from "@/app/components/products/SetColor";
import { SetQuantity } from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { MdCheckCircle } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import {
  ProductInCart,
  ProductWithReviews,
  UploadedImageType,
} from "@/@types/product-types";

const Horizontal = () => {
  return <hr className=" w-[30%] my-2" />;
};

export interface ProductDetailsProps {
  product: ProductWithReviews;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  // formatting the product to salve within cart
  const INITIAL_CART_PRODUCT_STATE = {
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    category: product.category,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  };
  const { handleAddProductToCard, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<ProductInCart>(
    INITIAL_CART_PRODUCT_STATE
  );

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct.quantity]);

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, []);

  const handleSetColor = useCallback((value: UploadedImageType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const productRating =
    product.reviews.reduce((ass, item) => item.reting + ass, 0) /
    product.reviews.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleSetColor}
      />
      <div className=" flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className=" text-2xl font-medium text-zinc-700 ">{product.name}</h2>
        <div className=" text-zinc-900">{formatPrice(product.price)}</div>
        <div className=" flex items-center gap-3">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className=" text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className=" font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className=" font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div
          data-stock={product.inStock}
          className="data-[stock=true]:text-green-500 text-rose-500">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className=" mb-2 text-slate-500 flex items-center gap-2">
              <MdCheckCircle className=" text-green-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className=" max-w-[300px]">
              <Button
                label="View cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleSetColor={handleSetColor}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className=" max-w-[300px]">
              <Button
                onClick={() => handleAddProductToCard(cartProduct)}
                label="Add To Cart"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
