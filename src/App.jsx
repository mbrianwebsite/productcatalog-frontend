import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageIndex from "./components/Pages/PageIndex";
import PageTable from "./components/Pages/PageTable";
import PageProducts from "./components/Pages/PageProducts";
import PageDetail from "./components/Pages/PageDetail";
import PageEdit from "./components/Pages/PageEdit";
import PageCreate from "./components/Pages/PageCreate";
import PageLogin from "./components/Pages/PageLogin";
import ProtectedRoute from "./wrapper/ProtectedRoute";
import PageRegister from "./components/Pages/PageRegister";
import GuestRoute from "./wrapper/GuestRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageIndex />} />
          <Route path="/products" element={<PageProducts />} />
          <Route path="/detail/:id" element={<PageDetail />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<PageCreate />} />
            <Route path="/edit/:id" element={<PageEdit />} />
            <Route path="/table" element={<PageTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
