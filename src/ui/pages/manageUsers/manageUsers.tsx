import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";
import { ManageUsersList } from "../../organisms/manageUsersList/manageUsersList";
import { ManageUsersEdit } from "../../organisms/manageUsersEdit/manageUsersEdit";
import { ManageUsersView } from "../../organisms/manageUsersView/manageUsersView";

export function ManageUsers(): JSX.Element {
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
      <Route path="/" element={<ManageUsersList />} />
      {/* users sign up from user portal */}
      {/* <Route path="/create" element={<ComingSoonUI />} /> */}
      <Route path="/edit/:userId" element={<ManageUsersEdit />} />
      <Route path="/:userId" element={<ManageUsersView />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="../" />}
      />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
