import React, { useEffect, useState } from "react";
import "./style.css";
import Flex from "../../Flex/Flex";
import { ChevronDown, ChevronUp } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";
const BookDropDown = ({
  stateHandler,
  setStateHandler,
  label,
  isRequired,
  icon,
  background = "#f4f6f8",
}) => {
  const { user } = useSelector((state) => state.user);
  const { isPending, error, data } = useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/book/me",
        {
          id: user._id,
        }
      );
      return data.arts;
    },
  });

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [open, setOpen] = useState(false);
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
            <p>{isPending?"Loading...":stateHandler ? stateHandler?.title : "Please Select"}</p>
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
        {data &&
          data.map((option, index) => {
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
                  {option?.title}
                </h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookDropDown;
