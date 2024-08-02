import "./style.css";

export function Table({ children, id }) {
  return (
    <table className="global-table" id={id}>
      {children}
    </table>
  );
}

export function TableHead({ children }) {
  return <thead className="global-table-head">{children}</thead>;
}
export function TableHeadData({ children }) {
  return <th className="global-table-head-data">{children}</th>;
}
export function TableRow({ children, index, isHead }) {
  if (isHead) {
    return <tr className="global-table-row">{children}</tr>;
  }
  return (
    <tr
      className="global-table-row"
      style={{ background: `${index % 2 === 0 ? "#fff" : "#F1F2F2"}` }}
    >
      {children}
    </tr>
  );
}
export function TableBody({ children, className }) {
  return <tbody className={`global-table-bod ${className}`}>{children}</tbody>;
}
export function TableBodyData({ children,className }) {
  return <td className={`global-table-body-data ${className}`}>{children}</td>;
}

export function TableText({ children, variant = "simple" }) {
  return (
    <span
      className={`table-simple-text ${
        variant === "simple" ? "table-simple-text" : "table-link-text"
      }`}
    >
      {children}
    </span>
  );
}
