import React from "react";
import Sidebar from "./Sidebar";
import backgroundImage from "../../assets/cyber-monday-shopping-sales.jpg";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const Index = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className=" flex flex-col lg:flex-row justify-center items-center gap-5 fixed top-0 bottom-0 left-0 right-0"
    >
      <Sidebar />
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default Index;
