import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
const Registration = () => {
  let [email, setEmail] = useState("");
  let [fullname, setFullname] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [fullnameerr, setFullnameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [show, setShow] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  let handleFullName = (e) => {
    setFullname(e.target.value);
    setFullnameerr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr("valid email is required");
      }
    }

    if (!fullname) {
      setFullnameerr("Full name is required");
    } else {
      if (fullname.length <= 2) {
        setFullnameerr("Full must be greater than 2");
      }
    }

    if (!password) {
      setPassworderr("Password name is required");
    } else {
      if (!/^(?=.*[a-z])/.test(password)) {
        setPassworderr("Password must contain a lowercase");
      } else if (!/^(?=.*[A-Z])/.test(password)) {
        setPassworderr("Password must contain a uppercase");
      } else if (!/^(?=.*[0-9])/.test(password)) {
        setPassworderr("Password must contain a number");
      } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setPassworderr("Password must contain a symbol");
      } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setPassworderr("Password must contain a symbol");
      } else if (!/^(?=.{6,})/.test(password)) {
        setPassworderr("Password have atleast 6 character");
      }
    }
  };

  let handlePasswordShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex px-2.5 md:px-0 mt-5 sml:mt-0">
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] justify-center">
        <div className="xl:w-[520px]">
          <h2 className="font-nunito font-bold text-4xl sml:text-[22px] text-center sml:text-left">
            Get started with easily register
          </h2>
          <p className="font-nunito font-regular text-xl sm:text-sm mt-2.5 sml:mt-0 text-center sml:text-left">
            Free register and you can enjoy it
          </p>
          <div className="relative">
            <input
              className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4 mt-9 md:!px-14 md:!py-6 sml:mt-4 md:!mt-9"
              type="email"
              onChange={handleEmail}
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 left-8 bg-white px-2.5">
              Email Address
            </p>
            {emailerr && (
              <p className="font-nunito font-semibold font-sm bg-red-500 text-white p-1 rounded mt-2.5">
                {emailerr}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4 md:!px-14 md:!py-6 mt-9 sml:mt-4 md:!mt-9"
              type="text"
              onChange={handleFullName}
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 left-8 bg-white px-2.5">
              Full name
            </p>
            {fullnameerr && (
              <p className="font-nunito font-semibold font-sm bg-red-500 text-white p-1 rounded mt-2.5">
                {fullnameerr}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4 md:!px-14 md:!py-6 mt-9 sml:mt-4 md:!mt-9"
              type={show ? "text" : "password"}
              onChange={handlePassword}
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 left-8 bg-white px-2.5">
              Password
            </p>
            {show ? (
              <RiEyeFill
                onClick={handlePasswordShow}
                className="absolute top-16 right-5"
              />
            ) : (
              <RiEyeCloseFill
                onClick={handlePasswordShow}
                className="absolute top-16 right-5"
              />
            )}
            {passworderr && (
              <p className="font-nunito font-semibold font-sm bg-red-500 text-white p-1 rounded mt-2.5">
                {passworderr}
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full text-center bg-primary rounded-[86px] py-5 font-nunito font-semibold text-xl text-white mt-12 sml:mt-4 md:!mt-12"
          >
            Sign up
          </button>
          <p className="font-nunito font-regular text-xs mt-9 w-full text-center sml:mt-4 md:!mt-9">
            Already have an account ?{" "}
            <Link className="font-bold text-[#EA6C00]" to="/login">
              Sign In
            </Link>
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
    </div>
  );
};

export default Registration;
