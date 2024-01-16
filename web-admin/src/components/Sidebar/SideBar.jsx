import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { SiPhpmyadmin } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = React.useState(true);
  const history = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history("/");
    window.location.reload();
  };
  const menu = [
    { title: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    {
      title: "Products",
      icon: <MdOutlineProductionQuantityLimits />,
      path: "/products",
    },
    { title: "Category", icon: <TbCategory />, path: "/category" },
  ];
  const admin = [
    { title: "Profile", icon: <CgProfile /> },
    { title: "Settings", icon: <CiSettings /> },
    { title: "Logout", icon: <IoIosLogOut />, link: handleLogOut },
  ];
  return (
    <div
      className={` bg-dark-purple h-screen  p-5 pt-8 ${
        open ? "w-72 duration-100" : "w-20 duration-100"
      } relative`}
    >
      <div onClick={() => setOpen(!open)}>
        <FaArrowLeft
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          } `}
        />
      </div>
      <div>
        <Link to={"/dashboard"} className={" inline-flex"}>
          <SiPhpmyadmin className={`text-5xl text-white`} />
          <h1
            className={`text-white origin-left font-medium text-2xl ${
              !open && "scale-0"
            } self-center`}
          >
            Admin dashboard
          </h1>
        </Link>
      </div>
      {/* <div> */}
      {menu.map((item, index) => (
        <>
          <Link key={index} to={item.path} className="no-underline">
            <li
              className={`flex items-center gap-x-2 text-gray-300 text-sm cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}
            >
              <span className={`text-2xl`}>{item.icon}</span>
              <span className={`text-base font-medium ${!open && "hidden"}`}>
                {item.title}
              </span>
            </li>
          </Link>
        </>
      ))}
      {/* </div> */}
      <div className={`absolute bottom-0 w-64 pb-5`}>
        {admin.map((item, index) => (
          <div onClick={item.link}>
            <li
              key={index}
              className={`flex items-center gap-x-2 text-gray-300 text-sm cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}
            >
              <span className={`text-2xl`}>{item.icon}</span>
              <span className={`text-base font-medium ${!open && "hidden"}`}>
                {item.title}
              </span>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
