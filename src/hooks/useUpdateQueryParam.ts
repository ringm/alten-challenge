import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export type ParamKey = "storage" | "color" | "search";

export const useUpdateQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryParam = useCallback(
    (key: ParamKey, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, searchParams, pathname]
  );

  return updateQueryParam;
};
