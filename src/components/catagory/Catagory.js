import React from "react";
import { categories } from "../../Data/Data";
import CatagoryItem from "./CatagoryItem";

export default function Catagory(props) {
  let { catagory } = props;
  return (
    <div className="row m-2 gx-1">
      {categories.map((item) => {
        return <CatagoryItem catagory={catagory} item={item} />;
      })}
    </div>
  );
}
