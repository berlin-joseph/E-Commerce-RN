import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectAuth } from "../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [error, setError] = React.useState(null);

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

    dispatch(fetchUser({ email, password }));
  };

  return (
    <div className=" bg-white w-96 p-5 md:w-3/4 lg:w-1/3">
      <div>
        <h1 className=" text-xl font-semibold text-center pb-3">Login Here</h1>
      </div>
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
          onClick={handleLogin}
        >
          Login
        </h1>
      </div>
      {!isEmailValid ? (
        <h1 className=" text-center pt-3 text-red-500">{error}</h1>
      ) : null}
      <Link to={"/forgot-password"}>
        <div className=" cursor-pointer">
          <h1 className=" text-gray-400 text-center pt-5">Forgot Password</h1>
        </div>
      </Link>
    </div>
  );
};

export default Login;
