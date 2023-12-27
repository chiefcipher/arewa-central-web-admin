import React, { useEffect, useState } from "react";
import styles from "./productList.module.scss";
import { I_Product } from "../../../typescript/interfaces";
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
import { SAMPLE_PRODUCT } from "../../../shared/sampleProduct";
import { Icon } from "@iconify/react";
export const ProductList = () => {
  const [sampleProduct, setSampleProduct] = useState<I_Product | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsPerPage, setViewPerPage] = useState(20);
  useEffect(() => {
    if (!sampleProduct) {
      setTimeout(() => {
        // simulate getting category
        setSampleProduct(SAMPLE_PRODUCT);
      }, 3000);
    }
  }, []);

  const productSize = 4000; //todo comes from api
  const totalPages = Math.ceil(productSize / viewsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // use effect for pagination
    const totalPages = Math.ceil(productSize / viewsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [viewsPerPage, currentPage]);

  if (!sampleProduct) return <LoadingUI />;

  return (
    <div className={styles.categoryList}>
      <TopFilter
        searchValue={searchValue}
        viewsPerPage={viewsPerPage}
        sectionName="Products"
        addNewLink="add-new"
        sectionSize={productSize}
        // TODO SIZE COMES FROM API
        handleSearchValue={(v) => setSearchValue(v)}
        handleViewsPerPage={(v) =>
          setViewPerPage((x) => (v > -1 && v < 501 ? v : x))
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
              <th>
                <span>Category</span>
                <FilterIcon />
              </th>
              <th>
                <span>Product Size</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Price</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Discounted Price</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Ratings Count</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Ratings Average </span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Date Created</span>
                <FilterIcon />{" "}
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array(viewsPerPage)
              .fill(sampleProduct)
              .map(
                (
                  {
                    name,
                    category,
                    ratingsNumber,
                    ratingsAverage,
                    price,
                    discountedPrice,
                    quantityLeft,
                    createdAt,
                    id,
                  },
                  i
                ) => (
                  <tr key={i + 1}>
                    <td>{viewsPerPage * (currentPage - 1) + i + 1}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{quantityLeft}</td>
                    <td>{price}</td>
                    <td>{ratingsNumber}</td>
                    <td>{ratingsAverage}</td>
                    <td>{discountedPrice}</td>
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
                )
              )}
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
