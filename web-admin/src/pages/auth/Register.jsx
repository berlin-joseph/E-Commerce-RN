import React from "react";
import { FaUser } from "react-icons/fa6";
import { MdEmail, MdVpnKey } from "react-icons/md";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    const isValidEmail = emailRegex.test(email);

    if (!email || !password || !name) {
      setIsEmailValid(false);
      return setError("Enter Your Details");
    }

    if (!isValidEmail) {
      setIsEmailValid(false);
      return setError("Enter Valid Email");
    }

    setError(null);

    setIsEmailValid(true);
  };

  return (
    <div className=" bg-white w-96 p-5 h-80 md:w-3/4 lg:w-1/3 lg:h-72 flex flex-col justify-center">
      <div>
        <h1 className=" text-xl font-semibold text-center pb-3">
          Register Here
        </h1>
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
        <h1
          className="bg-green-600 rounded-s text-lg text-white text-center cursor-pointer"
          onClick={handleRegister}
        >
          Register
        </h1>
      </div>
      {!isEmailValid ? (
        <h1 className=" text-center pt-3 text-red-500">{error}</h1>
      ) : null}
    </div>
  );
};

export default Register;
