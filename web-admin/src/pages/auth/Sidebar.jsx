import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState("login");

  const handleLinkClick = (link) => {
    setSelected(link);
  };

  return (
    <div className="flex justify-center lg:flex-col">
      <Link
        to={"/login"}
        className="flex items-center"
        onClick={() => handleLinkClick("login")}
      >
        <div
          className={` w-24 lg:w-40 ${
            selected === "login" ? "bg-green-500" : "bg-white"
          } text-center py-4`}
        >
          <FaUserCircle
            className={`${
              selected === "login"
                ? "text-white mx-auto text-xl"
                : "text-black mx-auto text-xl"
            }`}
          />
          <h1
            className={`${
              selected === "login" ? "text-white text-xl" : "text-black text-xl"
            }`}
          >
            Login
          </h1>
        </div>
      </Link>
      <Link
        to={"/register"}
        className="flex items-center"
        onClick={() => handleLinkClick("register")}
      >
        <div
          className={`w-24 lg:w-40 ${
            selected === "register" ? "bg-green-500" : "bg-white"
          } text-center py-4`}
        >
          <BiEdit
            className={`${
              selected === "register"
                ? "text-white mx-auto text-xl"
                : "text-black mx-auto text-xl"
            }`}
          />
          <h1
            className={`${
              selected === "register" ? "text-white" : "text-black"
            }`}
          >
            Register
          </h1>
        </div>
      </Link>
      <Link
        to={"/forgot-password"}
        className="flex items-center"
        onClick={() => handleLinkClick("forgotPassword")}
      >
        <div
          className={` w-24 lg:w-40 ${
            selected === "forgotPassword" ? "bg-green-500" : "bg-white"
          } text-center py-4`}
        >
          <FaLock
            className={`${
              selected === "forgotPassword"
                ? "text-white mx-auto text-xl"
                : "text-black mx-auto text-xl"
            }`}
          />
          <h1
            className={`${
              selected === "forgotPassword" ? "text-white" : "text-black"
            }`}
          >
            Forgot
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
