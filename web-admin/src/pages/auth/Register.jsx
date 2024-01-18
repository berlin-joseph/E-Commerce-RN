import React from "react";
import { FaUser } from "react-icons/fa6";
import { MdEmail, MdVpnKey } from "react-icons/md";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className=" bg-white p-5 w-3/12 ">
      <div>
        <h1 className=" text-2xl font-bold text-center pb-3">LOGIN ACCOUNT</h1>
      </div>
      <div className=" mb-3">
        <div className=" flex border rounded-s bg-gray-100 text-gray-500 ">
          <FaUser className=" self-center text-2xl mx-2" />
          <input
            type="text"
            value={name}
            placeholder="name"
            className="bg-gray-100 w-full p-2 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className=" mb-3">
        <div className=" flex border rounded-s bg-gray-100 text-gray-500 ">
          <MdEmail className=" self-center text-2xl mx-2" />
          <input
            type="text"
            placeholder="email"
            value={email}
            className="bg-gray-100 w-full p-2 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className=" mb-3">
        <div className=" flex border rounded-s bg-gray-100 text-gray-500">
          <MdVpnKey className=" self-center text-2xl mx-2" />
          <input
            type="text"
            value={password}
            placeholder="password"
            className="bg-gray-100 w-full p-2 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h1 className="bg-green-600 rounded-s text-lg text-white text-center cursor-pointer">
          Register
        </h1>
      </div>
    </div>
  );
};

export default Register;
