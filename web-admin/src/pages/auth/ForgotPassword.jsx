import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectAuth } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();

  //redux
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history("/dashboard");
    }
  }, [history]);

  useEffect(() => {
    if (auth.user.admin === true && auth.user.success === true) {
      const token = auth.user.token;
      localStorage.setItem("token", token);
      history("/dashboard");
      window.location.reload();
    }
  }, [auth.user, history]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(fetchUser({ email, password }));
  };

  return (
    <div className=" bg-white w-96 p-5 md:w-3/4 lg:w-1/3">
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
          onClick={handleLogin}
        >
          Reset
        </h1>
      </div>
    </div>
  );
};

export default ForgotPassword;
