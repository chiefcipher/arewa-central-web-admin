import React from "react";
import "./scss/combine-styles.scss";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "./ui/molecules/adminLayout/adminLayout";
import { ErrorUI } from "./ui/atoms/errorUI/errorUI";
import { ComingSoonUI } from "./ui/atoms/comingSoonUI/comingSoonUI";

function App() {
  return (
    <Routes>
      <Route Component={AdminLayout}>
        <Route path="/" element={<ComingSoonUI />} />
        <Route path="*" element={<ErrorUI type={404} />} />
      </Route>
    </Routes>
  );
}

export default App;
