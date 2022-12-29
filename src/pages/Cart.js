import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeCount, remove } from "../Store/cartReducer";
import { useNavigate } from "react-router";

let Dec = styled.div`
  font-size: 40px;
  font-weight: 100;
  cursor: pointer;
`;
let Count = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 20%;
  border: 2px black solid;
`;
let Countno = styled.div`
  font-size: 20px;
`;
let Inc = styled.div`
  font-size: 40px;
  font-weight: 100;
  cursor: pointer;
`;
let Title = styled.h2`
  font-weight: 500;
`;
let BottonContinue = styled.div`
  width: 200px;
  height: 50px;
  background-color: white;
  cursor: pointer;
  border: 2px black solid;
  font-weight: 600;
`;
let BottonCheckout = styled.div`
  width: 200px;
  height: 50px;
  background-color: black;
  padding: 20px;
  color: white;
  cursor: ${(prop) => (prop.check ? "not-allowed" : "pointer")};
  opacity: ${(prop) => (prop.check ? "0.6" : "1")};
`;
let TitleSum = styled.div`
  font-size: 20px;
`;
let Info = styled.span`
  color: brown;
`;
let Cartinfo = styled.div``;
let Order = styled.div`
  width: 350px;
  height: 400px;
  margin-left: 60px;
  border: 1px black solid;
  padding: 20px;
`;
let Image = styled.img`
  width: 200px;
  height: 200px;
`;
let InfoProduct = styled.div`
  margin-left: 50px;
`;
let InfoTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
`;
let ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;
let InfoSummary = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
let Total = styled.div`
  font-weight: 400;
  font-size: 30px;
`;
let CheckoutFinal = styled.div`
  width: 100%;
  height: 50px;
  background-color: black;
  padding: 20px;
  color: white;
  margin-top: 20px;
  cursor: ${(prop) => (prop.check ? "not-allowed" : "pointer")};
  opacity: ${(prop) => (prop.check ? "0.6" : "1")};
`;
let Emptyimg = styled.img`
  width: 200px;
  height: 200px;
`;
let Empinfo = styled.h2``;

export default function Cart() {
  let cart = useSelector((state) => state.cartData.item);
  let checkOutData = useSelector((state) => state.cartData.checkout);
  let [checkout, setCheckout] = useState(true);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (checkOutData.subtotal > 0) {
      setCheckout(false);
    } else {
      setCheckout(true);
    }
  }, [checkOutData]);

  function changetotal(type, data) {
    if (type === "inc") {
      let count = data.count + 1;
      let price = Math.round(count * data.initialprice * 100) / 100;
      let pay = {
        count: count,
        price: price,
        id: data.id,
        type: "inc",
        initialprice: data.initialprice,
      };

      dispatch(changeCount(pay));
      console.log("inc", count, price);
    } else {
      let count = 0;
      if (data.count > 1) {
        count = data.count - 1;
      } else {
        removeCart(data);
        return;
      }

      let price = Math.round(count * data.initialprice * 100) / 100;
      let pay = {
        count: count,
        price: price,
        id: data.id,
        type: "dec",
        initialprice: data.initialprice,
      };

      dispatch(changeCount(pay));
    }
  }
  function removeCart(data) {
    console.log(data);
    dispatch(remove(data));
  }
  function handleCheckout() {
    if (checkOutData.subtotal > 0) {
      navigate("/payment");
    }
  }
  return (
    <div>
      <div>
        <Header />
        <Title className="d-flex justify-content-center align-items-center ">
          YOUR ORDER
        </Title>
        <div className="d-flex justify-content-between align-items-center m-3 ">
          <BottonContinue
            className="d-flex justify-content-center align-items-center "
            onClick={() => {
              navigate("/");
            }}
          >
            CONTINUE SHOPPING
          </BottonContinue>
          <TitleSum className="d-flex justify-content-between align-items-center font-weight-bold  gap-2">
            <div>
              Shopping order (<Info>{cart.length}</Info>)
            </div>
          </TitleSum>
          <BottonCheckout
            check={checkout}
            onClick={handleCheckout}
            className="d-flex justify-content-center align-items-center  "
          >
            CHECKOUT NOW
          </BottonCheckout>
        </div>
        <div style={{ minHeight: "300px", marginTop: "50px" }} className="row">
          <div className="col-sm-8">
            {cart.length === 0 ? (
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <Emptyimg
                    src="http://cdn.onlinewebfonts.com/svg/img_297674.png"
                    alt="img"
                  ></Emptyimg>
                </div>
                <Empinfo className="text-center">Your cart is empty</Empinfo>
              </div>
            ) : (
              cart.map((data, id) => {
                return (
                  <Cartinfo className="row">
                    <div className="col-sm-8 d-flex">
                      <div>
                        <Image src={data.image}></Image>
                      </div>
                      <InfoProduct className="">
                        <div className="mb-2">
                          <InfoTitle className="font-weight-bolder">
                            Product :
                          </InfoTitle>
                          {data.title}
                        </div>
                        <div className="mb-2">
                          <InfoTitle className="font-weight-bolder">
                            ID :
                          </InfoTitle>
                          {data.id}
                        </div>
                        <ProductColor color={"black"} />
                        {data.size && (
                          <div className="">
                            <InfoTitle className="font-weight-bolder">
                              Size :
                            </InfoTitle>
                            {data.size}
                          </div>
                        )}
                      </InfoProduct>
                    </div>
                    <div className="col-sm-4 ">
                      <div className="d-flex  align-items-center gap-2">
                        <Dec
                          onClick={() => {
                            changetotal("dec", data);
                          }}
                        >
                          -
                        </Dec>
                        <Count className="d-flex justify-content-center align-items-center">
                          <Countno>{data.count}</Countno>
                        </Count>
                        <Inc
                          onClick={() => {
                            changetotal("inc", data);
                          }}
                        >
                          +
                        </Inc>
                      </div>
                      <Price>$ {data.price}</Price>
                      <button
                        onClick={() => {
                          removeCart(data);
                        }}
                        className="btn btn-dark"
                      >
                        remove
                      </button>
                    </div>
                  </Cartinfo>
                );
              })
            )}
          </div>
          <div className="col-sm-4 ">
            <Order className="rounded">
              <Title className="d-flex justify-content-center align-items-center ">
                ORDER SUMMARY
              </Title>
              <br />
              <div className="d-flex justify-content-between align-items-center  ">
                <InfoSummary>Subtotal</InfoSummary>
                <InfoSummary>$ {checkOutData.subtotal}</InfoSummary>
              </div>
              <div className="d-flex justify-content-between align-items-center  ">
                <InfoSummary>Estimated Shipping</InfoSummary>
                <InfoSummary>$ {checkOutData.totalshipping}</InfoSummary>
              </div>
              <div className="d-flex justify-content-between align-items-center  ">
                <InfoSummary>Shipping Discount</InfoSummary>
                <InfoSummary>$ {checkOutData.totaldiscount}</InfoSummary>
              </div>
              <div className="d-flex justify-content-between align-items-center  ">
                <Total>TOTAL</Total>
                <Total>$ {checkOutData.total}</Total>
              </div>
              <div>
                <CheckoutFinal
                  onClick={handleCheckout}
                  check={checkout}
                  className="d-flex justify-content-center align-items-center  "
                >
                  CHECKOUT NOW
                </CheckoutFinal>
              </div>
            </Order>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
