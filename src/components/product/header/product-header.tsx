"use client";

import { Product } from "@/types/product";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import s from "./product-header.module.css";

type Props = Pick<Product, "id" | "name" | "brand" | "storageOptions" | "colorOptions"> & {
  currentStorage: string;
  currentColor: string;
};

export const ProductHeader: React.FC<Props> = ({
  id,
  name,
  brand,
  storageOptions,
  colorOptions,
  currentStorage,
  currentColor,
}) => {
  const updateQuery = useUpdateQueryParam();
  const cart = useCart();
  const selectedStorage = storageOptions.find((option) => option.capacity === currentStorage) || storageOptions[0];
  const selectedColor = colorOptions.find((option) => option.name === currentColor) || colorOptions[0];

  const handleAddToCart = () => {
    cart.addToCart(
      { id, name, brand, basePrice: storageOptions[0].price, colorOptions, storageOptions },
      currentColor,
      currentStorage
    );
  };

  return (
    <header className={s.header}>
      <div className={s.image_wrapper}>
        <Image
          className={s.image}
          priority
          src={selectedColor.imageUrl}
          alt={`${name} ${selectedColor.name} product picture`}
          width={510}
          height={630}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={s.header_info}>
        <h1 className={s.title}>{name}</h1>
        <p className={s.price}>
          {selectedStorage.price} <span>EUR</span>
        </p>
        <p className={s.label}>storage: how much do you need?</p>
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
        <p className={s.label}>color: pick your favorite</p>
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
        <button className={s.add_button} onClick={handleAddToCart}>
          añadir
        </button>
      </div>
    </header>
  );
};
