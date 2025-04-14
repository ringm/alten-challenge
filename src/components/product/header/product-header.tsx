"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import Image from "next/image";
import s from "./product-header.module.css";

type Props = Pick<Product, "id" | "name" | "brand" | "storageOptions" | "colorOptions"> & {
  currentStorage: string;
  currentColor: string;
  storageLabel: string;
  colorLabel: string;
  addButtonLabel: string;
  productInCartLabel: string;
};

export const ProductHeader: React.FC<Props> = ({
  id,
  name,
  storageOptions,
  colorOptions,
  currentStorage,
  currentColor,
  storageLabel,
  colorLabel,
  addButtonLabel,
  productInCartLabel,
}) => {
  const [showTip, setShowTip] = useState(false);
  const updateQuery = useUpdateQueryParam();
  const isClient = useIsClient();
  const cart = useCart();
  const selectedStorage = storageOptions.find((option) => option.capacity === currentStorage) || storageOptions[0];
  const selectedColor = colorOptions.find((option) => option.name === currentColor) || colorOptions[0];
  const isInCart = cart.items.some(
    (item) =>
      item.id === id &&
      item.color.imageUrl === selectedColor.imageUrl &&
      item.storage.capacity === selectedStorage.capacity
  );

  const handleAddToCart = () => {
    cart.addToCart({ id, name, color: selectedColor, storage: selectedStorage });
    setShowTip(true);
    setTimeout(() => {
      setShowTip(false);
    }, 3000);
  };

  return (
    <header className={s.header}>
      <div className={s.img_wrapper}>
        <Image
          priority
          className={s.img}
          src={selectedColor.imageUrl}
          alt={`${name} ${selectedColor.name} product picture`}
          fill
          sizes="(max-width: 768px) 100vw, 50%"
        />
      </div>
      <div className={s.info}>
        <h2 className={s.title}>{name}</h2>
        <p className={s.price}>
          {selectedStorage.price} <span>EUR</span>
        </p>
        <p className={s.label}>{storageLabel}</p>
        <div className={s.storage_container}>
          {storageOptions.map((storage) => (
            <button
              key={storage.capacity}
              className={s.storage_button}
              data-current={selectedStorage.capacity === storage.capacity}
              onClick={() => updateQuery("storage", storage.capacity)}
            >
              {storage.capacity}
            </button>
          ))}
        </div>
        <p className={s.label}>{colorLabel}</p>
        <div className={s.colors_container}>
          {colorOptions.map((color) => (
            <button
              key={color.hexCode}
              className={s.color_button}
              style={{ backgroundColor: color.hexCode }}
              title={color.name}
              data-current={selectedColor.name === color.name}
              onClick={() => updateQuery("color", color.name)}
            ></button>
          ))}
        </div>
        <p className={s.color_name}>{selectedColor.name}</p>
        <button
          className={s.add_button}
          disabled={isClient ? isInCart : true}
          data-show-tip={showTip}
          onClick={handleAddToCart}
        >
          {isClient && isInCart ? productInCartLabel : addButtonLabel}
        </button>
      </div>
    </header>
  );
};
