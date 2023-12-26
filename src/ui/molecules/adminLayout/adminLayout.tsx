import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import { Navigation } from "../navigation/navigation";
import styles from "./adminLayout.module.scss";
export function AdminLayout(): JSX.Element {
  return (
    <div className={styles.adminLayout}>
      <div>
        <Navigation />
      </div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
