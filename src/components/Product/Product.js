import React from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../../styles/Productlist.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { add, remove } from "../../Store/cartReducer";
import { useDispatch } from "react-redux";

let Imgcontainer = styled.div`
  flex: 1;
  //   margin-top: 80px;
  //   margin-left: 80px;
`;
let Img = styled.img`
  height: 70vh;
  width: 90%;
`;

let Container = styled.div``;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
let Info = styled.div`
  flex: 1;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  margin-bottom: 30px;
`;

let Sizefilter = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;
let Size = styled.div``;
let Inc = styled.div`
  font-size: 40px;
  font-weight: 100;
  cursor: pointer;
`;

let Cart = styled.div`
  height: 40px;
  width: 100px;
  border: 2px black solid;
  background-color: rgb(63.2, 183, 181);
  cursor: pointer;
`;
let RemoveCart = styled.div`
  height: 40px;
  width: 100px;
  border: 2px black solid;
  background-color: rgb(234, 125, 125);
  cursor: pointer;
`;
export default function Product() {
  let params = useParams();
  let [product, setproduct] = useState({});
  let [size, setSize] = useState("S");
  let [count, setCount] = useState(1);
  let [price, setPrice] = useState(0);
  let dispatch = useDispatch();
  let info = useSelector((state) => {
    return state.cartData;
  });

  let {
    title = "",
    description = "",
    image = "",
    price: initialprice,
  } = product;

  function filterSingleProduct(data, params) {
    let x = data.Allproducts.filter((pro) => {
      return pro.id == params.info;
    });
    let cartCount = data.item.filter((pro) => {
      return pro.id == params.info;
    });
    setPrice(x[0].price);
    if (x[0].cartStatus === true) {
      setCount(cartCount[0].count);
    }
    setproduct(...x);
  }
  useEffect(() => {
    // console.log(info, params.info);
    filterSingleProduct(info, params);

    // console.log(product);
  }, [info, params]);
  function handleSelect(eventKey) {
    setSize(eventKey);
  }
  function addCart() {
    let cartdetail;
    if (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    ) {
      cartdetail = {
        count,
        size,
        price,
        initialprice,
        id: product.id,
        title,
        image,
      };
    } else {
      cartdetail = {
        count,
        price,
        initialprice,
        id: product.id,
        title,
        image,
      };
    }

    console.log(cartdetail);

    dispatch(add(cartdetail));
  }
  function removeCart() {
    console.log(count);
    dispatch(remove({ count, price, initialprice, id: product.id }));
  }

  return (
    <div>
      <Header />
      <Container className="d-flex  m-5">
        <Imgcontainer>
          <Img src={image} />
        </Imgcontainer>

        <Info>
          <Title>{title}</Title>
          <Desc>{description}</Desc>
          <Price>$ {price}</Price>
          {product.size && (
            <div className="mt-2 d-flex  align-items-center">
              <Size className="d-flex  align-items-center">
                <Sizefilter>Size</Sizefilter>
                <DropdownButton
                  align="start"
                  title={size}
                  variant="light"
                  className="dropColor"
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="XL">XL</Dropdown.Item>
                  <Dropdown.Item eventKey="M">M</Dropdown.Item>
                  <Dropdown.Item eventKey="XS">XS</Dropdown.Item>
                </DropdownButton>
              </Size>
            </div>
          )}

          <div className="d-flex  align-items-center mt-4">
            {product.cartStatus ? (
              <div>
                <RemoveCart
                  onClick={removeCart}
                  className="d-flex justify-content-center align-items-center"
                >
                  Remove
                </RemoveCart>
              </div>
            ) : (
              <div className="d-flex  align-items-center gap-2">
                <Cart
                  onClick={addCart}
                  className="d-flex justify-content-center align-items-center"
                >
                  Add to cart
                </Cart>
              </div>
            )}
          </div>
        </Info>
      </Container>
      <Footer />
    </div>
  );
}
