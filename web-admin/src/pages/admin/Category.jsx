import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  createCategory,
  deleteCategory,
  fetchCategory,
  selectAllCategory,
  setSelectedCategory,
} from "../../redux/slice/CategorySlice";

const Category = () => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [modalName, setModalName] = React.useState("");
  const [modalImage, setModalImage] = React.useState("");

  //redux
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategory);
  const category = categories?.data;
  console.log(category, "categories");

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass the correct payload structure to createCategory
    dispatch(createCategory({ name, image }))
      .unwrap()
      .then((result) => {
        // Handle success if needed
        console.log("Category created successfully:", result);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error creating category:", error);
      });

    setName("");
    setImage("");
  };

  const updateCategory = (selectedCategory) => {
    setShowModal(true);
    setModalName(selectedCategory.name);
    setModalImage(selectedCategory.image);
    dispatch(setSelectedCategory(selectedCategory));
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
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
        <div className="flex flex-col mt-5">
          <input
            type="file"
            className="border border-dark-purple rounded-md p-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          className="bg-dark-purple mt-5 py-5 rounded-md text-white"
          onClick={handleSubmit}
        >
          Add Category
        </button>
      </div>
      <div className="border border-dark-purple my-5" />
      <h1 className="text-2xl">Product List</h1>
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
                <tbody>
                  {Array.isArray(category) &&
                    category.map((data, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
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
                                onClick={() => updateCategory(data)}
                              />
                            </button>
                            <button>
                              <FaTrash
                                className="text-2xl text-red-900"
                                onClick={() => handleDeleteCategory(data.id)}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
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
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                    />

                    <div className="flex flex-col mt-5">
                      <input
                        type="file"
                        className="border border-dark-purple rounded-md p-2"
                        // value={modalImage}
                        onChange={(e) => setModalImage(e.target.value)}
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
                    onClick={() => {
                      setShowModal(false);
                    }}
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

export default Category;
