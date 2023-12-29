import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";
import { MessageAddNew } from "../../organisms/messageAddNew/messageAddNew";
import { MessageEdit } from "../../organisms/messageEdit/messageEdit";
import { MessageView } from "../../organisms/messageView/messageView";
import { OrderList } from "../../organisms/orderList/orderList";
import { OrderEdit } from "../../organisms/orderEdit/orderEdit";
import { ComingSoonUI } from "../../atoms/comingSoonUI/comingSoonUI";
import { OrderView } from "../../organisms/orderView/orderView";

export function Order(): JSX.Element {
  // api delete mutation
  const handleDelete: () => Promise<boolean> = async () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if ("a") {
          return resolve(true);
        }
        reject(false);
      }, 3000);
    });

  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      {/* we do not create orders from backend */}
      {/* <Route path="/create" element={<ComingSoonUI />} /> */}
      <Route path="/edit/:orderId" element={<OrderEdit />} />
      <Route path="/:orderId" element={<OrderView />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="/order" />}
      />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
