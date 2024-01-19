import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectAuth } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState(null);

  const handleForgot = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    const isValidEmail = emailRegex.test(email);

    if (!email) {
      setIsEmailValid(false);
      return setError("Enter Your Email");
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
          Reset Password
        </h1>
      </div>
      <h1 className=" text-md py-5">
        Enter your email address below and we'll send you an email with
        instructions.
      </h1>
      <div className=" mb-3">
        <div className=" flex border rounded-s bg-gray-100 text-gray-500 ">
          <MdEmail className=" self-center text-2xl mx-2" />
          <input
            type="text"
            value={email}
            placeholder="email"
            className="bg-gray-100 w-full p-2 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h1
          className="bg-green-600 rounded-s text-lg text-white text-center cursor-pointer"
          onClick={handleForgot}
        >
          Reset
        </h1>
      </div>
      {!isEmailValid ? (
        <h1 className=" text-center pt-3 text-red-500">{error}</h1>
      ) : null}
    </div>
  );
};

export default ForgotPassword;
