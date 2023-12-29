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
import { MessageList } from "../../organisms/messageList/messageList";
import { ComingSoonUI } from "../../atoms/comingSoonUI/comingSoonUI";
import { MessageAddNew } from "../../organisms/messageAddNew/messageAddNew";
import { MessageEdit } from "../../organisms/messageEdit/messageEdit";
import { MessageView } from "../../organisms/messageView/messageView";

export function Message(): JSX.Element {
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
      <Route path="/" element={<MessageList />} />
      <Route path="/add-new" element={<MessageAddNew />} />
      <Route path="/edit/:messageId" element={<MessageEdit />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="/message" />}
      />
      <Route path="/:messageId" element={<MessageView />} />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
