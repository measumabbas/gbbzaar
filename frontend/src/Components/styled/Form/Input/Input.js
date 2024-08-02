import React from "react";
import { emailPattern, passwordPattern } from "../../../../utills/Schems";
import Flex from "../../../styled/Flex/Flex";
import "./style.css";
const Input = ({
  label,
  register,
  placeholder,
  name,
  isRequired,
  icon,
  htmlFor,
  error,
  type,
  className,
  validationValue,
  errorMessage,
}) => {
  let validationObj = {};
  validationObj.required = isRequired ? errorMessage : false;
  if (type === "email") {
    validationObj.pattern = emailPattern;
  }
  if (type === "password" && !validationValue) {
    console.log(validationValue)
    console.log('here')
    validationObj.pattern = passwordPattern;
  }
  if (validationValue) {
    validationObj.validate = (value) => {
      return value === validationValue || "Passwords doesn't match";
    };
  }
//   console.log(error);
  if (icon) {
    return (
      <Flex
        className={`global-input-container ${className}`}
        direction="column"
        gap={10}
      >
        <label htmlFor={htmlFor}>
          {label}
          {isRequired ? "*" : ""}
        </label>
        <div className="global-input-container-input global-input-container-input-with-image">
          <input
            type={type}
            placeholder={placeholder}
            {...register(name, validationObj)}
            id={htmlFor}
          />
          <img src={icon} alt="icon" />
        </div>
        {error && <p className="global-input-error">{error.message}</p>}
      </Flex>
    );
  }
  return (
    <Flex className="global-input-container" direction="column">
      <label htmlFor={htmlFor}>
        {label}
        {isRequired ? "*" : ""}
      </label>
      <div className="global-input-container-input global-without-image-input">
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, { required: isRequired })}
        />
      </div>
      {error && <p className="global-input-error">{error}</p>}
    </Flex>
  );
};

export default Input;
