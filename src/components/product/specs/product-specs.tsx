import { Product } from "@/types/product";
import s from "./product-specs.module.css";

interface Props {
  specs: Product["specs"];
  name: Product["name"];
  brand: Product["brand"];
  description: Product["description"];
}

export const ProductSpecs: React.FC<Props> = ({ brand, name, description, specs }) => {
  const specsArr = Object.entries({ name, brand, description, ...specs });

  const formatKey = (keyString: string) => {
    if (!keyString) return "";
    const spaced = keyString.replace(/([A-Z])/g, " $1");
    return (spaced.charAt(0).toUpperCase() + spaced.slice(1)).trim();
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>Specifications</h2>
      <table className={s.table}>
        <tbody>
          {specsArr.map(([key, value]) => (
            <tr key={key} className={s.row}>
              <td className={`${s.spec_title} ${s.td}`}>{formatKey(key)}</td>
              <td className={s.td}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
