import Link from "next/link";
import s from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <h1 className={s.title}>Página no disponible</h1>
      <p className={s.description}>Lo sentidmos. No pudimos encontrar la páginas que estabas buscando.</p>
      <Link className={s.button} href="/">
        Volver a la tienda
      </Link>
    </>
  );
}
