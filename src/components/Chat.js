import React from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  let data = useSelector((state) => state.activeChat.value);

  return (
    <div className="bg-white h-[96vh] border-l border-solid border-black p-2.5 shadow-md">
      <div className="flex gap-x-4 items-center border-b border-solid border-black pb-2.5 m-5">
        <img
          src="images/profileimg.png"
          className="w-[70px] h-[70px] rounded"
        />
        <div>
          <h3 className="font-nunito font-bold text-xl">{data.name}</h3>
          <p className="font-nunito font-semibold text-sm">Online</p>
        </div>
      </div>
      <div className="h-[75vh] overflow-y-scroll">
        <div className="mt-5">
          <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
            Hey There !
          </p>
          <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
            {" "}
            Today, 2:01pm
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <div>
            <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
              Hey There !
            </p>
            <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
              {" "}
              Today, 2:01pm
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
            <img src="images/registrationimg.webp" />
          </p>
          <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
            {" "}
            Today, 2:01pm
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <div>
            <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
              <img src="images/registrationimg.webp" />
            </p>
            <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
              {" "}
              Today, 2:01pm
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2.5">
        <input
          className="border border-solid bg-[#f1f1f1] w-[82%] p-2.5 rounded-lg"
          placeholder="your msg"
        />
        <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded ml-3.5">
          Send
        </button>
        <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded ml-3.5">
          Attachment
        </button>
      </div>
    </div>
  );
};

export default Chat;
