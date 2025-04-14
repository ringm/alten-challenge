import { ProductCard as ProductCardProps } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import s from "./product-card.module.css";

export const ProductCard: React.FC<ProductCardProps & { currency: string; idx?: number }> = ({
  idx,
  id,
  brand,
  name,
  basePrice,
  imageUrl,
  currency,
}) => {
  const shouldPreload = idx ? idx <= 3 : false;
  return (
    <Link prefetch={false} className={s.link} href={`/products/${id}`}>
      <article data-testid="product-card" className={s.card}>
        <div className={s.img_wrapper}>
          <Image
            priority={shouldPreload}
            className={s.img}
            src={imageUrl}
            alt={`${name} product image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, (max-width: 1540px) 25vw, 20vw"
          />
        </div>
        <div className={s.info}>
          <p className={s.overTitle}>{brand}</p>
          <h3 className={s.title}>{name}</h3>
          <p className={s.price}>
            {basePrice} <span>{currency}</span>
          </p>
        </div>
      </article>
    </Link>
  );
};
