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
import { RiMessage2Fill } from "react-icons/ri";
import { activeChat } from "../slices/activeChat";
const Friends = (props) => {
  let db = getDatabase();
  let auth = getAuth();
  let dispatch = useDispatch();
  let [friends, setFriends] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "friends");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverid ||
          auth.currentUser.uid == item.val().senderid
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      let userinfo = {};
      if (arr[0].receiverid == auth.currentUser.uid) {
        userinfo.status = "single";
        userinfo.id = arr[0].senderid;
        userinfo.name = arr[0].sendername;
      } else {
        userinfo.status = "single";
        userinfo.id = arr[0].receiverid;
        userinfo.name = arr[0].receivername;
      }
      dispatch(activeChat(userinfo));

      setFriends(arr);
    });
  }, []);

  let handleBlock = (item) => {
    console.log(item);
    auth.currentUser.uid == item.senderid
      ? set(push(ref(db, "blockusers")), {
          block: item.receivername,
          blockid: item.receiverid,
          blockby: item.sendername,
          blockbyid: item.senderid,
        }).then(() => {
          remove(ref(db, "friends/" + item.key));
        })
      : set(push(ref(db, "blockusers")), {
          block: item.sendername,
          blockid: item.senderid,
          blockby: item.receivername,
          blockbyid: item.receiverid,
        }).then(() => {
          remove(ref(db, "friends/" + item.key));
        });
  };

  let handleActiveChat = (item) => {
    let userinfo = {};
    if (item.receiverid == auth.currentUser.uid) {
      userinfo.status = "single";
      userinfo.id = item.senderid;
      userinfo.name = item.sendername;
    } else {
      userinfo.status = "single";
      userinfo.id = item.receiverid;
      userinfo.name = item.receivername;
    }
    dispatch(activeChat(userinfo));
  };

  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl">Friends</h3>
      {friends.map((item) => (
        <div
          onClick={() => handleActiveChat(item)}
          className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5"
        >
          <img
            src="images/profileimg.png"
            className="w-[70px] h-[70px] rounded"
          />
          <div>
            <h3 className="font-nunito font-semibold text-lg">
              {auth.currentUser.uid == item.senderid ? (
                <h1>{item.receivername} </h1>
              ) : (
                <h1>{item.sendername} </h1>
              )}
            </h3>
            <p className="font-nunito font-semibold text-sm">
              Be a MERN Warior
            </p>
          </div>
          <div>
            {props.block ? (
              <button
                onClick={() => handleBlock(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
              >
                Block
              </button>
            ) : (
              <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded">
                <RiMessage2Fill />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
