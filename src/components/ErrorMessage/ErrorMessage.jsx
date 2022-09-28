import React from "react";

function ErrorMessage({ errorMessage, style }) {
  return (
    <span
      style={style}
    >
      {errorMessage}
    </span> 
  );
}

export default ErrorMessage;