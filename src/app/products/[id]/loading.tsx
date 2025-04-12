import s from "./loading.module.css";

export default function Loading() {
  return (
    <div className={s.container}>
      <p className={s.label}>Loading product...</p>
    </div>
  );
}
