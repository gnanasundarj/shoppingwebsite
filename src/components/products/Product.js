import React from "react";
import styled from "styled-components";
import "./product.css";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillStar,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { add, remove, setWishlist } from "../../Store/cartReducer";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

let Image = styled.img`
  width: 100%;
  height: 40vh;
  z-index: 2;
`;
let Util = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(248, 245, 241, 0.5);
  z-index: 3;
  transition: all 0.5s ease;
`;
let Container = styled.div`
  width: 350px;
  height: 412px;
  margin: 5px;
  border: 1px rgb(201, 195, 185) solid;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  &:hover ${Util} {
    opacity: 1;
  }
  padding-bottom: 40px;
`;
let Icon = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
let Info = styled.div`
  // z-index: 4;
`;
let Catagory = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;
let Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  heigth: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

let Rating = styled.div`
  position: absolute;
  bottom: 0;
  right: 20px;
  z-index: 3;
`;

let Price = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: rgb(129, 113, 69);
  bottom: 0;
  left: 20px;
`;
let ProInfo = styled.div`
  padding-left: 20px;
  background-color: rgb(245, 244, 241);
`;
let Rate = styled.div`
  padding-left: 5px;
  font-weight: 500;
`;
export default function AllProducts(props) {
  let { item } = props;
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [count, setCount] = useState(1);
  let info = useSelector((state) => {
    return state.cartData;
  });
  function proInfo(id) {
    navigate(`/product/${id}`);
  }

  function removeCart(data, params) {
    let x = data.Allproducts.filter((pro) => {
      return pro.id == params.id;
    });
    let cartCount = data.item.filter((pro) => {
      return pro.id == params.id;
    });

    let pay = {
      initialprice: params.price,
      count: cartCount[0].count,
      id: params.id,
    };
    console.log(count, cartCount[0].count);
    dispatch(remove(pay));
  }
  // useEffect(() => {
  //   // console.log(info, params.info);
  //   filterSingleProduct(info, params);

  //   // console.log(product);
  // }, [info]);

  function addToCart(data) {
    let cartData;
    if (
      data.category === "men's clothing" ||
      data.category === "women's clothing"
    ) {
      cartData = {
        description: data.description,
        image: data.image,
        initialprice: data.price,
        price: data.price,
        count: 1,
        size: data.size,
        id: data.id,
        title: data.title,
      };
    } else {
      cartData = {
        description: data.description,
        image: data.image,
        initialprice: data.price,
        price: data.price,
        count: 1,
        id: data.id,
        title: data.title,
      };
    }
    if (data.cartStatus === true) {
      removeCart(info, data);
    } else {
      dispatch(add(cartData));
    }

    console.log("add", cartData);
  }

  function addtoWishlist(data) {
    dispatch(setWishlist(data));
  }
  return (
    <div className="col-sm-6 col-md-4">
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <Image src={item.image} className="img " />
        </div>

        <ProInfo>
          <Catagory className=" d-flex justify-content-center align-items-center">
            {item.category}
          </Catagory>
          <Title>{item.title}</Title>
          <Price>${item.price}</Price>
        </ProInfo>
        <Rating>
          <div className=" d-flex justify-content-center align-items-center">
            <AiFillStar color={"rgb(255, 153, 0)"} />
            <Rate>{item.rating.rate}</Rate>
          </div>
        </Rating>

        <Util className="d-flex justify-content-center align-items-center">
          <Info className="d-flex justify-content-center align-items-center gap-2">
            <OverlayTrigger
              placement="bottom"
              // delay={{ show: 100, hide: 100 }}
              overlay={<Tooltip id="button-tooltip">Cart</Tooltip>}
            >
              <Icon className="d-flex justify-content-center align-items-center icon">
                <AiOutlineShoppingCart
                  color={item.cartStatus ? "red" : ""}
                  onClick={() => {
                    addToCart(item);
                  }}
                  size={30}
                />
              </Icon>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              // delay={{ show: 100, hide: 100 }}
              overlay={<Tooltip id="button-tooltip">Info</Tooltip>}
            >
              <Icon className="d-flex justify-content-center align-items-center icon">
                <AiOutlineSearch
                  size={30}
                  onClick={() => {
                    proInfo(item.id);
                  }}
                />
              </Icon>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              // delay={{ show: 100, hide: 100 }}
              overlay={<Tooltip id="button-tooltip">Wishlist</Tooltip>}
            >
              <Icon
                className="d-flex justify-content-center align-items-center icon"
                onClick={() => {
                  addtoWishlist(item);
                }}
              >
                <AiOutlineHeart
                  size={30}
                  color={item.wishStatus ? "red" : ""}
                />
              </Icon>
            </OverlayTrigger>
          </Info>
        </Util>
      </Container>
    </div>
  );
}
