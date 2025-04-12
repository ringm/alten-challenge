"use client";

import { useRef } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/card/product-card";
import { useCustomScrollbar } from "@/hooks/useCustomScrollbar";
import s from "./similar-products.module.css";

interface Props {
  title: string;
  similarProducts: Product["similarProducts"];
}

export const SimilarProducts: React.FC<Props> = ({ title, similarProducts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useCustomScrollbar(containerRef, trackRef, thumbRef);

  return (
    <section className={s.section}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.slider_wrapper}>
        <div ref={containerRef} className={s.slider_container}>
          <div className={s.slider}>
            {similarProducts.map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} {...product} />
            ))}
          </div>
        </div>
      </div>
      <div ref={trackRef} className={s.scrollbar}>
        <div ref={thumbRef} className={s.scrollbar_position}></div>
      </div>
    </section>
  );
};
