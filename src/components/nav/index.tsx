import Link from "next/link";
import { CompanyLogo } from "@/icons/company-logo";
import { BagIcon } from "@/icons/bag";
import { CartCounter } from "@/components/cart/counter/counter";
import styles from "./nav.module.css";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <CompanyLogo />
      </Link>
      <Link href="/cart">
        <div className={styles.cart}>
          <BagIcon />
          <CartCounter />
        </div>
      </Link>
    </nav>
  );
};
