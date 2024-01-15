import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Category from "./pages/Category";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex ">
        <SideBar />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
