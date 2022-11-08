import React from "react";
import JoinGroupList from "../../components/JoinGroupList";
import Sidebar from "../../components/Sidebar";
import Friends from "../../components/Friends";
import Chat from "../../components/Chat";

const Message = () => {
  return (
    <div className="flex justify-between">
      <div className="max-w-[186px]">
        <Sidebar active="message" />
      </div>
      <div className="w-[540px]">
        <JoinGroupList />
        <Friends />
      </div>
      <div className="w-[1140px]">
        <Chat />
      </div>
    </div>
  );
};

export default Message;
