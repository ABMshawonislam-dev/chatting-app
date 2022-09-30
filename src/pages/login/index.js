import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex px-2.5 md:px-0 mt-5 sml:mt-0">
      <div className="sml:w-1/2 flex flex-col items-end sml:mr-[69px] justify-center">
        <div className="xl:w-[520px]">
          <h2 className="font-nunito font-bold text-4xl sml:text-[22px] text-center sml:text-left">
            Login to your account!
          </h2>
          <img
            className="ml-auto mr-auto mt-5 sml:ml-0 sml:mr-0 cursor-pointer"
            src="images/google.png"
          />
          <div className="relative">
            <input
              className="border-b border-solid border-black w-full py-6 sml:p-4 mt-9 md:!px-14 md:!py-6 sml:mt-4 md:!mt-9 outline-0"
              type="email"
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 bg-white px-2.5">
              Email Address
            </p>
          </div>
          <div className="relative">
            <input
              className="border-b border-solid border-black w-full py-6 sml:p-4 mt-9 md:!px-14 md:!py-6 sml:mt-4 md:!mt-9 outline-0"
              type="password"
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 sml:top-1 md:!top-6 bg-white px-2.5">
              Password
            </p>
          </div>
          <button className="w-full text-center bg-primary rounded-lg py-5 font-nunito font-semibold text-xl text-white mt-12">
            Login to Continue
          </button>
          <p className="font-nunito font-regular text-xs mt-9 w-full text-left">
            Don’t have an account ?{" "}
            <Link className="font-bold text-[#EA6C00]" to="/registration">
              Sign up
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

export default Login;
