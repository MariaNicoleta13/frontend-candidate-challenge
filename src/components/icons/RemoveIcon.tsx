import React from "react";

const RemoveIcon = ({ size = 32, color = "black" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
    >
      <line
        x1="4"
        y1="4"
        x2="28"
        y2="28"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="4"
        x2="4"
        y2="28"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export { RemoveIcon };
