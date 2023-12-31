import React from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "../../organisms/categoryList/categoryList";
import { CategoryAddNew } from "../../organisms/categoryAddNew/categoryAddNew";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { CategoryEdit } from "../../organisms/categoryEdit/categoryEdit";
import { CategoryView } from "../../organisms/categoryView/categoryView";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";

export function Category(): JSX.Element {
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
      <Route path="/" element={<CategoryList />} />
      <Route path="/create" element={<CategoryAddNew />} />
      <Route path="/edit/:categoryId" element={<CategoryEdit />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="../" />}
      />
      <Route path="/:categoryId" element={<CategoryView />} />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
