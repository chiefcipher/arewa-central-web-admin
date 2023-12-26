import styles from "./comingSoonUI.module.scss";
import { Icon } from "@iconify/react";
export function ComingSoonUI() {
  return (
    <div className={styles.comingSoon}>
      <Icon icon="carbon:time" />

      <h3>
        Kindly exercise patience, our developers are working tirelessly to make
        this feature would be available soon.
      </h3>
    </div>
  );
}
