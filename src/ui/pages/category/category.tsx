import React from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "../../organisims/categoryList/categoryList";
import { CategoryAddNew } from "../../organisims/categoryAddNew/categoryAddNew";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { CategoryEdit } from "../../organisims/categoryEdit/categoryEdit";
import { CategoryView } from "../../organisims/categoryView/categoryView";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";

export function Category(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="/add-new" element={<CategoryAddNew />} />
      <Route path="/edit/:categoryId" element={<CategoryEdit />} />
      <Route path="/delete/:categoryId" element={<DeleteUI />} />
      <Route path="/:categoryId" element={<CategoryView />} />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
