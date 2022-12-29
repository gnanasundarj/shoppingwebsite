import React from "react";
import styled from "styled-components";
import "./slider.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { sliderItems } from "../../Data/Data";
import { useState } from "react";


const Sliding = styled.div`
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideValue * -100}vw);
`;

export default function Slider(props) {
  let { scrollFunction } = props;
  let [slideValue, setSlidevalue] = useState(0);
  function handleSlider(direction) {
    if (direction === "left") {
      setSlidevalue(slideValue > 0 ? slideValue - 1 : 2);
    } else {
      setSlidevalue(slideValue < 2 ? slideValue + 1 : 0);
    }
  }
  
  return (
    <div className="slider-component">
      {sliderItems.map((data) => {
        return (
          <Sliding slideValue={slideValue}>
            <div
              className="slider-container"
              style={{ backgroundColor: `${data.bg}` }}
            >
              <div className="slider-content row">
                <div className="slider-img col-sm-6 d-flex justify-content-center align-items-center">
                  <img style={{ height: "80%" }} src={data.img} alt="img" />
                </div>
                <div className="col-sm-6  d-flex justify-content-center align-items-start">
                  <div style={{ marginTop: "100px" }}>
                    <p style={{ fontSize: "90px", marginBottom: "30px" }}>
                      {data.title}
                    </p>
                    <h4 style={{ marginBottom: "30px" }}>{data.desc}</h4>
                    <div
                      onClick={() => {
                        scrollFunction();
                      }}
                      className="slider-button d-flex justify-content-center align-items-center"
                    >
                      SHOP NOW
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Sliding>
        );
      })}

      <div
        style={{ left: "20px" }}
        className="slider-arrow d-flex justify-content-center align-items-center"
      >
        <div
          style={{ opacity: "0.6" }}
          onClick={() => {
            handleSlider("left");
          }}
        >
          <AiFillCaretLeft />
        </div>
      </div>

      <div
        style={{ right: "20px" }}
        className="slider-arrow d-flex justify-content-center align-items-center"
      >
        <div
          style={{ opacity: "0.6" }}
          onClick={() => {
            handleSlider("right");
          }}
        >
          <AiFillCaretRight />
        </div>
      </div>
    </div>
  );
}
