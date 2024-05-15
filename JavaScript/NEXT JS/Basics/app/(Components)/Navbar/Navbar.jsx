import Link from "next/link";
import styles from './styles.module.css'

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      Navbar
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contacts">Contacts</Link>
      <Link href="/counter">Counter</Link>
      <Link href="/products">Products</Link>
      <Link href="/docs">Docs</Link>
      <Link href="/docs-2">Docs-2</Link>
    </div>
  );
};

export default Navbar;
