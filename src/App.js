import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Home from "./pages/home";
import Message from "./pages/message";
import ForgotPassword from "./pages/forgotPassword";
import { useState } from "react";

function App() {
  let [dark, setDark] = useState(false);
  return (
    <div className={dark && "bg-black text-white"}>
      <div>
        <input
          className="dark"
          onChange={() => setDark(!dark)}
          id="abc"
          type="checkbox"
        />
        <label className="abc" for="abc"></label>{" "}
        <span>{dark ? "Light" : "Dark"}</span>
      </div>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Message />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
