import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { CartProvider } from "@/context/cart-context";

export const metadata: Metadata = {
  title: "MBST",
  description: "Alten Coding Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="wrapper">
            <Nav />
            <main>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
