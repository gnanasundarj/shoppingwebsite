import React from "react";
import styled from "styled-components";
import AllProducts from "../products/Product";
import { useSelector } from "react-redux";

let Container = styled.div``;
let Allproducts = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-top: 50px;
`;
export default function Products() {
  let allpro = useSelector((state) => state.cartData.Allproducts);
 

  return (
    <div>
      <Allproducts className="container">ALL PRODUCTS</Allproducts>
      <div className=" container">
        <Container className=" row ">
          {allpro.map((item) => {
            return <AllProducts item={item} />;
          })}
        </Container>
      </div>
    </div>
  );
}
