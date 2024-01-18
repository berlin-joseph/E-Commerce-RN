import React from "react";
import Sidebar from "./Sidebar";
import backgroundImage from "../../assets/cyber-monday-shopping-sales.jpg";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

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
      className=" flex w-full justify-center items-center gap-5 fixed top-0 bottom-0 left-0 right-0"
    >
      <Sidebar />
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Index;
