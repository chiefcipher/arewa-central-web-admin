import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./authLayout.module.scss";
export function AuthLayout(): JSX.Element {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
}
