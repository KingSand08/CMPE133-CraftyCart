import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>CraftyCart</h2>
        <a href="/account">Account</a>

      </div>
    </main>
  );
}
