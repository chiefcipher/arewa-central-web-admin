import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "../../organisms/categoryList/categoryList";
import { CategoryAddNew } from "../../organisms/categoryAddNew/categoryAddNew";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { CategoryEdit } from "../../organisms/categoryEdit/categoryEdit";
import { CategoryView } from "../../organisms/categoryView/categoryView";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";
import { ProductList } from "../../organisms/productList/productList";
import { ProductAddNew } from "../../organisms/productAddNew/productAddNew";
import { ProductEdit } from "../../organisms/productEdit/productEdit";
import { ProductView } from "../../organisms/productView/productView";

export function Product(): JSX.Element {
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
      <Route path="/" element={<ProductList />} />
      <Route path="/add-new" element={<ProductAddNew />} />
      <Route path="/edit/:productId" element={<ProductEdit />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="/product" />}
      />
      <Route path="/:productId" element={<ProductView />} />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
