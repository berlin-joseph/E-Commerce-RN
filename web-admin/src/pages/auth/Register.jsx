import React from "react";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div className=" bg-white p-5 w-3/12 h-56">
      <div className=" mb-3">
        <label htmlFor="">Name</label>
        <div className=" flex border border-dark-purple rounded-s bg-gray-100 text-gray-500 p-2">
          <MdEmail className=" self-center text-2xl" />
          <input
            type="text"
            value={email}
            className="bg-gray-100  border-0 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="">Password</label>
        <div className=" flex border border-dark-purple rounded-s bg-gray-100 text-gray-500 p-2">
          <MdEmail className=" self-center text-2xl" />
          <input
            type="text"
            value={password}
            className="bg-gray-100  border-0 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <h1 className=" bg-green-600 rounded-s text-lg text-white text-center ">
          Login
        </h1>
      </div>
    </div>
  );
};

export default Register;
