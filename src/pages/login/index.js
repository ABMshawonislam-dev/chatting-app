import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let [loading, setLoading] = useState(false);
  let [show, setShow] = useState(false);
  let [forgotEmail, setForgotEmail] = useState("");

  let handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast("Login Successfull! Wait for redirect");
        setSuccess(
          "Registration Successfull. Please varify your email address"
        );
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes("auth/wrong-password")) {
          setError("Password Not match");
        }
        if (errorCode.includes("auth/user-not-found")) {
          setError("Email not match");
        }
      });
  };

  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  let handleForgotPassword = () => {
    sendPasswordResetEmail(auth, forgotEmail).then(() => {
      toast("Please Check Your Email");
      setTimeout(() => {
        setShow(false);
      }, 2000);
    });
  };

  return (
    <div className="flex px-2.5 md:px-0 mt-5 sml:mt-0">
      <ToastContainer position="bottom-center" theme="dark" />
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] justify-center">
        <div className="xl:w-[520px]">
          {error && (
            <p className="font-nunito font-semibold font-sm bg-red-500 text-white p-1 rounded mt-2.5">
              {error}
            </p>
          )}
          <h2 className="font-nunito font-bold text-4xl sml:text-[22px] text-center sml:text-left">
            Login to your account!
          </h2>
          <img
            className="ml-auto mr-auto mt-5 sml:ml-0 sml:mr-0 cursor-pointer"
            src="images/google.png"
            onClick={handleGoogleLogin}
          />
          <div className="relative">
            <input
              className="border-b border-solid border-black w-full py-6 sml:p-4 mt-9 md:!px-14 md:!py-6 sml:mt-4 md:!mt-9 outline-0"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 bg-white px-2.5">
              Email Address
            </p>
          </div>
          <div className="relative">
            <input
              className="border-b border-solid border-black w-full py-6 sml:p-4 mt-9 md:!px-14 md:!py-6 sml:mt-4 md:!mt-9 outline-0"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 bg-white px-2.5">
              Password
            </p>
          </div>
          {loading ? (
            <FallingLines
              color="#5F35F5"
              width="300"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          ) : (
            <button
              className="w-full text-center bg-primary rounded-lg py-5 font-nunito font-semibold text-xl text-white mt-12"
              onClick={handleLogin}
            >
              Login to Continue
            </button>
          )}

          <p className="font-nunito font-regular text-xs mt-9 w-full text-left">
            Don’t have an account ?{" "}
            <Link className="font-bold text-[#EA6C00]" to="/registration">
              Sign up
            </Link>
          </p>
          <p className="font-nunito font-regular text-xs mt-9 w-full text-center">
            <button
              onClick={() => setShow(!show)}
              className="font-bold text-primary"
              to="/forgotpassword"
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
      <div className="sml:w-1/2 hidden sml:block">
        <picture>
          <img
            className="sml:h-auto md:!h-screen w-full object-cover"
            src="images/registrationimg.webp"
            loading="lazy"
          />
        </picture>
      </div>
      {/* asdasdasd */}
      {show && (
        <div className="w-full h-screen bg-primary flex justify-center items-center fixed">
          <div className="p-10 bg-white rounded">
            <h1 className="text-5xl text-primary font-bold font-nunito">
              Forgot Password
            </h1>
            <div className="relative">
              <input
                className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4 md:!px-14 md:!py-6 mt-9 sml:mt-4 md:!mt-9"
                placeholder="Email Address"
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleForgotPassword}
              className=" text-center bg-primary rounded-[5px] p-5 font-nunito font-semibold text-xl text-white mt-5 sml:mt-4 md:!mt-5"
            >
              Change Password
            </button>
            <button
              onClick={() => setShow(false)}
              className=" text-center ml-5 bg-[#EA6C00] rounded-[5px] p-5 font-nunito font-semibold text-xl text-white mt-5 sml:mt-4 md:!mt-5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
