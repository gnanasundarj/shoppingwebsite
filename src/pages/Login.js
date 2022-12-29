import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setUserData } from "../Store/LoginReducer";
import { db, auth } from "../firebase/firebase";

let Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
`;
let Wrapper = styled.div`
  width: 335px;
  height: 350px;
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
let Create = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: blue;
`;
let Errormsg = styled.div`
  color: red;
`;
let Home = styled.div`
  color: blue;
  text-decoration: underline;
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: pointer;
`;

export default function Login(props) {
  let [userData, setUserdata] = useState({});
  let [errorMessage, seterrorMessage] = useState("");
  let navigate = useNavigate();
  let { toggle } = props;
  let dispatch = useDispatch();

  function handleOnchange(e) {
    userData[e.target.name] = e.target.value;
    console.log(userData);
  }
  //////fetch data from dp//////////
  async function fetchDtata(id) {
    console.log(id);
    const docRef = doc(db, "userData", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      dispatch(setUserData(docSnap.data()));
      navigate("/");
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      seterrorMessage("No such document!");
    }
  }
  ////////////////login//////////
  function login() {
    console.log("in login");
    signInWithEmailAndPassword(auth, userData.mailID, userData.password)
      .then((res) => {
        fetchDtata(res.user.uid);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("res", errorMessage);
        let msg = errorMessage.slice(22, errorMessage.indexOf(")"));

        console.log(msg);
        seterrorMessage(msg ? msg : "network error");
      });
  }
  function toHome() {
    navigate("/");
  }
  return (
    <Container className="d-flex justify-content-center align-items-center  ">
      <Home onClick={toHome}>home</Home>

      <Wrapper>
        <Title>SIGN IN </Title>
        <div className=" mt-3">
          <Input
            type="text"
            placeholder="mailID"
            name="mailID"
            onChange={handleOnchange}
          />
        </div>
        <div className=" mt-3">
          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleOnchange}
          />
        </div>

        <Button
          className="mt-4 d-flex justify-content-center align-items-center rounded "
          onClick={login}
        >
          LOGIN
        </Button>
        <Create
          className="mt-4 mb-2 text-center"
          onClick={() => {
            toggle();
          }}
        >
          CREATE NEW ACCOUNT ?
        </Create>
        <Errormsg className="text-center">{errorMessage}</Errormsg>
      </Wrapper>
    </Container>
  );
}
