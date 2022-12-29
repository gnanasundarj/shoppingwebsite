import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import spinner from "../images/spinner.gif";
import { useSelector, useDispatch } from "react-redux";

let Container = styled.div`
  position: absolute;
  width: 360px;
  height: 550px;
  border-radius: 5px;
  background-color: rgb(236 236 230);
  padding: 30px;
  z-index: 10;
`;
let Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: rgb(77 82 88);
`;
let Title = styled.div`
  color: black;
  font-size: 30px;
  font-weight: 600;
  margin-top: 20px;
`;
let CardNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;
let CardNoInput = styled.input`
  border-radius: 5px;
  width: 300px;
  height: 47px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
`;
let CardExpiryInput = styled.input`
  border-radius: 5px;
  width: 130px;
  height: 47px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
`;
let CardCvvInput = styled.input`
  border-radius: 5px;
  width: 130px;
  height: 47px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 600;
`;
let Spinner = styled.img``;
let SpinnerContainer = styled.div`
  position: absolute;
  z-index: ${(prop) => prop.ind};
  opacity: 0.7;
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
`;

let SubmitButton = styled.div`
  width: 300px;
  height: 47px;
  border: 2px black solid;
  border-radius: 5px;
  background-color: rgb(149 149 133);
  cursor: ${(prop) => (prop.button < 4 ? "not-allowed" : "pointer")};
  opacity: ${(prop) => (prop.button < 4 ? "0.6" : "1")};
`;
export default function Payment() {
  let [cardno, setCardno] = useState("");
  let [cardCvv, setcardCvv] = useState("");
  let [cardExpiray, setcardExpiray] = useState("");
  let [cardname, setcardname] = useState("");
  let [button, setButton] = useState(0);
  let [numBoolean, setnumboolean] = useState(true);
  let [expiryBoolean, setexpiryBoolean] = useState(true);
  let [cvvBoolean, setcvvboolean] = useState(true);
  let [namoolean, setnamboolean] = useState(true);
  let navigate = useNavigate();
  let [ind, setInd] = useState(-10);
  let checkOutData = useSelector((state) => state.cartData.checkout);

  function handlecardNumber(e) {
    let num = e.target.value.replace(/[^\d]/g, "");
    let len = num.length;
    if (len <= 4) {
      setCardno(num);
    } else if (len > 4 && len < 9) {
      let temp = `${num.slice(0, 4)} - ${num.slice(4, 8)}`;
      setCardno(temp);
    } else {
      let temp = `${num.slice(0, 4)} - ${num.slice(4, 8)} - ${num.slice(
        8,
        13
      )}`;
      setCardno(temp);
    }
    if (len >= 12 && numBoolean) {
      setButton(button + 1);
      setnumboolean(false);
    }
    if (len < 12 && !numBoolean) {
      console.log("in teting");
      setButton(button - 1);
      setnumboolean(true);
    }
    console.log(num.length, numBoolean);
  }
  function handleExpiray(e) {
    let num = e.target.value.replace(/[^\d]/g, "");

    console.log(num, num.length);
    let len = num.length;
    if (len <= 2) {
      setcardExpiray(num);
    } else {
      let temp = `${num.slice(0, 2)} / ${num.slice(2, 4)}`;
      setcardExpiray(temp);
    }
    if (len >= 4 && expiryBoolean) {
      setButton(button + 1);
      setexpiryBoolean(false);
    }
    if (len < 4 && !expiryBoolean) {
      // console.log("in teting");
      setButton(button - 1);
      setexpiryBoolean(true);
    }
  }
  function handleCvv(e) {
    let num = e.target.value.replace(/[^\d]/g, "");
    let len = num.length;

    setcardCvv(num);
    if (len >= 3 && cvvBoolean) {
      setButton(button + 1);
      setcvvboolean(false);
    }
    if (len < 3 && !cvvBoolean) {
      // console.log("in teting");
      setButton(button - 1);
      setcvvboolean(true);
    }
  }
  function handlename(e) {
    let name = e.target.value;
    let len = name.length;
    setcardname(name);
    if (len >= 3 && namoolean) {
      setButton(button + 1);
      setnamboolean(false);
    }
    if (len < 3 && !namoolean) {
      // console.log("in teting");
      setButton(button - 1);
      setnamboolean(true);
    }
  }
  function handleSubmit() {
    if (button === 4) {
      setTimeout(() => {
        navigate("/Success");
      }, 2500);
      setInd(80);
    }
  }
  useEffect(() => {
    console.log(button);
  }, [button]);
  return (
    <Wrapper className="d-flex justify-content-center align-items-center ">
      <Container>
        <div>
          <Title className=" ">Card Details</Title>
          <CardNumber> Card Number:</CardNumber>
          <CardNoInput
            type="text"
            placeholder="xxxx - xxxx - xxxx - xxxx"
            onChange={handlecardNumber}
            value={cardno}
            maxLength={18}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <CardNumber> Expiry date:</CardNumber>
            <CardExpiryInput
              type="text"
              placeholder="mm / yy"
              onChange={handleExpiray}
              value={cardExpiray}
              maxLength={7}
            />
          </div>
          <div>
            <CardNumber> Cvv:</CardNumber>
            <CardCvvInput
              type="text"
              placeholder="000"
              onChange={handleCvv}
              value={cardCvv}
              maxLength={3}
            />
          </div>
        </div>
        <div>
          <CardNumber> Name on card:</CardNumber>
          <CardNoInput
            type="text"
            placeholder="name"
            onChange={handlename}
            value={cardname}
            maxLength={18}
          />
        </div>
        <div>
          <CardNumber> Total amt: $ {checkOutData.total}</CardNumber>
        </div>
        <SubmitButton
          onClick={handleSubmit}
          button={button}
          className="mt-4  d-flex justify-content-center align-items-center "
        >
          Pay
        </SubmitButton>
      </Container>
      <SpinnerContainer
        ind={ind}
        className="d-flex justify-content-center align-items-center "
      >
        <Spinner src={spinner}></Spinner>
      </SpinnerContainer>
    </Wrapper>
  );
}
