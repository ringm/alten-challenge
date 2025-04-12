const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

interface CustomFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const customFetch = async <T>(url: string, options: CustomFetchOptions = {}): Promise<T> => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    ...options.headers,
  };

  const newOptions: RequestInit = {
    ...options,
    headers: defaultHeaders,
  };

  const res = await fetch(url, newOptions);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
  return (await res.json()) as T;
};
