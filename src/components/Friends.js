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
const Friends = () => {
  let db = getDatabase();
  let auth = getAuth();
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

  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl">Friends</h3>
      {friends.map((item) => (
        <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
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
            <button
              onClick={() => handleBlock(item)}
              className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
            >
              Block
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
