import { ProductCard as ProductCardProps } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import s from "./product-card.module.css";

export const ProductCard: React.FC<ProductCardProps> = ({ id, brand, name, basePrice, imageUrl }) => {
  return (
    <Link className={s.card__link} href={`/products/${id}`}>
      <article className={s.card}>
        <Image priority className={s.card__img} src={imageUrl} alt={`${name} product image`} width={345} height={290} />
        <div className={s.card__info}>
          <p className={s.card__overTitle}>{brand}</p>
          <h3 className={s.card__title}>{name}</h3>
          <p className={s.card__price}>
            {basePrice} <span>EUR</span>
          </p>
        </div>
      </article>
    </Link>
  );
};
