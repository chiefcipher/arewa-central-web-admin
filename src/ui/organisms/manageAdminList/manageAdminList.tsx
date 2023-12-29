import React, { useEffect, useState } from "react";
import styles from "./manageAdminList.module.scss";
import { I_User } from "../../../typescript/interfaces";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import {
  DeleteIcon,
  EditIcon,
  FilterIcon,
  ViewIcon,
} from "../../../shared/assets";
import { Link } from "react-router-dom";
import { TopFilter } from "../../molecules/topFilter/topFilter";
import { Pagination } from "../../molecules/pagination/pagination";
import { Icon } from "@iconify/react";
export const ManageAdminList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsPerPage, setViewPerPage] = useState(20);
  const [sampleAdmin, setSampleAdmin] = useState<I_User | null>(null);
  useEffect(() => {
    if (!sampleAdmin) {
      setTimeout(() => {
        // simulate getting products
        setSampleAdmin({
          id: "random-id",
          email: "admin1@gmail.com",
          tel: "2349075859285",
          gender: "M",
          role: "admin",
          isVerifiedEmail: false,
          // isActive: true,
        });
      }, 1000);
    }
  }, [sampleAdmin]);

  const admin_size = 4000; //todo comes from api
  const totalPages = Math.ceil(admin_size / viewsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // use effect for pagination
    const totalPages = Math.ceil(admin_size / viewsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [viewsPerPage, currentPage]);

  if (!sampleAdmin) return <LoadingUI />;

  return (
    <div className={styles.list}>
      <TopFilter
        searchValue={searchValue}
        viewsPerPage={viewsPerPage}
        sectionName="Admin List"
        addNewLink="#"
        sectionSize={admin_size}
        searchInputPlaceholder="Search by order id"
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
                <span>Admin Email</span>
                <FilterIcon />{" "}
              </th>

              <th>
                <span>Telephone</span>
                <FilterIcon />
              </th>
              <th>
                <span>Gender</span>
                <FilterIcon />{" "}
              </th>

              <th>
                <span>Role</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Email Verified</span>
                <FilterIcon />{" "}
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array(viewsPerPage)
              .fill(sampleAdmin)
              .map((admin, i) => (
                <tr key={i + 1}>
                  <td>{viewsPerPage * (currentPage - 1) + i + 1}</td>
                  <td>{admin.email}</td>
                  <td>{admin.tel}</td>

                  <td>{admin.gender}</td>
                  <td>{admin.role}</td>
                  <td>
                    {admin.isVerifiedEmail ? (
                      <button className={"greenTableBtn"} title="Delivered">
                        <Icon icon="mdi:package-delivered" />
                        <span>Verified</span>
                      </button>
                    ) : (
                      <button className={"redTableButton"} title="Pending">
                        <Icon icon="material-symbols-light:cancel" />
                        <span>Not Verified</span>
                      </button>
                    )}
                  </td>
                  <td className={"actionsTd"}>
                    <p>
                      <Link to={"edit/" + admin.id} className={"tableEditCta"}>
                        <EditIcon />
                      </Link>
                      <Link to={admin.id} className={"tableViewCta"}>
                        <ViewIcon />
                      </Link>
                      <Link
                        to={`delete/${admin.id}?name=${admin.email}`}
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
