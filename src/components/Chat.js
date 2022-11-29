import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";
const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();

  let [msg, setMsg] = useState("");
  let [singlemsglist, setSinglemsglist] = useState([]);
  let [groupmsglist, setGroupmsglist] = useState([]);
  let data = useSelector((state) => state.activeChat.value);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleMsgSend = () => {
    console.log(data.groupid);
    if (data.status == "group") {
      console.log("group");
      set(push(ref(db, "groupmsg")), {
        whosendid: auth.currentUser.uid,
        whosendname: auth.currentUser.displayName,
        whoreceivename: data.name,
        whoreceiveid: data.groupid,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    } else {
      set(push(ref(db, "singlemsg")), {
        whosendid: auth.currentUser.uid,
        whosendname: auth.currentUser.displayName,
        whoreceivename: data.name,
        whoreceiveid: data.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };

  useEffect(() => {
    const singlemsgrefRef = ref(db, "singlemsg");
    onValue(singlemsgrefRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          (item.val().whosendid == auth.currentUser.uid &&
            item.val().whoreceiveid == data.id) ||
          (item.val().whosendid == data.id &&
            item.val().whoreceiveid == auth.currentUser.uid)
        ) {
          arr.push(item.val());
        }
      });
      setSinglemsglist(arr);
    });
  }, [data.id]);

  useEffect(() => {
    const groupmsgrefRef = ref(db, "groupmsg");
    onValue(groupmsgrefRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupmsglist(arr);
    });
  }, [data.groupid]);

  return (
    <div className=" text-black h-[96vh] border-l border-solid border-black p-2.5 shadow-md">
      <div className="flex gap-x-4 items-center border-b border-solid border-black pb-2.5 m-5">
        <img
          src="images/profileimg.png"
          className="w-[70px] h-[70px] rounded"
        />
        <div>
          <h3 className="font-nunito font-bold text-xl">
            {data ? data.groupid : "Select a group or friend"}
          </h3>
          <p className="font-nunito font-semibold text-sm">Online</p>
        </div>
      </div>
      <div className="h-[75vh] overflow-y-scroll">
        {data.status == "group"
          ? groupmsglist.map((item) =>
              item.whosendid == auth.currentUser.uid
                ? item.whoreceiveid == data.groupid && (
                    <div className="mt-5 flex justify-end">
                      <div>
                        <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                          {item.msg}
                        </p>
                        <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </p>
                      </div>
                    </div>
                  )
                : item.whoreceiveid == data.groupid && (
                    <div className="mt-5">
                      <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
                        {item.msg}
                      </p>
                      <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                        {" "}
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </p>
                    </div>
                  )
            )
          : singlemsglist.map((item) =>
              item.whosendid == auth.currentUser.uid ? (
                <div className="mt-5 flex justify-end">
                  <div>
                    <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
                      {item.msg}
                    </p>
                    <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                      {" "}
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
                    {item.msg}
                  </p>
                  <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
                    {" "}
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              )
            )}

        {/* <div className="mt-5 flex justify-end">
          <div>
            <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
              Hey There !
            </p>
            <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
              {" "}
              Today, 2:01pm
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-nunito font-medium text-xl bg-[#F1F1F1] inline-block p-3.5 rounded-xl">
            <img src="images/registrationimg.webp" />
          </p>
          <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
            {" "}
            Today, 2:01pm
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <div>
            <p className="font-nunito font-medium text-xl text-white bg-primary inline-block p-3.5 rounded-xl">
              <img src="images/registrationimg.webp" />
            </p>
            <p className="font-nunito font-medium text-sm text-[#bebebe] mt-1">
              {" "}
              Today, 2:01pm
            </p>
          </div>
        </div> */}
      </div>
      <div className="mt-2.5">
        <input
          onChange={handleMsg}
          className="border border-solid bg-[#f1f1f1] w-[82%] p-2.5 rounded-lg"
          placeholder="your msg"
        />
        <button
          onClick={handleMsgSend}
          className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded ml-3.5"
        >
          Send
        </button>
        <button className="font-nunito font-bold text-lg text-white bg-primary p-1.5 rounded ml-3.5">
          Attachment
        </button>
      </div>
    </div>
  );
};

export default Chat;
