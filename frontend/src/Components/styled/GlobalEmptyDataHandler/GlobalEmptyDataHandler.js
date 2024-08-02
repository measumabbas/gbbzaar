import React from "react";
import "./style.css";
import { FileText } from 'react-feather'
const GlobalEmptyDataHandler = ({ label, position = "absolute" }) => {
  return (
    <div className="global-empty-data-handler" style={{ position: position }}>
      <FileText size={80} color="#22284F"/>
      <p>{label}</p>
    </div>
  );
};

export default GlobalEmptyDataHandler;
