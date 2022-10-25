import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const db = getDatabase();
  let auth = getAuth();

  let [userslist, setUserslist] = useState([]);
  let [friend, setFriend] = useState([]);
  let [friendlist, setFriendlist] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserslist(arr);
    });
  }, []);

  let handleFriendRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receiverid: item.id,
      receivername: item.name,
    });
  };

  useEffect(() => {
    const friendRef = ref(db, "friendrequest/");
    onValue(friendRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((item) => {
        console.log("asdasd");
        friendArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriend(friendArr);
    });
  }, []);
  useEffect(() => {
    // let friendRequestArr2 = []
    const friendRef = ref(db, "friends");
    onValue(friendRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((item) => {
        friendArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendlist(friendArr);
    });
  }, []);

  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl">Users</h3>
      {userslist.map((item) => (
        <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
          <img src={item.photoURL} className="w-[70px] h-[70px] rounded-full" />
          <div>
            <h3 className="font-nunito font-semibold text-lg">{item.name}</h3>
            <p className="font-nunito font-semibold text-sm">{item.email}</p>
          </div>
          <div>
            {friendlist.includes(item.id + auth.currentUser.uid) ||
            friendlist.includes(auth.currentUser.uid + item.id) ? (
              <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded">
                Friend
              </button>
            ) : friend.includes(item.id + auth.currentUser.uid) ||
              friend.includes(auth.currentUser.uid + item.id) ? (
              <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded">
                Pending
              </button>
            ) : (
              <button
                onClick={() => handleFriendRequest(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
              >
                Send Request
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
