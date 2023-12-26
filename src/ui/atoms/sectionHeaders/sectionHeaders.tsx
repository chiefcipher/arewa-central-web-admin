import styles from "./sectionHeaders.module.scss";
import React from "react";
export const SubSectionHeader = ({ children }: { children: any }) => (
  <h3 className={styles.subHeader}> {children}</h3>
);

export const SectionHeader = ({ children }: { children: any }) => (
  <h2 tabIndex={0} className={styles.mainHeader}>
    {children}
  </h2>
);
