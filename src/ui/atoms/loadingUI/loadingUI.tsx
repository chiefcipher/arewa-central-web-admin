import styles from "./loadingUI.module.scss";
import { Icon } from "@iconify/react";
export function LoadingUI() {
  return (
    <div className={styles.loadingUI}>
      <Icon icon="gg:spinner-two" />
      <h3>Loading...</h3>
    </div>
  );
}
