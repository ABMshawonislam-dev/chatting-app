import React from "react";
import { Link } from "react-router-dom";
const Registration = () => {
  return (
    <div className="flex">
      <div className="w-1/2 flex flex-col items-end mr-[69px] justify-center">
        <div className="w-[520px]">
          <h2 className="font-nunito font-bold text-4xl">
            Get started with easily register
          </h2>
          <p className="font-nunito font-regular text-xl mt-2.5">
            Free register and you can enjoy it
          </p>
          <div className="relative">
            <input
              className="border border-solid border-black w-full rounded-lg px-14 py-6 mt-9"
              type="email"
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 left-8 bg-white px-2.5">
              Email Address
            </p>
          </div>
          <div className="relative">
            <input
              className="border border-solid border-black w-full rounded-lg px-14 py-6 mt-9"
              type="text"
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 left-8 bg-white px-2.5">
              Full name
            </p>
          </div>
          <div className="relative">
            <input
              className="border border-solid border-black w-full rounded-lg px-14 py-6 mt-9"
              type="password"
            />
            <p className="font-nunito font-semibold font-sm absolute top-6 left-8 bg-white px-2.5">
              Password
            </p>
          </div>
          <button className="w-full text-center bg-primary rounded-[86px] py-5 font-nunito font-semibold text-xl text-white mt-12">
            Sign up
          </button>
          <p className="font-nunito font-regular text-xs mt-9 w-full text-center">
            Already have an account ?{" "}
            <Link className="font-bold text-[#EA6C00]" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <picture>
          <img
            className="h-screen w-full object-cover"
            src="images/registrationimg.webp"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
