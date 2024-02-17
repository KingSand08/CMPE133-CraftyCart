import styles from "../page.module.css";

export default function Header( {name} ){
  return (
    <header>
      <div className={styles.card}>{name}</div>
      <div className="user-account">User Account</div>
    </header>
  );
};

