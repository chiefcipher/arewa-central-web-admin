import React from "react";
import styles from "./topFilter.module.scss";
import { Link } from "react-router-dom";
interface I_TopFilterProps {
  sectionName: string;
  sectionSize: number;
  addNewLink: string;
  viewsPerPage: number;
  searchValue: string;
  handleSearchValue: (a: string) => void;
  handleViewsPerPage: (a: number) => void;
}
export function TopFilter({
  sectionName,
  sectionSize,
  addNewLink,
  searchValue,
  handleSearchValue,
  viewsPerPage,
  handleViewsPerPage,
}: I_TopFilterProps): JSX.Element {
  return (
    <div className={styles.topFilter}>
      <h2>
        {sectionName} ({sectionSize})
      </h2>
      <div>
        <Link className={styles.addNewCta} to={addNewLink}>
          + Add new
        </Link>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          onChange={(e) => handleSearchValue(e.target.value)}
        />
        <p className={styles.viewsText}>
          View Per Page <span>(min :20, max:500)</span>
        </p>
        <input
          type="number"
          placeholder={`${viewsPerPage}`}
          value={viewsPerPage}
          className={styles.viewsInput}
          onChange={(e) => handleViewsPerPage(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
