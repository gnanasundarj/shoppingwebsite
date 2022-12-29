import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/header/Header";
import Mail from "../components/mail/Mail";
import Product from "../../src/components/products/Product";
import "../styles/Productlist.css";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

let Title = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 40px;

  text-transform: uppercase;
`;

let Container = styled.div``;
export default function ProductList() {
  let visibility = false;
  let params = useParams();
  let [filterProducts, setFilterProducts] = useState([]);
  let Allproducts = useSelector((state) => state.cartData.Allproducts);
  function filtering(all) {
    return all.filter((item) => {
      return item.category === params.catagory;
    });
  }

  useEffect(() => {
    let prod = filtering(Allproducts);
    setFilterProducts(prod);
    window.scrollTo(0, 0);
  }, [Allproducts]);
  return (
    <div>
      <Header visibility={visibility} />
      {/* <ProductListImage />   */}

      <div className="mb-5">
        <Title className="text-center">{params.catagory}</Title>
      </div>
      <div className="container">
        <Container className=" row  ">
          {filterProducts.map((item) => {
            return <Product item={item} />;
          })}
        </Container>
      </div>

      <Mail />
      <Footer />
    </div>
  );
}
