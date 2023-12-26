import React from "react";
import styles from "./pagination.module.scss";

interface I_pagination_prop {
  handlePageChange: (a: number) => void;
  currentPage: number;
  totalPages: number;
}
export function Pagination({
  handlePageChange,
  currentPage,
  totalPages,
}: I_pagination_prop): JSX.Element {
  return (
    <div className={styles.pagination}>
      <p>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </p>
    </div>
  );
}
