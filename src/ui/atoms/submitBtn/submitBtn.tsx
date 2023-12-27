import React from "react";
import styles from "./submitBtn.module.scss";
import { LoaderIcon } from "../../../shared/assets";
// submit btn is already a styled version of async button
// submit btn is used in form areas like create category, create product, etc
interface I_SubmitBtnProps {
  isAsync: boolean;
  text: string;
  handleSubmit: () => void;
}
export function SubmitBtn({
  isAsync,
  text,
  handleSubmit,
}: I_SubmitBtnProps): JSX.Element {
  return (
    <button className={styles.submitBtn} onSubmit={handleSubmit} type="submit">
      {isAsync ? <LoaderIcon /> : <span>{text}</span>}
    </button>
  );
}
