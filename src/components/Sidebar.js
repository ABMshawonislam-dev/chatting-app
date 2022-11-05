import React, { useState, useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiMessageSquare, FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrCloudUpload } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { Blocks } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const Sidebar = ({ active }) => {
  const auth = getAuth();
  let navigate = useNavigate();
  const storage = getStorage();

  let [show, setShow] = useState(false);
  let [loading, setLoding] = useState(false);
  let [img, setImg] = useState("");
  let [pimg, setPimg] = useState("");
  let [imgname, setImgname] = useState("");
  const [cropper, setCropper] = useState();
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setPimg(cropper.getCroppedCanvas().toDataURL());
  };

  let handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  let handleImageUpload = () => {
    setShow(!show);
    setImg("");
    setPimg("");
  };

  let handleSelectImage = (e) => {
    setImgname(e.target.files[0].name);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = (e) => {
    setLoding(true);
    const storageRef = ref(storage, imgname);
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toDataURL();
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("upload ses");
              setLoding(false);
              setShow(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  };
  return (
    <div className="w-full bg-primary p-2.5 xl:py-9 xl:px-11 xl:rounded-3xl overflow-x-hidden flex gap-x-5 justify-center xl:flex-col fixed bottom-0 left-0 xl:static">
      <div className="relative overflow-hidden w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] rounded-full group ">
        <img
          src={auth.currentUser.photoURL}
          className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] rounded-full"
        />
        <div
          className="w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] bg-primary absolute bottom-0 right-0 flex justify-center items-center hidden group-hover:flex"
          onClick={handleImageUpload}
        >
          <GrCloudUpload className="text-lg" />
        </div>
      </div>
      <h4 className="text-white font-bold font-nunito text-2xl text-center">
        {auth.currentUser.displayName}
      </h4>
      <div className="flex xl:flex-col items-center text-white gap-x-5 xl:gap-y-20 xl:mt-24">
        <div
          className={`${
            active == "home" &&
            "relative z-10  after:absolute after:top-0 after:left-0 after:bg-white xl:after:w-[242%] after:h-full after:content-[''] text-center flex flex-col items-center after:z-[-1] xl:p-10 after:rounded-2xl before:absolute before:top-0 before:right-[-32px] before:rounded xl:before:bg-primary xl:before:w-[15px] before:h-full before:content-[''] before:shadow-lg shadow-cyan-500/50"
          }`}
        >
          <Link to="/">
            <AiOutlineHome
              className={`${
                active == "home"
                  ? "text-3xl xl:text-5xl xl:text-primary"
                  : "text-3xl xl:text-5xl text-white"
              }`}
            />
          </Link>
        </div>

        <div
          className={`${
            active == "message" &&
            "relative z-10  after:absolute after:top-0 after:left-0 after:bg-white after:w-[242%] after:h-full after:content-[''] text-center flex flex-col items-center after:z-[-1] p-10 after:rounded-2xl before:absolute before:top-0 before:right-[-32px] before:rounded before:bg-primary before:w-[15px] before:h-full before:content-[''] before:shadow-lg shadow-cyan-500/50"
          }`}
        >
          <Link to="/message">
            <FiMessageSquare
              className={`${
                active == "message"
                  ? "text-3xl xl:text-5xl text-primary"
                  : "text-3xl xl:text-5xl text-white"
              }`}
            />
          </Link>
        </div>

        <IoMdNotificationsOutline className="text-3xl xl:text-5xl" />
        <FiSettings className="text-3xl xl:text-5xl" />
        <MdLogout
          onClick={handleSignOut}
          className="text-3xl xl:text-5xl xl:mt-44"
        />
      </div>
      {/* photo modal */}
      {show && (
        <div className="w-full h-screen bg-primary flex justify-center items-center fixed top-0 left-0 z-[999]">
          <div className="p-10 bg-white rounded">
            <h1 className="text-5xl text-primary font-bold font-nunito">
              Upload Image
            </h1>
            <div className="relative">
              {pimg ? (
                <img
                  src={pimg}
                  className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] rounded-full"
                />
              ) : (
                <img
                  src={auth.currentUser.photoURL}
                  className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] rounded-full"
                />
              )}

              <input
                className="border border-solid border-black w-full rounded-lg px-14 py-6 sml:p-4 md:!px-14 md:!py-6 mt-9 sml:mt-4 md:!mt-9"
                placeholder="Email Address"
                type="file"
                onChange={handleSelectImage}
              />
            </div>
            <Cropper
              src={img}
              // Cropper.js options
              style={{ height: 100, maxWidth: 100 }}
              initialAspectRatio={16 / 9}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            {loading ? (
              <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
              />
            ) : (
              <>
                <button
                  className=" text-center bg-primary rounded-[5px] p-5 font-nunito font-semibold text-xl text-white mt-5 sml:mt-4 md:!mt-5"
                  onClick={getCropData}
                >
                  Upload
                </button>
                <button
                  className=" text-center ml-5 bg-[#EA6C00] rounded-[5px] p-5 font-nunito font-semibold text-xl text-white mt-5 sml:mt-4 md:!mt-5"
                  onClick={handleImageUpload}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
