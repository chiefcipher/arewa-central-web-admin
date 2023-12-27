import React from "react";
import styles from "./asyncButton.module.scss";
import { LoaderIcon } from "../../../shared/assets";
interface I_AsyncBtnProps {
  isAsync: boolean;
  text: string;
  handleSubmit: () => void;
}
export const AsyncButton = ({
  isAsync,
  text,
  handleSubmit,
}: I_AsyncBtnProps) => {
  return (
    <button className={styles.asyncBtn} onSubmit={handleSubmit} type="submit">
      {isAsync ? <LoaderIcon /> : <span>{text}</span>}
    </button>
  );
};
