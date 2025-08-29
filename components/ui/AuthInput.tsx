"use client";

import styles from "@/app/auth/auth-theme.module.css";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  hint?: string;
  error?: string;
  success?: boolean;
};

export default function AuthInput({ label, icon, trailing, hint, error, success, className, ...rest }: Props) {
  const wrapClass = [styles.inputWrap, error ? styles.error : "", success ? styles.success : ""].join(" ");
  const controlClass = [
    styles.inputControl,
    icon ? styles.withIcon : "",
    trailing ? styles.withTrailing : "",
    className || "",
  ].join(" ");
  return (
    <div>
      <div className={wrapClass}>
        {icon && <span className={styles.iconSlot}>{icon}</span>}
        <input {...rest} placeholder=" " className={controlClass} />
        <label className={`${styles.inputLabel} ${styles.labelBg}`}>{label}</label>
        {trailing && <span className={styles.trailingSlot}>{trailing}</span>}
      </div>
      {error ? (
        <div className={styles.errorText}>{error}</div>
      ) : hint ? (
        <div className={styles.hintText}>{hint}</div>
      ) : null}
    </div>
  );
}
