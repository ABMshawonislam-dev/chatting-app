import React from "react";
import BlockUser from "../../components/BlockUser";
import FriendRequest from "../../components/FriendRequest";
import Friends from "../../components/Friends";
import Group from "../../components/Group";
import MyGroups from "../../components/MyGroups";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";

const Home = () => {
  return (
    <div className="xl:flex justify-between p-2.5 xl:p-0">
      <div className="xl:w-[186px]">
        <Sidebar active="home" />
      </div>
      <div className="xl:w-[540px]">
        <Search />
        <Group />
        <FriendRequest />
      </div>
      <div className="xl:w-[540px]">
        <Friends />
        <MyGroups />
      </div>
      <div className="xl:w-[540px]">
        <UserList />
        <BlockUser />
      </div>
    </div>
  );
};

export default Home;
