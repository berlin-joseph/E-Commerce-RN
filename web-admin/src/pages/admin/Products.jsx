import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  removeProduct,
  selectAllProducts,
} from "../../redux/slice/ProductSlice";
import {
  fetchCategory,
  selectAllCategory,
} from "../../redux/slice/CategorySlice";

const Products = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [featured, setFeatured] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  //redux
  const dispatch = useDispatch();
  const product = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategory);
  const products = product.data;
  const Category = categories.data;
  console.log(product, "products.jsx");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    console.log(productId);
    dispatch(removeProduct(productId));
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
        <div className="grid md:grid-cols-2 md:justify-between md:gap-5">
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
              {Array.isArray(Category) &&
                Category?.map((data, index) => (
                  <option key={data._id}>{data.name}</option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mt-5 mb-2">
              Featured
            </label>
            <select
              id="featured"
              className="border border-dark-purple rounded-md p-2"
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            >
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:justify-between md:gap-5">
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
        <div className="flex flex-col mt-5">
          <input
            type="file"
            className="border border-dark-purple rounded-md p-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          className=" bg-dark-purple mt-5 py-5 rounded-md text-white"
          // onClick={handleAddProducts}
        >
          Add Products
        </button>
      </div>
      <div className=" border border-dark-purple my-5" />
      {/*  */}
      <h1 className=" text-2xl">Product List</h1>
      <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
            alt="card-image"
          />
        </div>
        <div class="p-6">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            UI/UX Review Check
          </h5>
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to "Naviglio" where you can enjoy the main night life
            in Barcelona.
          </p>
        </div>
        <div class="p-6 pt-0">
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Read More
          </button>
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
