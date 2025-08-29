"use client";

import styles from "@/app/auth/auth-theme.module.css";

export default function BandedBackground() {
  return (
    <div aria-hidden className={styles.bands}>
      <div className={`${styles.band} ${styles.b1}`}></div>
      <div className={`${styles.band} ${styles.b2}`}></div>
      <div className={`${styles.band} ${styles.b3}`}></div>
    </div>
  );
}
