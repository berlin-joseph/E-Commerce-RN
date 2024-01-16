import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectAllProducts } from "../redux/slice/ProductSlice";

const Products = () => {
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [featured, setFeatured] = React.useState(null);
  const [brand, setBrand] = React.useState(null);
  const [price, setPrice] = React.useState(null);

  //redux
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  //
 const handleAddProducts = (e) => {
   e.preventDefault();
   dispatch(
     addProduct({ name, description, category, featured, brand, price })
   );
   setName("");
   setDescription("");
   setCategory(null);
   setFeatured(null);
   setBrand("");
   setPrice("");
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
             <option className=" bg-dark-purple">Option 1</option>
             <option className=" bg-dark-purple">Option 2</option>
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
                     Product Description
                   </th>
                   <th scope="col" className="px-6 py-4">
                     Action
                   </th>
                 </tr>
               </thead>
               {products.map((data) => (
                 <tbody>
                   <tr className="border-b dark:border-neutral-500">
                     <td className="whitespace-nowrap px-6 py-4 font-medium">
                       1
                     </td>
                     <td className="whitespace-nowrap px-6 py-4">
                       {data.name}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4">
                       {data.description}
                     </td>
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
               ))}
             </table>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default Products;
