import React from "react";

const Flex = ({
  children,
  justify,
  align,
  gap,
  className,
  direction,
  handleClick,
}) => {
  const styles = {};
  styles.display = "flex";
  if (justify) {
    styles.justifyContent = justify;
  }
  if (align) {
    styles.alignItems = align;
  }
  if (gap) {
    styles.gap = `${gap}px`;
  }
  if (direction) {
    styles.flexDirection = direction;
  }
  if (handleClick) {
    return (
      <div style={styles} className={className} onClick={handleClick}>
        {children}
      </div>
    );
  }
  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};

export default Flex;
