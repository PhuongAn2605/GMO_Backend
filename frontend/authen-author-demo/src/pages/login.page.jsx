import React, { useState } from "react";
import styled from "styled-components";
import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";



const Login = () => {

  const [isFormValid, setIsFormValid ] = useState(false);
  
  return (
    <form>
        <InputForm id="email" name="Email" type="email" />
        <InputForm id="password" name="Password" type="password" />

        <ButtonForm title="Login" type="submit" />
    </form>
  );
};

export default Login;
