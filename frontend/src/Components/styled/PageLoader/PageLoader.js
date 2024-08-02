import React from "react";
import "./style.css";
const PageLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:'50vh'
      }}
    >
      <span class="page-loader"></span>
    </div>
  );
};

export default PageLoader;
