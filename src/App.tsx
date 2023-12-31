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
import { Order } from "./ui/pages/order/order";
import { ManageAdmin } from "./ui/pages/manageAdmin/manageAdmin";
import { ManageUsers } from "./ui/pages/manageUsers/manageUsers";
import { Profile } from "./ui/pages/profile/profile";

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
            <Route path="/order/*" element={<Order />} />
            <Route path="/manage-admin/*" element={<ManageAdmin />} />
            <Route path="/manage_users/*" element={<ManageUsers />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="*" element={<ErrorUI type={404} />} />
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
