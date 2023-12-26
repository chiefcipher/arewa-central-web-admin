import React from "react";
import "./scss/combine-styles.scss";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "./ui/molecules/adminLayout/adminLayout";

function App() {
  return (
    <Routes>
      <Route Component={AdminLayout}>
        <Route path="/" element={<h2>COming soon</h2>} />
        <Route path="*" element={<h4>Not found</h4>} />
      </Route>
    </Routes>
  );
}

export default App;
