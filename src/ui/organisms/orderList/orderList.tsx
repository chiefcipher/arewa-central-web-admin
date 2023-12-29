import React, { useEffect, useState } from "react";
import styles from "./orderList.module.scss";
import { I_Order } from "../../../typescript/interfaces";
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
import { E_Order_Remark, E_Order_Status } from "../../../typescript/enums";
import { SAMPLE_PRODUCT } from "../../../shared/sampleProduct";
import { Icon } from "@iconify/react";
export const OrderList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsPerPage, setViewPerPage] = useState(20);
  const [sampleOrder, setSampleOrder] = useState<I_Order | null>(null);
  useEffect(() => {
    if (!sampleOrder) {
      setTimeout(() => {
        // simulate getting products
        setSampleOrder({
          date: Date.now(),
          orderId: "2023-12-29+ABCD-DDDHDHDHD",
          status: E_Order_Status.declined,
          amount: 40000,
          id: "random-id",
          quantity: 10,
          userEmail: "user1@gmail.com",
          remark: E_Order_Remark.paid,
          orderItems: [SAMPLE_PRODUCT, SAMPLE_PRODUCT],
        });
      }, 1000);
    }
  }, [sampleOrder]);

  const order_size = 4000; //todo comes from api
  const totalPages = Math.ceil(order_size / viewsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // use effect for pagination
    const totalPages = Math.ceil(order_size / viewsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [viewsPerPage, currentPage]);

  if (!sampleOrder) return <LoadingUI />;

  return (
    <div className={styles.list}>
      <TopFilter
        searchValue={searchValue}
        viewsPerPage={viewsPerPage}
        sectionName="Order List"
        addNewLink="#"
        sectionSize={order_size}
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
                <span>User Email</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Order Id</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Price</span>
                <FilterIcon />
              </th>
              <th>
                <span>Quantity</span>
                <FilterIcon />{" "}
              </th>

              <th>
                <span>Status</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Remark</span>
                <FilterIcon />{" "}
              </th>
              <th>
                <span>Date</span>
                <FilterIcon />{" "}
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array(viewsPerPage)
              .fill(sampleOrder)
              .map(
                (
                  {
                    date,
                    orderId,
                    id,
                    userEmail,
                    quantity,
                    status,
                    amount,
                    remark,
                    orderItems,
                  },
                  i
                ) => (
                  <tr key={i + 1}>
                    <td>{viewsPerPage * (currentPage - 1) + i + 1}</td>
                    <td>{userEmail}</td>
                    <td>{orderId}</td>
                    <td>{formatCurrency(amount)}</td>

                    <td>{quantity}</td>
                    <td>
                      {status === E_Order_Status.delivered ? (
                        <button className={"greenTableBtn"} title="Delivered">
                          <Icon icon="mdi:package-delivered" />
                          <span>Delivered</span>
                        </button>
                      ) : status === E_Order_Status.processing ? (
                        <button className={"orangeTableBtn"} title="Pending">
                          <Icon icon="material-symbols-light:pending" />
                          <span>Processing</span>
                        </button>
                      ) : status === E_Order_Status.in_state_of_residence ? (
                        <button
                          className={"blueTableBtn"}
                          title="In state of residence"
                        >
                          <Icon icon="mingcute:location-fill" />
                          <span>In State</span>
                        </button>
                      ) : status === E_Order_Status.declined ? (
                        <button className={"redTableButton"} title="Declined">
                          <Icon icon="material-symbols-light:cancel" />
                          <span>Declined</span>
                        </button>
                      ) : (
                        <button className={"blueTableBtn"} title="On transit">
                          <Icon icon="ph:car-fill" />
                          <span>On Transit</span>
                        </button>
                      )}
                    </td>
                    <td>{remark}</td>
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
                          to={`delete/${id}?name=${orderId}`}
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
