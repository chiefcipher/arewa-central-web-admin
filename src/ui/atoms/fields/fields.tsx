import React, { ChangeEvent } from "react";
import styles from "./fields.module.scss";
interface I_FieldProp {
  name: string;
  value: string | number;
  handleChange: (a: ChangeEvent<any>) => void;
  type: "text" | "tel" | "number";
  placeholder: string;
  error?: string | false;
  label: string;
}
export function PrimaryField({
  name,
  value,
  handleChange,
  error,
  type,
  placeholder,
  label,
}: I_FieldProp): JSX.Element {
  return (
    <p className={styles.primaryField}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
      />
      <span>{error ? error : ""}</span>
    </p>
  );
}

interface I_ViewFieldProp {
  name: string;
  value: string | number;
  type: string;
  label: string;
}
// only used for read only stuff no change handler

export function PrimaryViewField({
  name,
  value,
  type,
  label,
}: I_ViewFieldProp): JSX.Element {
  return (
    <p className={styles.primaryField}>
      <label htmlFor={name}>{label}</label>
      <input type={type} readOnly value={value} name={name} />
    </p>
  );
}
