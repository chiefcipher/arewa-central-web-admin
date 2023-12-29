import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";
import { OrderList } from "../../organisms/orderList/orderList";
import { OrderEdit } from "../../organisms/orderEdit/orderEdit";
import { OrderView } from "../../organisms/orderView/orderView";
import { ManageAdminList } from "../../organisms/manageAdminList/manageAdminList";
import { ManageAdminEdit } from "../../organisms/manageAdminEdit/manageAdminEdit";
import { ManageAdminView } from "../../organisms/manageAdminView/manageAdminView";

export function ManageAdmin(): JSX.Element {
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
      <Route path="/" element={<ManageAdminList />} />
      {/* admins sign up from frontend */}
      {/* <Route path="/create" element={<ComingSoonUI />} /> */}
      <Route path="/edit/:adminId" element={<ManageAdminEdit />} />
      <Route path="/:adminId" element={<ManageAdminView />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="../" />}
      />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
