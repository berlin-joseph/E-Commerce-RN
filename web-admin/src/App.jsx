import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/Sidebar/SideBar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Category from "./pages/Category";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
