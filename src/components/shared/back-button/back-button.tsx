"use client";

import { useRouter } from "next/navigation";
import { CaretLeft } from "@/icons/caret-left";
import s from "./back-button.module.css";

export const BackButton = () => {
  const router = useRouter();
  return (
    <button className={s.button} onClick={() => router.back()}>
      <CaretLeft />
      <span>back</span>
    </button>
  );
};
