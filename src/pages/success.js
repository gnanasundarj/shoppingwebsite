import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import placed from "../images/success.svg";

let Title = styled.div`
  position: absolute;
  font-size: 40px;
  color: var(--bs-yellow);
  left: 300px;
  top: 550px;
`;
let Image = styled.img``;
let Container = styled.div`
  position: relative;
`;
let Button = styled.div`
  cursor: pointer;
  width: 200px;
  height: 50px;
  background-color: rgb(243 185 10);
  border-radius: 5px;
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

export default function Success() {
  let navigate = useNavigate();
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center">
        <Image src={placed} alt="image" />

        <Title>Order placed successfully</Title>
      </Container>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Button
          className="d-flex justify-content-center align-items-center "
          onClick={() => {
            navigate("/");
          }}
        >
          Go to home
        </Button>
      </div>
    </div>
  );
}
