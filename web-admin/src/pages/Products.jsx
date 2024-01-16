import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  selectAllProducts,
  setSelectedProduct,
} from "../redux/slice/ProductSlice";

const Products = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [featured, setFeatured] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [showModal, setShowModal] = React.useState(false);

  //redux
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  //
  const handleAddProducts = (e) => {
    dispatch(
      addProduct({ name, description, category, featured, brand, price })
    );
    setName("");
    setDescription("");
    setCategory("");
    setFeatured("");
    setBrand("");
    setPrice("");
  };
  const updateProducts = (selectedProduct) => {
    setShowModal(true);
    // console.log(selectedProduct);
    dispatch(setSelectedProduct(selectedProduct));
  };
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="mt-5  mb-2">
            Description
          </label>
          <input
            type="text"
            className="border border-dark-purple rounded-md p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 justify-between gap-10">
          <div className="flex flex-col">
            <label htmlFor="" className="mt-5 mb-2 ">
              Category
            </label>
            <select
              id="category"
              className="border border-dark-purple rounded-md p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mt-5 mb-2">
              Featured
            </label>
            <select
              id="category"
              className="border border-dark-purple rounded-md p-2"
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            >
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-between gap-10">
          <div className="flex flex-col">
            <label htmlFor="" className="mt-5  mb-2">
              Brand
            </label>
            <input
              type="text"
              className="border border-dark-purple rounded-md p-2"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mt-5 mb-2">
              Price
            </label>
            <input
              type="text"
              className="border border-dark-purple rounded-md p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button
          className=" bg-dark-purple mt-5 py-5 rounded-md text-white"
          onClick={handleAddProducts}
        >
          Add Products
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
                      Action
                    </th>
                  </tr>
                </thead>
                {products.map((data, index) => (
                  <tbody key={data.id}>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-5">
                          <button>
                            <FaEdit
                              className="text-2xl text-blue-900"
                              onClick={() => updateProducts(data)}
                            />
                          </button>
                          <button>
                            <FaTrash
                              className="text-2xl text-red-900"
                              onClick={() => handleDeleteProduct(data.id)}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-dark-purple">
                    Update Products
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col">
                    <label htmlFor="" className="mt-5 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="border border-dark-purple rounded-md p-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="mt-5  mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      className="border border-dark-purple rounded-md p-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 justify-between gap-5">
                    <div className="flex flex-col">
                      <label htmlFor="" className="mt-5 mb-2 ">
                        Category
                      </label>
                      <select
                        id="category"
                        className="border border-dark-purple rounded-md p-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="mt-5 mb-2">
                        Featured
                      </label>
                      <select
                        id="category"
                        className="border border-dark-purple rounded-md p-2"
                        value={featured}
                        onChange={(e) => setFeatured(e.target.value)}
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-between gap-5">
                    <div className="flex flex-col">
                      <label htmlFor="" className="mt-5  mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        className="border border-dark-purple rounded-md p-2"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="mt-5 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        className="border border-dark-purple rounded-md p-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Update Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Products;
