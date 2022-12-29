import React from "react";
import styled from "styled-components";
import "../catagory/Catagory.css";
let Image = styled.img`
  object-fit: cover;
  transition: 0.5s all ease-in-out;
`;
let Title = styled.div`
  font-size: 40px;
  color: white;
`;
let Container = styled.div`
  position: relative;
  overflow: hidden;
`;
let Info = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

let Button = styled.div`
  width: 100px;
  height: 50px;
  cursor: pointer;
  font-weight: 600;
  background-color: white;
`;

export default function CatagoryItem(props) {
  let { item, catagory } = props;

  return (
    <Container
      className="col-sm-4 imageHover"
      onClick={() => {
        catagory(item.catagory);
      }}
    >
      <Image
        style={{ width: "100%", height: "500px" }}
        src={item.img}
        alt="img"
        className=""
      />
      <Info className="d-flex justify-content-center align-items-center">
        <div>
          <Title className="">{item.title}</Title>
          <div className="d-flex justify-content-center align-items-center">
            <Button className="d-flex justify-content-center align-items-center">
              SHOP NOW
            </Button>
          </div>
        </div>
      </Info>
    </Container>
  );
}
