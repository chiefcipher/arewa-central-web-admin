import React from "react";
import "./scss/combine-styles.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./ui/molecules/adminLayout/adminLayout";
import { ErrorUI } from "./ui/atoms/errorUI/errorUI";
import { ComingSoonUI } from "./ui/atoms/comingSoonUI/comingSoonUI";
import { Login } from "./ui/pages/login/login";
import { AuthLayout } from "./ui/molecules/authLayout/authLayout";
import { ForgotPassword } from "./ui/pages/forgotPassword/forgotPassword";
import { Category } from "./ui/pages/category/category";
import { Product } from "./ui/pages/product/product";
import { Message } from "./ui/pages/message/message";

function App() {
  const token = "sjsjsjs";
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      {token && (
        <>
          <Route Component={AdminLayout}>
            <Route path="/" element={<ComingSoonUI />} />
            <Route path="/category/*" element={<Category />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="/message/*" element={<Message />} />
            <Route path="*" element={<ErrorUI type={404} />} />
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
