import React from "react";
import styled from "styled-components";
// import { popularProducts } from "../../Data/Data";
import AllProducts from "../products/Product";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
let Container = styled.div``;
let Allproducts = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-top: 50px;
`;
export default function Products() {
  let allpro = useSelector((state) => state.cartData.Allproducts);
  // useEffect(() => {
  // }, [allpro]);

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
