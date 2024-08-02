import React from "react";
import "./style.css";
import { AlertTriangle } from "react-feather";
const GlobalErrorHandler = ({ label }) => {
  return (
    <div className="global-empty-data-handler">
      <AlertTriangle size={80} color="#22284F"/>
      <p>{label}</p>
    </div>
  );
};

export default GlobalErrorHandler;
