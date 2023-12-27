import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.scss";
import { I_Category } from "../../../typescript/interfaces";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { formatDate } from "../../../typescript/utils";
import {
  DeleteIcon,
  EditIcon,
  FilterIcon,
  ViewIcon,
} from "../../../shared/assets";
import { Link } from "react-router-dom";
import { TopFilter } from "../../molecules/topFilter/topFilter";
import { Pagination } from "../../molecules/pagination/pagination";
export const CategoryList = () => {
  const [sampleCategory, setSampleCategory] = useState<I_Category | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsPerPage, setViewPerPage] = useState(20);
  useEffect(() => {
    if (!sampleCategory) {
      setTimeout(() => {
        // simulate getting category
        setSampleCategory({
          name: "Shoes",
          description: "A nice category",
          createdAt: Date.now(),
          productSize: 200,
          id: "radom-id",
        });
      }, 3000);
    }
  }, []);

  const categorySize = 10; //todo comes from api
  const totalPages = Math.ceil(categorySize / viewsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // use effect for pagination
    const totalPages = Math.ceil(categorySize / viewsPerPage);
    console.log("enterd effect");
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [viewsPerPage, currentPage]);

  if (!sampleCategory) return <LoadingUI />;

  return (
    <div className={styles.categoryList}>
      <TopFilter
        searchValue={searchValue}
        viewsPerPage={viewsPerPage}
        sectionName="Categories"
        addNewLink="add-new"
        sectionSize={categorySize}
        // TODO SIZE COMES FROM API
        handleSearchValue={(v) => setSearchValue(v)}
        handleViewsPerPage={(v) =>
          setViewPerPage((x) => (v > -1 && v <= categorySize ? v : x))
        }
      />
      <div className={styles.wrapper}>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>
                <span>Name</span>
                <FilterIcon />{" "}
              </th>

              <th>Description</th>
              <th>
                <span>Product Size</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Date Created </span>
                <FilterIcon />{" "}
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array(viewsPerPage)
              .fill(sampleCategory)
              .map(({ name, description, createdAt, productSize, id }, i) => (
                <tr key={i + 1}>
                  <td>{viewsPerPage * (currentPage - 1) + i + 1}</td>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{productSize}</td>
                  <td>{formatDate(createdAt)}</td>
                  <td className={"actionsTd"}>
                    <p>
                      <Link to={"edit/" + id} className={"tableEditCta"}>
                        <EditIcon />
                      </Link>
                      <Link to={id} className={"tableViewCta"}>
                        <ViewIcon />
                      </Link>
                      <Link
                        to={`delete/${id}?name=${name}`}
                        className={"tableDeleteCta"}
                      >
                        <DeleteIcon />
                      </Link>
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};
