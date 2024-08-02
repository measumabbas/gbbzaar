import React from "react";
import "./style.css";
import Flex from "../Flex/Flex";

// tone should be "success, error, info"
const Badge = ({ children, tone = "success" }) => {
  const className = {};
  if (tone === "success") {
    className.name = "badge-success";
  }
  if (tone === "error") {
    className.name = "badge-error";
  }
  if (tone === "info") {
    className.name = "badge-info";
  }
  if (tone === "no-show") {
    className.name = "badge-no-show";
  }
  return (
    <Flex
      align="center"
      justify="center"
      className={`global-badge ${className.name}`}
    >
      {children}
    </Flex>
  );
};

export default Badge;
