import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
const Group = () => {
  let db = getDatabase();
  let auth = getAuth();
  let [cgroup, setCgroup] = useState(false);
  let [gname, setGname] = useState("");
  let [gtag, setGtag] = useState("");
  let [grouplist, setGrouplist] = useState([]);

  let handleCreateGroup = () => {
    set(push(ref(db, "group")), {
      gname: gname,
      gtag: gtag,
      adminname: auth.currentUser.displayName,
      adminid: auth.currentUser.uid,
    }).then(() => {
      setCgroup(false);
    });
  };

  useEffect(() => {
    const usersRef = ref(db, "group");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid != auth.currentUser.uid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGrouplist(arr);
    });
  }, []);

  let handleGroupJoin = (item) => {
    set(push(ref(db, "groupjoinrequest")), {
      adminid: item.adminid,
      gid: item.gid,
      gname: item.gname,
      gtag: item.gtag,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      userprofile: auth.currentUser.photoURL,
    });
    set(push(ref(db, "notification")), {
      adminid: item.adminid,
      gid: item.gid,
      gname: item.gname,
      gtag: item.gtag,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
    });
  };

  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl flex justify-between">
        Groups List{" "}
        <button
          onClick={() => setCgroup(!cgroup)}
          className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
        >
          {cgroup ? "Go back" : "Create Group"}
        </button>
      </h3>

      {cgroup ? (
        <>
          <input
            className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4  md:!py-3 mt-9 sml:mt-4 md:!mt-9"
            placeholder="Group Name"
            onChange={(e) => setGname(e.target.value)}
          />
          <input
            className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4  md:!py-3 mt-9 sml:mt-4 md:!mt-3"
            placeholder="Group Tagline"
            onChange={(e) => setGtag(e.target.value)}
          />
          <button
            onClick={handleCreateGroup}
            className="w-full text-center bg-primary rounded-[86px] py-2 font-nunito font-semibold text-xl text-white mt-12 sml:mt-4 md:!mt-3"
          >
            Create Group
          </button>
        </>
      ) : (
        grouplist.map((item) => (
          <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
            <img
              src="images/profileimg.png"
              className="w-[70px] h-[70px] rounded"
            />
            <div>
              <span className="text-sm">Admin:{item.adminname}</span>
              <h3 className="font-nunito font-semibold text-lg">
                {item.gname}
              </h3>

              <p className="font-nunito font-semibold text-sm">{item.gtag}</p>
            </div>
            <div>
              <button
                onClick={() => handleGroupJoin(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
              >
                Join
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Group;
