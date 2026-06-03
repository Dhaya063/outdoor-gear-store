import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import styles from "./ProductPage.module.scss";

import ProductGallery from "../components/ProductGallery/ProductGallery";
import ColorSelector from "../components/ColorSelector/ColorSelector";
import SizeSelector from "../components/SizeSelector/SizeSelector";
import QuantityPicker from "../components/QuantityPicker/QuantityPicker";
import { colorImages } from "../data/colorImages";

import { variants } from "../data/variants";

import { useCart } from "../../cart/hooks/useCart";
import CartSidebar from "../../cart/components/CartSidebar";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductPage() {
  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const { addItem, items } =
    useCart();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const [selectedColor, setSelectedColor] =
    useState(
      searchParams.get("color") || "Black"
    );

  const [selectedSize, setSelectedSize] =
  useState(
    searchParams.get("size") || "15L"
  );

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response =
          await axios.get<Product>(
            "https://fakestoreapi.com/products/1"
          );

        setProduct(response.data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    setSearchParams({
      color: selectedColor,
      size: selectedSize,
    });
  }, [
    selectedColor,
    selectedSize,
    setSearchParams,
  ]);

  const selectedVariant =
    variants.find(
      (variant) =>
        variant.color === selectedColor &&
        variant.size === selectedSize
    );

  const stock =
    selectedVariant?.stock ?? 0;

  const cartItem = items.find(
    (item) =>
      item.productId === product?.id &&
      item.color === selectedColor &&
      item.size === selectedSize
  );

  const alreadyInCart =
    cartItem?.quantity ?? 0;

  const remainingStock =
    stock - alreadyInCart;

  const reachedLimit =
    remainingStock <= 0;

  useEffect(() => {
    if (
      quantity > remainingStock &&
      remainingStock > 0
    ) {
      setQuantity(remainingStock);
    }
  }, [
    quantity,
    remainingStock,
  ]);

  const handleAddToCart = () => {
    if (!product) return;

    if (reachedLimit) return;

    addItem({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      stock,
    });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <h2>No Product Found</h2>
      </div>
    );
  }

  const galleryImages =
  colorImages[
    selectedColor as keyof typeof colorImages
  ] || [product.image];

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.productSection}>
          <div className={styles.container}>
            <ProductGallery
              images={galleryImages}
              title={product.title}
            />

            <div className={styles.productInfo}>
              <h1 className={styles.title}>
                {product.title}
              </h1>

              <div className={styles.price}>
                ${product.price}
              </div>

              <p
                className={
                  styles.description
                }
              >
                {product.description}
              </p>

              <ColorSelector
                selectedColor={
                  selectedColor
                }
                onSelect={(color) => {
                  setSelectedColor(
                    color
                  );

                  const availableSize =
                    variants.find(
                      (variant) =>
                        variant.color ===
                          color &&
                        variant.stock > 0
                    );

                  if (
                    availableSize
                  ) {
                    setSelectedSize(
                      availableSize.size
                    );
                  }

                  setQuantity(1);
                }}
              />

              <SizeSelector
                variants={variants}
                selectedColor={
                  selectedColor
                }
                selectedSize={
                  selectedSize
                }
                onSelect={(size) => {
                  setSelectedSize(
                    size
                  );

                  setQuantity(1);
                }}
              />

              {stock > 0 &&
                stock <= 2 && (
                  <p
                    className={
                      styles.lowStock
                    }
                  >
                    Only {stock} left
                    in stock
                  </p>
                )}

              {stock === 0 && (
                <p
                  className={
                    styles.soldOut
                  }
                >
                  Sold Out
                </p>
              )}

              <QuantityPicker
                quantity={quantity}
                max={
                  remainingStock > 0
                    ? remainingStock
                    : 1
                }
                onChange={
                  setQuantity
                }
              />

              <button
                className={
                  styles.addToCart
                }
                disabled={
                  stock === 0 ||
                  reachedLimit
                }
                onClick={
                  handleAddToCart
                }
              >
                {reachedLimit
                  ? "Max Quantity Reached"
                  : "Add To Cart"}
              </button>

              {stock > 0 && (
                <p
                  className={
                    styles.delivery
                  }
                >
                  Estimated
                  Delivery:
                  Tomorrow
                </p>
              )}
            </div>
          </div>
        </div>

        <CartSidebar />
      </div>
    </div>
  );
}