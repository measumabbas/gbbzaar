import React from "react";
import "./style.css";
const Tabs = ({ width = 690, options, activeOption, setActiveOption }) => {
  return (
    <div className="global-tabs-container" style={{ maxWidth: `${width}px` }}>
      {/* <div className="global-tabs-options"> */}
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`global-tabs-option ${
              option.toLowerCase() === activeOption.toLowerCase()
                ? "global-tabs-option-active"
                : ""
            }`}
            onClick={() => setActiveOption(option)}
          >
            <h3>{option}</h3>
          </div>
        );
      })}
      {/* </div> */}
    </div>
  );
};

export default Tabs;
