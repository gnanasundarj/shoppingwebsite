import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Catimage } from "../Data/Data";
let Container = styled.div``;

let Image = styled.img`
  width: 100vw;
  height:70vh;
`;

export default function ProductListImage() {
  let params = useParams();

  return (
    <Container>
      <Image src={Catimage.men} />
    </Container>
  );
}
