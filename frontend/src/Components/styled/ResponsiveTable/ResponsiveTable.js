import "./style.css";

export const PhoneTable = ({ children }) => {
  return <table className="global-responsive-table">{children}</table>;
};

export const PhoneTableHead = ({ children, onClick }) => {
  return (
    <thead className="global-responsive-table-head" onClick={onClick}>
      {children}
    </thead>
  );
};

export const PhoneTableRow = ({ children }) => {
  return <tr className="global-responsive-table-row">{children}</tr>;
};

export const PhoneTableBody = ({ children, className }) => {
  return (
    <tbody className={`global-responsive-table-body ${className}`}>
      {children}
    </tbody>
  );
};

export const PhoneTableHeadData = ({ children }) => {
  return <th className="global-responsive-table-head-data">{children}</th>;
};

export const PhoneTableBodyData = ({ children, isEmail = false }) => {
  return (
    <td
      className={`global-responsive-table-body-data ${
        isEmail ? "email-table-data" : ""
      }`}
    >
      {children}
    </td>
  );
};

export const PhoneTableBoldText = ({ children }) => {
  return <span className="global-responsive-table-bold-txt">{children}</span>;
};
export const PhoneTableSimpleText = ({ children }) => {
  return <span className="global-responsive-table-simple-txt">{children}</span>;
};
