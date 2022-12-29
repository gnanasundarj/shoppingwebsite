import React from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/LoginReducer";
import SearchMenu from "../SearchMenu";
import Userauth from "../../pages/Userauth";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./header.css";
let Searcbutton = styled.div`
  margin-left: 10px;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;
let Lan = styled.div`
  // font-size: 20px;
  // font-weight: 500;
`;
let Input = styled.input`
  height: 30px;
  width: 300px;
`;
let Cart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

let Value = styled.div`
  font-weight: 600;
  position: absolute;
  left: 13px;
  top: -15px;
`;
let Valuewish = styled.div`
  font-weight: 600;
  position: absolute;
  left: 9px;
  top: -15px;
`;

export default function Header(props) {
  let { visibility } = props;
  let navigate = useNavigate();
  let data = useSelector((state) => state.cartData.item);
  let status = useSelector((state) => state.LoginData);
  let wishcount = useSelector((state) => state.cartData.wishCount);
  let dispatch = useDispatch();

  function cartPage() {
    navigate(`/cart`);
  }
  function handleLogin() {
    if (!status.loginStatus) {
      navigate("/login");
    } else {
      dispatch(logout());
    }
  }
  function wishPage() {
    navigate("/wish");
  }
  return (
    <div className="header row">
      <div className="col d-flex  align-items-center logo ">
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          fashion outlet
        </h2>
      </div>
      {visibility && <SearchMenu />}

      <div className="col d-flex  align-items-center  justify-content-end ">
        <div className="hover" style={{ marginRight: "20px" }}>
          {status.userInfo.username}
        </div>
        <OverlayTrigger
          placement="bottom"
          // delay={{ show: 100, hide: 100 }}
          overlay={
            <Tooltip id="button-tooltip">
              {status.loginStatus ? "LOGOUT" : "LOGIN"}
            </Tooltip>
          }
        >
          <div
            className="hover"
            style={{ marginRight: "20px" }}
            onClick={handleLogin}
          >
            {status.loginStatus ? "LOGOUT" : "LOGIN"}
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          // delay={{ show: 100, hide: 100 }}
          overlay={<Tooltip id="button-tooltip">Cart</Tooltip>}
        >
          <Cart className="hover" style={{ marginRight: "20px" }}>
            <Value>{data.length === 0 ? "" : data.length}</Value>

            <div>
              <AiOutlineShoppingCart onClick={cartPage} size={30} />
            </div>
          </Cart>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          // delay={{ show: 100, hide: 100 }}
          overlay={<Tooltip id="button-tooltip">Wishlist</Tooltip>}
        >
          <Cart className="hover   " style={{ marginRight: "20px" }}>
            <Valuewish>{wishcount === 0 ? "" : wishcount}</Valuewish>

            <div>
              <AiOutlineHeart onClick={wishPage} size={30} />
            </div>
          </Cart>
        </OverlayTrigger>
      </div>
    </div>
  );
}
