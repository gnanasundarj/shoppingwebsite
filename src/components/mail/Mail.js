import React from "react";
import styled from "styled-components";
let Container = styled.div`
  background-color: rgb(237, 237, 237);

  min-height: 300px;
  width: 100vw;
`;
let Title = styled.h1`
  font-size: 70px;
`;
let Desc = styled.div`
  font-size: 30px;
`;
let Input = styled.input`
  width: 700px;
  height: 40px;
`;
let Button = styled.div`
  width: 80px;
  height: 40px;
  background-color: rgb(63, 118, 63);
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export default function Mail() {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div>
        <Title className="d-flex justify-content-center align-items-center">
          News Letter
        </Title>
        <Desc className="d-flex justify-content-center align-items-center mb-4">
          Get timely updates from your favorite products.
        </Desc>
        <div className="d-flex justify-content-center align-items-center">
          <Input className="" placeholder="your mail"></Input>
          <Button className="d-flex justify-content-center align-items-center">
            SEND
          </Button>
        </div>
      </div>
    </Container>
  );
}
