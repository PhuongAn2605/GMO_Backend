import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import { InputStyle } from "./Input.styles";
import { useHttpCLient } from "../../hooks/http-hook";

const InputForm = (props, ref) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  // const [nameValue, setNameValue] = useState("");
  // const [emailValue, setEmailValue] = useState("");
  // const [passwordValue, setPasswordValue] = useState("");
  // const [imagePath, setImagePath] = useState('');

  const changeHandler = (event) => {
    console.log(event.currentTarget.name);
    // currentUser[event.currentTarget.name] = event.currentTarget.value;
    setCurrentUser({
      ...currentUser,
      [event.currentTarget.name]: event.currentTarget.value,
    });

    console.log(currentUser);
  };

  return (
    <InputStyle>
      <FormControl variant="standard">
        <InputLabel htmlFor={props.id}>{props.name}</InputLabel>
        <Input
          id={props.id}
          type={props.type}
          name={props.id}
          inputRef={ref}
          style={props.style}
          onChange={props.onChange}
        />
      </FormControl>
    </InputStyle>
  );
};
const forwardedRef = React.forwardRef(InputForm);
export default forwardedRef;
