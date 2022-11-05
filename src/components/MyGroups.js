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
const MyGroups = () => {
  let db = getDatabase();
  let auth = getAuth();
  let [grouplist, setGrouplist] = useState([]);
  let [showinfo, setShowInfo] = useState(false);
  let [showlist, setShowList] = useState(false);
  let [memberrequest, setMemberRequest] = useState([]);
  let [memberlist, setMemberlist] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "group");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == auth.currentUser.uid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGrouplist(arr);
    });
  }, []);

  let handleRequestShow = (item) => {
    setShowInfo(!showinfo);
    const usersRef = ref(db, "groupjoinrequest");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((gitem) => {
        if (
          item.adminid == auth.currentUser.uid &&
          item.gid == gitem.val().gid
        ) {
          arr.push({ ...gitem.val(), key: gitem.key });
        }
      });
      setMemberRequest(arr);
    });
  };

  let handleMemberReject = (item) => {
    remove(ref(db, "groupjoinrequest/" + item.key));
  };

  let handleMemberAccept = (item) => {
    console.log(item);
    set(push(ref(db, "groupmember")), {
      adminid: item.adminid,
      gid: item.gid,
      gname: item.gname,
      gtag: item.gtag,
      userid: item.userid,
      username: item.username,
      userprofile: item.userprofile,
      key: item.key,
    }).then(() => {
      remove(ref(db, "groupjoinrequest/" + item.key));
    });
  };

  let handleMember = (id) => {
    setShowList(true);
    const gmemberRef = ref(db, "groupmember");
    onValue(gmemberRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (id.gid == item.val().gid) {
          arr.push(item.val());
        }
        setMemberlist(arr);
      });
    });
  };

  return (
    <div className="shadow-sm shadow-black p-5 h-[427px] overflow-y-scroll rounded-3xl mt-5">
      <h3 className="font-nunito font-semibold text-xl">My Groups</h3>
      {showinfo ? (
        <>
          <button
            onClick={() => setShowInfo(!showinfo)}
            className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
          >
            Back
          </button>
          {memberrequest.map((item) => (
            <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
              <img
                src={item.userprofile}
                className="w-[70px] h-[70px] rounded"
              />
              <div>
                <h3 className="font-nunito font-semibold text-lg">
                  {item.username}
                </h3>
                <p className="font-nunito font-semibold text-sm">{item.gtag}</p>
              </div>
              <div>
                <button
                  onClick={() => handleMemberAccept(item)}
                  className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleMemberReject(item)}
                  className="font-nunito font-bold text-lg text-white bg-red-500 p-1.5 rounded ml-2.5"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </>
      ) : showlist ? (
        <>
          <button
            onClick={() => setShowList(false)}
            className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
          >
            Back
          </button>
          {memberlist.map((item) => (
            <div className="flex gap-4 items-center border-b border-solid border-black pb-2.5 m-5">
              <img
                src={item.userprofile}
                className="w-[70px] h-[70px] rounded"
              />
              <div>
                <h3 className="font-nunito font-semibold text-lg">
                  {item.username}
                </h3>
                <p className="font-nunito font-semibold text-sm">{item.gtag}</p>
              </div>
              <div>
                <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        grouplist.map((item) => (
          <div className="flex justify-between items-center border-b border-solid border-black pb-2.5 m-5">
            <img
              src="images/profileimg.png"
              className="w-[70px] h-[70px] rounded"
            />
            <div>
              <h3 className="font-nunito font-semibold text-lg">
                {item.gname}
              </h3>
              <p className="font-nunito font-semibold text-sm">{item.gtag}</p>
            </div>
            <div>
              <button
                onClick={() => handleRequestShow(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded"
              >
                Info
              </button>
              <button
                onClick={() => handleMember(item)}
                className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded ml-2.5"
              >
                Members
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyGroups;
