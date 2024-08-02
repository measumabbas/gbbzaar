import React, { useEffect, useState } from "react";
import "./style.css";
import Flex from "../../Flex/Flex";
import { ChevronDown, ChevronUp } from "react-feather";
const GlobalDropDown = ({
  url,
  stateHandler,
  setStateHandler,
  options,
  label,
  isRequired,
  icon,
  defaultId,
  defaultName,
  background = "#f4f6f8",
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("Here")
    if (defaultId) {
      options.forEach((item) => {
        if (item.id === defaultId) {
          setStateHandler(item);
        }
      });
    }
    if (defaultName) {
      options.forEach((item) => {
        if (item.name === defaultName) {
          setStateHandler(item);
        }
      });
    }
  }, [defaultId, options, setStateHandler, defaultName]);
  return (
    <div className="global-dropdown">
      <h3>
        {label}
        {isRequired ? "*" : ""}
      </h3>
      <div
        className="global-drop-head"
        onClick={() => setOpen(!open)}
        style={{ background: background }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={15}>
            {icon ? <img src={icon} alt="user" /> : null}
            <p>{stateHandler ? stateHandler?.name : "Please Select"}</p>
          </Flex>
          {open ? (
            <ChevronUp color="#666666" />
          ) : (
            <ChevronDown color="#666666" />
          )}
        </Flex>
      </div>
      <div
        className="global-drop-dropdown"
        style={{ maxHeight: `${open ? "200px" : "0px"}` }}
      >
        {options &&
          options.map((option, index) => {
            return (
              <div key={index}>
                <h2
                  onClick={() => {
                    setSelectedItemIndex(index);
                    setStateHandler(option);
                    setOpen(false);
                  }}
                  style={{
                    color: `${
                      selectedItemIndex === index ? "#121E31" : "#000"
                    }`,
                  }}
                >
                  {option?.name}
                </h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GlobalDropDown;
