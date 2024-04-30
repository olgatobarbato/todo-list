import styles from "./index.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";

const User = () => {
  const [currentMonth, setCurrentMonth] = useState("");
  const date = new Date();

  useEffect(() => {
    const monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    const monthIndex = date.getMonth();
    setCurrentMonth(monthNames[monthIndex]);
  }, []);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <h3>Ciao Olga</h3>
        <p>{currentMonth}</p>
      </label>
      <Image
        src="https://anitar.dev/get/r"
        alt="Anitar"
        width={80}
        height={80}
        className={styles.image}
      />
    </div>
  );
};

export default User;
