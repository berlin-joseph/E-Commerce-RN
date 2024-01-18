import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectAuth } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    <div className="bg-dark-purple h-screen">
      <div className=" flex flex-col w-1/2 container mx-auto">
        <label htmlFor="" className="mt-5 mb-2 text-white">
          Name
        </label>
        <input
          type="text"
          className="border border-dark-purple rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-1/2 container mx-auto">
        <label htmlFor="" className="mt-5 text-white mb-2">
          Description
        </label>
        <input
          type="text"
          className="border border-dark-purple rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-10 w-1/2 container mx-auto">
        <button
          className="text-dark-purple bg-white px-5 py-3 rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      {auth.error && (
        <p className=" text-white">Error occurred while logging in.</p>
      )}
    </div>
  );
};

export default Login;
