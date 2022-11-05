import React from "react";
import JoinGroupList from "../../components/JoinGroupList";
import Sidebar from "../../components/Sidebar";

const Message = () => {
  return (
    <div className="flex justify-between">
      <div className="max-w-[186px]">
        <Sidebar active="message" />
      </div>
      <div className="w-[540px]">
        <JoinGroupList />
      </div>
      <div className="w-[540px]">
        <JoinGroupList />
      </div>
      <div className="w-[540px]">
        <JoinGroupList />
      </div>
    </div>
  );
};

export default Message;
