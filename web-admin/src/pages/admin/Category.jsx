import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Category = () => {
  return (
    <div className=" container mx-auto h-screen p-10">
      <div className="flex flex-col ">
        <div className="flex flex-col">
          <label htmlFor="" className="mt-5 mb-2">
            Name
          </label>
          <input
            type="text"
            className="border border-dark-purple rounded-md p-2"
          />
        </div>
        <div className="flex flex-col mt-5">
          <input
            type="file"
            className="border border-dark-purple rounded-md p-2"
          />
        </div>
        <button className=" bg-dark-purple mt-5 py-5 rounded-md text-white">
          Add Category
        </button>
      </div>
      <div className=" border border-dark-purple my-5" />
      {/*  */}
      <h1 className=" text-2xl">Product List</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Product Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      1
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Rulin</td>
                    <td className="whitespace-nowrap px-6 py-4">Berlin</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex gap-5">
                        <button>
                          <FaEdit className="text-2xl text-blue-900" />
                        </button>
                        <button>
                          <FaTrash className="text-2xl text-red-900" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
