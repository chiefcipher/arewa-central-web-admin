import { Link } from "react-router-dom";
import styles from "./errorUI.module.scss";
import { Icon } from "@iconify/react";
export function ErrorUI({ type }: { type: 404 | 500 }) {
  return (
    <div className={styles.errorUI}>
      <Icon icon="material-symbols:error" />
      {type === 500 && (
        <h3>An error occurred, check internet connection and try again</h3>
      )}
      {type === 404 && (
        <>
          <h3>404 Page not found.</h3>
          <Link to={"/"}>Go to home page</Link>
        </>
      )}
    </div>
  );
}
