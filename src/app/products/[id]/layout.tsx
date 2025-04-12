import s from "./layout.module.css";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={s.wrapper}>{children}</div>;
}
