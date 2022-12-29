import Register from "../pages/Register";
import Login from "../pages/Login";
import { useState } from "react";

export default function Userauth() {

  let [togglePage, setTogglePage] = useState(true);
  function toggle() {
    setTogglePage(!togglePage);
  }

  return togglePage ? <Register toggle={toggle} /> : <Login toggle={toggle} />;
}
