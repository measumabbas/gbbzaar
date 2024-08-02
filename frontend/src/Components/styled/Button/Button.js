import React from "react";
import "./style.css";
import { conditionalRender } from "../../../utills/conditionalRender";
import BtnLoader from "../BtnLoader/BtnLoader";

// variant should be one of "primary , outline, rounded-primary, rounded-outline outline-sm"
const Button = ({
  variant = "primary",
  type = "button",
  label,
  loading,
  loaderColor,
  handleClick
}) => {
  if(handleClick){
    return (
      <button className={`global-btn ${variant}`} type='button' onClick={handleClick}>
        {conditionalRender(loading, <BtnLoader color={loaderColor} />, label)}
      </button>
    );
  }
  return (
    <button className={`global-btn ${variant}`} type={type}>
      {conditionalRender(loading, <BtnLoader color={loaderColor} />, label)}
    </button>
  );
};

export default Button;
