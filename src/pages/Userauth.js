import Register from "../pages/Register";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Userauth() {
  let status = useSelector((state) => state.LoginData);
  let [togglePage, setTogglePage] = useState(true);
  function toggle() {
    setTogglePage(!togglePage);
  }

  return togglePage ? <Register toggle={toggle} /> : <Login toggle={toggle} />;
}
