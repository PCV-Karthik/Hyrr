import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import OTP from "../components/OTP";
import { auth, provider } from "../firebase";
import { signInWithPopup,signInWithRedirect } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";

const Auth = () => {
  const [hide, setHide] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithRedirect(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:8005/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
  return (
    <div className="flex h-full w-full">
      <div className="wrapper flex w-full h-full">
        <div className="flex flex-1 bg-indigo-600 justify-center items-center text-white text-5xl">
          HYRR
        </div>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUp
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                hide={hide}
                setHide={setHide}
                error={error}
                setError={setError}
                signInWithGoogle={signInWithGoogle}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                hide={hide}
                error={error}
                setError={setError}
                signInWithGoogle={signInWithGoogle}
              />
            }
          />
          <Route
            path="/OTP"
            element={<OTP />}
            error={error}
            setError={setError}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
