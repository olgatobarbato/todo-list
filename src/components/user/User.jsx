import styles from "./index.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";

const User = () => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <h3>Ciao Olga</h3>
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
