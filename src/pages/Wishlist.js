import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/header/Header";
import Mail from "../components/mail/Mail";
import Product from "../../src/components/products/Product";
import "../styles/Productlist.css";
import { useEffect } from "react";
import { useState } from "react";
import { setWishlist } from "../Store/cartReducer";
import { useSelector, useDispatch } from "react-redux";

let Title = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 40px;

  text-transform: uppercase;
`;
let Filter = styled.span`
  margin-right: 10px;
  font-size: 25px;
  font-weight: 20px;
`;
let Container = styled.div``;
export default function Wishlist() {
  let wishListproducts = useSelector((state) => {
    return state.cartData.Allproducts.filter(
      (state) => state.wishStatus === true
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      {/* <ProductListImage />   */}

      <div className="mb-5">
        <Title className="text-center">YOUR WISHLIST</Title>
      </div>
      <div className="container">
        <Container className=" row  ">
          {wishListproducts.map((item) => {
            return <Product item={item} />;
          })}
        </Container>
      </div>

      <Mail />
      <Footer />
    </div>
  );
}
