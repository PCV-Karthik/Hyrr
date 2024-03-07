import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";

const SignUp = ({ email,setEmail, password, setPassword, hide, setHide, error,setError,signInWithGoogle }) => {
  const [confirmHide, setConfirmHide] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } 
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("*Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("*Passwords do not match");
      return;
    }

    setError("");
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8005/api/auth/signup", { name, email, password });
      dispatch(loginSuccess(res.data));
      navigate("/auth/OTP");
    } catch (err) {
      setError(err.response.data)
      dispatch(loginFailure());
    }
  };


  return (
    <div className="flex flex-col justify-center items-center px-10 w-2/5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2 flex">
              <input
                id="password"
                name="password"
                type={hide ? "text" : "password"}
                required
                className="block w-full rounded-md border-0 mr-2 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={() => setHide((prev) => !prev)}>
                {hide ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2 flex">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmHide ? "text" : "password"}
                required
                className="block w-full rounded-md border-0 mr-2 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={() => setConfirmHide((prev) => !prev)}>
                {confirmHide ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          <div className="text-red-500">{error}</div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSignUp}
            >
              Sign in
            </button>
          </div>
          <div className="flex justify-center">or</div>
          <button
            className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={signInWithGoogle}
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
