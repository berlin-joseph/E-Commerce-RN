import React, { useEffect } from "react";
import { GoProject } from "react-icons/go";
import { BiSolidCategory } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import { GiConvergenceTarget } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";

const card = [
  { title: "PRODUCTS", icon: <GoProject /> },
  { title: "CATEGORY", icon: <BiSolidCategory /> },
  { title: "CUSTOMERS", icon: <IoPeopleOutline /> },
  { title: "TOTAL SALE", icon: <GiConvergenceTarget /> },
  { title: "REVENUE", icon: <FaMoneyBill /> },
];

const colors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-yellow-600",
];


const Dashboard = () => {
  return (
    <div className="container mx-auto">
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 m-10">
        {card.map((item, index) => (
          <div key={index} className={` ${colors[index]} px-5 py-3 rounded-md`}>
            <div className={`flex items-center justify-between`}>
              <h1 className=" text-white text-md md:text-lg font-semibold">
                {item.title}
              </h1>
              <span className={`text-white md:text-xl text-2xl font-medium`}>
                {item.icon}
              </span>
            </div>
            <h1 className=" text-white text-3xl font-bold pt-5">300</h1>
          </div>
        ))}
      </div>

      <div className=" border-gray-300 border-b-2	" />
      {/* charts */}
      <div className=" w-1/2 h-1/2"></div>
    </div>
  );
};

export default Dashboard;
