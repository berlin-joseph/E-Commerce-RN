import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import SideBar from "./components/Sidebar/SideBar";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Login from "./pages/auth/Login";
import Category from "./pages/admin/Category";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      {localStorage.getItem("token") ? (
        <div className="flex">
          <SideBar />
          <Routes>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
