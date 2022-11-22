import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { activeChat } from "../slices/activeChat";
const JoinGroupList = () => {
  let db = getDatabase();
  let auth = getAuth();
  let dispatch = useDispatch();
  let [jgl, setJgl] = useState([]);
  let [gm, setGm] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "group");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == auth.currentUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setJgl(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "groupmember");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().userid) {
          arr.push(item.val());
        }
      });
      setGm(arr);
    });
  }, []);

  let handleActiveChat = (item) => {
    console.log("gid", item);
    console.log("group info", item);
    let userinfo = {
      status: "group",
      name: item.gname,
      groupid: auth.currentUser.uid == item.adminid ? item.key : item.gid,
    };

    dispatch(activeChat(userinfo));
  };

  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl flex justify-between">
        Joined Group
      </h3>

      {jgl.map((item) => (
        <div
          onClick={() => handleActiveChat(item)}
          className="flex gap-x-4 items-center border-b border-solid border-black pb-2.5 m-5"
        >
          <img
            src="images/profileimg.png"
            className="w-[70px] h-[70px] rounded"
          />
          <div>
            <span className="text-sm">{item.adminname}</span>
            <h3 className="font-nunito font-semibold text-lg">{item.gname}</h3>

            <p className="font-nunito font-semibold text-sm">{item.gtag}</p>
          </div>
        </div>
      ))}
      {gm.map((item) => (
        <div
          onClick={() => handleActiveChat(item)}
          className="flex gap-x-4 items-center border-b border-solid border-black pb-2.5 m-5"
        >
          <img
            src="images/profileimg.png"
            className="w-[70px] h-[70px] rounded"
          />
          <div>
            <span className="text-sm">{item.adminname}</span>
            <h3 className="font-nunito font-semibold text-lg">{item.gname}</h3>

            <p className="font-nunito font-semibold text-sm">{item.gtag}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinGroupList;
