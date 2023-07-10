import React, {useState} from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, value, onchangeValue, errorText } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onchangeValue}
      />
            <p style={{color: "red"}}>{errorText}</p>
    </div>
  );
};

export default CustomInput;
