"use client";

import { useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { ChangeEvent } from "react";

import s from "./search.module.css";

export const Search: React.FC<{ placeholder: string; label: string }> = ({ label, placeholder }) => {
  const updateQuery = useUpdateQueryParam();
  const searchParams = useSearchParams();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        updateQuery("search", value);
      }, 500);
    },
    [updateQuery]
  );
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <search className={s.search}>
      <input
        className={s.input}
        type="search"
        aria-label={label}
        placeholder={placeholder}
        defaultValue={searchParams.get("search") || ""}
        onChange={handleInputChange}
      />
    </search>
  );
};
