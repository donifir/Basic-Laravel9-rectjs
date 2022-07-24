import axios from "axios";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./component/NavbarComponent";
import Barang from "./pages/barang/Barang";
import BarangDetail from "./pages/barang/Detail";
import BarangCreate from "./pages/barang/Create";
import BarangEdit from "./pages/barang/Edit";
import Home from "./pages/Home";
import SuplierCreate from "./pages/suplier/Create";
import SuplierEdit from "./pages/suplier/Edit";
import Suplier from "./pages/suplier/Suplier";

axios.defaults.baseURL = "http://localhost:8000/api";

export default function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barang" element={<Barang />} />
        <Route path="/barang/create" element={<BarangCreate />} />
        <Route path="/barang/:id" element={<BarangDetail />} />
        <Route path="/barang/:id/update" element={<BarangEdit />} />
        {/* <Route index element={<Home />} /> */}
        <Route path="/suplier" element={<Suplier />} />
        <Route path="/suplier/create" element={<SuplierCreate />} />
        <Route path="/suplier/:id/edit" element={<SuplierEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
