import React from "react";
import styled from "styled-components";
import "../components/header/header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setModel } from "../Store/Model";

let SearchContainer = styled.div`
  width: 500px;
  height: 300px;
  position: absolute;
  top: 58.8px;
  left: 63.7px;
  background-color: white;

  z-index: ${(props) => (props.searchInput === "" ? -1000 : 10)};
  overflow-x: hidden;
  overflow-y: auto;
`;

let Container = styled.div`
  position: relative;
`;
let Lan = styled.div`
  // font-size: 20px;
  // font-weight: 500;
`;
let Input = styled.input`
  height: 30px;
  width: 300px;
`;

let Searcbutton = styled.div`
  margin-left: 10px;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;
let SearchResult = styled.div`
  cursor: pointer;
  width: 100%;
  height: 60px;
  &:hover {
    background-color: lightblue;
  }
`;
let Image = styled.img`
  width: 50px;
  height: 50px;
`;
let Desc = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function SearchMenu() {
  let dispatch = useDispatch();
  let [filterData, setFilterData] = useState([]);
  let allProductData = useSelector((state) => state.cartData.Allproducts);
  let searchInput = useSelector((state) => state.modelData.value);
  let navigate = useNavigate();

  function handleInput(e) {
    dispatch(setModel(e.target.value));
    let filterProData = allProductData.filter((data) => {
      if (
        data.category.toLowerCase().includes(searchInput) ||
        data.description.toLowerCase().includes(searchInput)
      ) {
        return data;
      }
    });

    setFilterData(filterProData);
  }
  function handleSelect(data) {
    navigate(`/product/${data.id}`);
  }

  return (
    <Container className="col  d-flex  align-items-center ">
      <Lan style={{ marginRight: "20px" }}>ENG</Lan>
      <Input
        id="input"
        autoComplete="off"
        type="text"
        onChange={handleInput}
        value={searchInput}
        style={{ borderRadius: "5px", border: "none" }}
      />
      <Searcbutton className="d-flex  align-items-center ">
        <AiOutlineSearch size={30} />
      </Searcbutton>
      <SearchContainer className="scroll" searchInput={searchInput}>
        {searchInput !== "" &&
          filterData.map((data) => {
            return (
              <SearchResult
                className=" align-items-center"
                onClick={() => {
                  handleSelect(data);
                }}
              >
                <div className="row ">
                  <div className="col-sm-2 d-flex justify-content-center align-items-center mt-1">
                    <Image src={data.image} />
                  </div>
                  <Desc className="col d-flex  align-items-center">
                    {data.title}
                  </Desc>
                </div>
              </SearchResult>
            );
          })}
      </SearchContainer>
    </Container>
  );
}
