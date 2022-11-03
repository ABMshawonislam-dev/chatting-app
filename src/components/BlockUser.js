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
const BlockUser = () => {
  let db = getDatabase();
  let auth = getAuth();
  let [friends, setFriends] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "blockusers");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == auth.currentUser.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else {
          arr.push({
            id: item.key,
            block: item.val().blockby,
            blockbyid: item.val().blockbyid,
          });
        }
      });
      setFriends(arr);
    });
  }, []);

  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockid,
      receiverid: auth.currentUser.uid,
      receivername: auth.currentUser.displayName,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockusers/" + item.id));
    });
  };
  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl">Block User</h3>
      {friends.map((item) => (
        <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
          <img
            src="images/profileimg.png"
            className="w-[70px] h-[70px] rounded"
          />
          <div>
            <h3 className="font-nunito font-semibold text-lg">{item.block}</h3>
            <p className="font-nunito font-semibold text-sm">
              Be a MERN Warior
            </p>
          </div>
          <div>
            {!item.blockbyid && (
              <button
                onClick={() => handleUnblock(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
              >
                Unblock
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockUser;
