import React from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "../../organisims/categoryList/categoryList";

export function Category(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
    </Routes>
  );
}
