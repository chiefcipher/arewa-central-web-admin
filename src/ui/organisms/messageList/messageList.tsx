import React, { useEffect, useState } from "react";
import styles from "./messageList.module.scss";
import { I_Notification, I_Product } from "../../../typescript/interfaces";
import { LoadingUI } from "../../atoms/loadingUI/loadingUI";
import { formatCurrency, formatDate } from "../../../typescript/utils";
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
export const MessageList = () => {
  const [sampleNotification, setSampleNotification] =
    useState<I_Notification | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsPerPage, setViewPerPage] = useState(20);
  useEffect(() => {
    if (!sampleNotification) {
      setTimeout(() => {
        // simulate getting products
        setSampleNotification({
          sender: "Admin 1",
          title: "Update bank details",
          content: "Kindly update bank details to process refund",
          priority: "high",
          date: Date.now(),
          id: "random-id",
          recipientEmail: "user1@gmail.com",
        });
      }, 1000);
    }
  }, []);

  const notification_size = 4000; //todo comes from api
  const totalPages = Math.ceil(notification_size / viewsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // use effect for pagination
    const totalPages = Math.ceil(notification_size / viewsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [viewsPerPage, currentPage]);

  if (!sampleNotification) return <LoadingUI />;

  return (
    <div className={styles.list}>
      <TopFilter
        searchValue={searchValue}
        viewsPerPage={viewsPerPage}
        sectionName="Messages"
        addNewLink="create"
        sectionSize={notification_size}
        searchInputPlaceholder="Search by email"
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
                <span>Recipient Email</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Title</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Priority</span>
                <FilterIcon />
              </th>
              <th>
                <span>Sent By</span>
                <FilterIcon />{" "}
              </th>

              <th>
                <span>Date Sent</span>
                <FilterIcon />{" "}
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array(viewsPerPage)
              .fill(sampleNotification)
              .map(
                ({ sender, title, priority, date, id, recipientEmail }, i) => (
                  <tr key={i + 1}>
                    <td>{viewsPerPage * (currentPage - 1) + i + 1}</td>
                    <td>{recipientEmail}</td>
                    <td>{title}</td>
                    <td>{priority}</td>

                    <td>{sender}</td>
                    <td>{formatDate(date)}</td>
                    <td className={"actionsTd"}>
                      <p>
                        <Link to={"edit/" + id} className={"tableEditCta"}>
                          <EditIcon />
                        </Link>
                        <Link to={id} className={"tableViewCta"}>
                          <ViewIcon />
                        </Link>
                        <Link
                          to={`delete/${id}?name=${title}`}
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
