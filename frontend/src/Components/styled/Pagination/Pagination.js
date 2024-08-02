import React, { useState } from "react";
import Flex from "../../../components/styled/Flex/Flex";
import { conditionalRender } from "../../../utills/conditionalRender";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "react-feather";
import "./style.css";
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <Flex
      className="global-pagination-container"
      align="center"
      justify="flex-end"
      gap={15}
    >
      <NumOfPagesDrop
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="global-pagination-middle">
        <p>of {totalPages} Pages</p>
      </div>
      <Flex className="global-pagination-right" align="center" gap={10}>
        <button
          onClick={() => setCurrentPage(--currentPage)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="global-pagination-icon" size={30} />
        </button>
        <button onClick={() => setCurrentPage(++currentPage)} disabled={currentPage === totalPages}>
          <ChevronRight className="global-pagination-icon" size={30} />
        </button>
      </Flex>
    </Flex>
  );
};

function NumOfPagesDrop({ totalPages, currentPage, setCurrentPage }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="global-pagination-dropdown-outer">
      <div
        className="global-pagination-dropdown-head"
        onClick={() => setOpen(!open)}
      >
        <span>{currentPage}</span>
        {conditionalRender(
          open,
          <ChevronUp color="#969696" />,
          <ChevronDown color="#969696" />
        )}
      </div>
      {open && (
        <div className="global-pagination-dropdown-items">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <div
                key={page}
                value={page}
                className="global-pagination-dropdown-item"
                onClick={() => {
                  setCurrentPage(page);
                  setOpen(false);
                }}
              >
                {page}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
