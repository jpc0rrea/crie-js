import React from "react";

import "./styles.css";

const Input = ({ id, placeholder, ...rest }) => {
  const type = rest.type ? rest.type : "text";
  return (
    <div className="input-block">
      <input type={type} id={id} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default Input;
