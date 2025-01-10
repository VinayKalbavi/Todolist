import React from "react";
import { buttonStyle } from "../Stylle/style";

const Button = ({ type, text, onClick, style, ...rest }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...buttonStyle,
        ...style,
      }}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;