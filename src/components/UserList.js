import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const db = getDatabase();
  let auth = getAuth();

  let [userslist, setUserslist] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      setUserslist(arr);
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
            <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded">
              Send Request
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
