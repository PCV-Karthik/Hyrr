import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTP = () => {
  const [OTP, setOTP] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(!currentUser) {
      navigate("/auth/login");
    }
    if (currentUser && currentUser.isVerified) {
      navigate("/");
    } 
  }, [navigate]);

  const handrleOTP = async(e) => {
    e.preventDefault();
    console.log(OTP, currentUser._id);
    try {
      const res = await axios.post("http://localhost:8005/api/auth/verify-email", { OTP, userId: currentUser._id });
      navigate("/");
    } catch (err) {
      setError(err.response.data)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center px-10 w-2/5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter OTP
        </h2>
        <div className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <div className="text-red-500">{error}</div>
          </div>
          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handrleOTP}
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
