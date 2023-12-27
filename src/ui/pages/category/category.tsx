import React from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "../../organisims/categoryList/categoryList";
import { CategoryAddNew } from "../../organisims/categoryAddNew/categoryAddNew";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { CategoryEdit } from "../../organisims/categoryEdit/categoryEdit";

export function Category(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="/add-new" element={<CategoryAddNew />} />
      <Route path="/edit/:categoryId" element={<CategoryEdit />} />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
