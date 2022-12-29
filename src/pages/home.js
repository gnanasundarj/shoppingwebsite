import React from "react";
import Header from "../components/header/Header";
import Slider from "../components/slider/Slider";
import Catagory from "../components/catagory/Catagory";
import Products from "../components/products/Products";
import Mail from "../components/mail/Mail";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { AllproductsDetail } from "../Api/Api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import styled from "styled-components";
import { setAllproducts, changeFetchState } from "../Store/cartReducer";
import { closeModel } from "../Store/Model";

export default function Home() {
  let dispatch = useDispatch();
  let visibility = true;
  let fetchdata = useSelector((state) => state.cartData.fetchData);

  let myRef = useRef(null);
  useEffect(() => {
    if (fetchdata) {
      AllproductsDetail()
        .then((data) => {
          if (data.status === 200) {
            dispatch(setAllproducts({ items: data.data }));
            dispatch(changeFetchState());
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }, []);
  let navigate = useNavigate();
  function catagory(e) {
    console.log(e);
    navigate(`/productlist/${e}`);
  }
  function scrollFunction() {
    // console.log(myRef);
    window.scrollTo({ behavior: "smooth", top: myRef.current.offsetTop });
  }
  return (
    <div
      onClick={(e) => {
        console.log(e.target.id);
        if (e.target.id !== "input") {
          dispatch(closeModel());
        }
      }}
    >
      <Header visibility={visibility} />
      <Slider scrollFunction={scrollFunction} />
      <div ref={myRef}>
        <Catagory catagory={catagory} />
      </div>
      <Products />
      <Mail />
      <Footer />
    </div>
  );
}
