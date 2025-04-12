import s from "./layout.module.css";
import { BackButton } from "@/components/shared/back-button/back-button";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackButton />
      <div className={s.wrapper}>{children}</div>
    </>
  );
}
