import styles from "./page.module.css";

import Header from "../ui/Header.js";


export default function Account() {
  return (
    <main className={styles.main}> 
      <Header name="CraftyCart" />
      <p>Here is where you can manage your account.</p>
    </main>
  );
}

