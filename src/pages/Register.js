import React, { useState } from "react";
import styled from "styled-components";
import "../styles/Register.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { db, auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";

let Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  position: relative;
`;
let Wrapper = styled.div`
  width: 700px;
  height: 500px;
  background-color: white;
  padding: 20px;
`;

let Title = styled.div`
  font-size: 30px;
`;
let Input = styled.input`
  height: 40px;
  width: 300px;
  padding: 20px;
`;
let Button = styled.div`
  width: 130px;
  height: 50px;
  cursor: pointer;
  border: 2px black solid;
  background-color: mediumturquoise;
`;
let Usertype = styled.div`
  height: 40px;
  width: 150px;
  padding: 20px;
`;
let Usercontainer = styled.div`
  // height: 40px;
  width: 300px;
`;
let Error = styled.div`
  color: red;
`;
let LoginLink = styled.div`
  color: blue;
  cursor: pointer;
  text-decoration: underline;
`;
let Home = styled.div`
  color: blue;
  text-decoration: underline;
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: pointer;
`;
export default function Register(props) {
  let [type, setType] = useState("select \u00a0 \u00a0 \u00a0 \u00a0 ");
  let [userData, setUserdata] = useState({});
  let [errorMsgSiginin, setErrormsgSignin] = useState("   ");
  let navigate = useNavigate();
  let { toggle } = props;

  function handleSelect(eventKey) {
    setType(eventKey);
  }
  function updateUserData(e) {
    userData[e.target.name] = e.target.value;

  }
  //////////////////////stroting in firebase.////////////
  async function storeinFirebase(id, data) {
    const docRef = await setDoc(doc(db, "userData", id), {
      username: data.username,
      usertype: data.usertype,
      userID: data.userId,
      mail: data.mail,
    });
    setErrormsgSignin("Signup success. Please login");
  }

  ////////////////////////////storing in db///////////////
  async function storeinDB(data) {
    createUserWithEmailAndPassword(auth, data.mail, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        storeinFirebase(user.uid, data);
      })
      .catch((error) => {
        const errorMessage = error.message;
        let msg = errorMessage.slice(
          errorMessage.indexOf("/") + 1,
          errorMessage.length - 2
        );

        setErrormsgSignin(msg ? msg : "network error");
      });
  }
  ////////////////handlesignup/////////////////////
  function handleSignupSubmit() {
    let { userId, password, userName, email, confirmpassword } = userData;
    let user = {
      userId,
      password,
      username: userName,
      mail: email,
      usertype: type,
    };
    if (confirmpassword !== password) {
      setErrormsgSignin("Please check the entered password!");
    } else {
      storeinDB(user);
    }
  }
  function toHome() {
    navigate("/");
  }

  return (
    <Container className="d-flex justify-content-center align-items-center  ">
      <Home onClick={toHome}>home</Home>
      <Wrapper>
        <Title>CREATE AN ACCOUNT </Title>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Input
            type="text"
            name="userId"
            placeholder="user ID"
            onChange={updateUserData}
          />
          <Usercontainer className="d-flex justify-content-center align-items-center ">
            <Usertype className="d-flex justify-content-center align-items-center ">
              USERTYPE
            </Usertype>
            <div className="user">
              <DropdownButton
                align="start"
                title={type}
                name="userType"
                variant="secondary"
                className="d-flex justify-content-center align-items-center "
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
              </DropdownButton>
            </div>
          </Usercontainer>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Input
            type="text"
            name="userName"
            placeholder="username"
            onChange={updateUserData}
          />
          <Input
            type="text"
            name="email"
            placeholder="mail"
            onChange={updateUserData}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={updateUserData}
          />
          <Input
            type="password"
            name="confirmpassword"
            placeholder="confirm password"
            onChange={updateUserData}
          />
        </div>
        <div className="mt-4">
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </div>
        <div></div>
        <Button
          className="mt-4 d-flex justify-content-center align-items-center rounded "
          onClick={handleSignupSubmit}
        >
          CREATE
        </Button>

        <LoginLink
          className="text-center"
          onClick={() => {
            toggle();
          }}
        >
          Already have an account ? Login
        </LoginLink>
        <Error error={errorMsgSiginin} className="text-center">
          {errorMsgSiginin}
        </Error>
      </Wrapper>
    </Container>
  );
}

// data.

// createdAt
// :
// "2022-09-22T14:41:38.237Z"
// email
// :
// "gnana@gmail.com"
// name
// :
// "sundar"
// updatedAt
// :
// "2022-09-22T14:41:38.237Z"
// userId
// :
// "8147"
// userStatus
// :
// "APPROVED"
// userTypes
// :
// "CUSTOMER"
