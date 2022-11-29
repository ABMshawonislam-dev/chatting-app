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
const FriendRequest = () => {
  let db = getDatabase();
  let auth = getAuth();
  let [friendrequest, setFriendrequest] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendrequest(arr);
    });
  }, []);

  let handleAcceptFriendRequest = (item) => {
    set(push(ref(db, "friends")), {
      id: item.id,
      sendername: item.sendername,
      senderid: item.senderid,
      receiverid: item.receiverid,
      receivername: item.receivername,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
    });
  };
  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl">Friend Request</h3>
      {friendrequest.length == 0 ? (
        <p className="bg-green-500 p-2.5 rounded text-center text-2xl text-white mt-5">
          No Friend Request Available
        </p>
      ) : (
        friendrequest.map((item) => (
          <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
            <img
              src="images/profileimg.png"
              className="w-[70px] h-[70px] rounded"
            />
            <div>
              <h3 className="font-nunito font-semibold text-lg">
                {item.sendername}
              </h3>
              <p className="font-nunito font-semibold text-sm">
                Be a MERN Warior
              </p>
            </div>
            <div>
              <button
                onClick={() => handleAcceptFriendRequest(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
              >
                Accept
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequest;
