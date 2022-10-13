import React from "react";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen bg-primary flex justify-center items-center">
      <div className="p-10 bg-white rounded">
        <h1 className="text-5xl text-primary font-bold font-nunito">
          Forgot Password
        </h1>
        <div className="relative">
          <input
            className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4 md:!px-14 md:!py-6 mt-9 sml:mt-4 md:!mt-9"
            placeholder="Email Address"
          />
        </div>
        <button className="w-full text-center bg-primary rounded-[86px] py-5 font-nunito font-semibold text-xl text-white mt-5 sml:mt-4 md:!mt-5">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
