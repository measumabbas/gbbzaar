import React from "react";
import "./style.css";
const BtnLoader = ({ color }) => {
  return (
    <span
      class="btn-loader"
      style={{ border: `2px solid ${color}`, borderBottomColor: "transparent" }}
    ></span>
  );
};

export default BtnLoader;
