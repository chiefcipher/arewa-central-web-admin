import React from "react";
import styles from "./navigation.module.scss";
import { SampleProfileImg } from "../../../shared/assets";
import { Pages } from "../../../shared/pages";
import { Link } from "react-router-dom";
export function Navigation(): JSX.Element {
  const profileName = "John Doe";
  return (
    <nav className={styles.nav}>
      <Link to={Pages.profile} className={styles.profile}>
        <img src={SampleProfileImg} alt={profileName} />
        <h3>{profileName}</h3>
      </Link>
    </nav>
  );
}
