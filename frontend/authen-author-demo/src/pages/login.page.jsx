import React, { useState } from "react";
import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";
import { loginAction, setEmailAction } from "../redux/auth/auth.actions";
import { connect } from "react-redux";
import { login } from "../redux/auth/auth.utils";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const changeEmailInputHandler = (e) => {
    // console.log(e.currentTarget.value)
    setEmailValue(e.currentTarget.value);
  };
  const changePasswordInputHandler = (e) => {
    setPasswordValue(e.currentTarget.value);
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    try{
      const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      })
    });

    const data = await response.json();
    const { userId, token, email } = data;

    login(userId, token, email);
    navigate('/');
    }catch(err){
      console.log(err);
    }
  };

  return (
    <form onSubmit={loginSubmitHandler}>
      <InputForm
        id="email"
        name="Email"
        type="email"
        value={emailValue}
        onChange={(e) => changeEmailInputHandler(e)}
      />
      <InputForm
        id="password"
        name="Password"
        type="password"
        value={passwordValue}
        onChange={(e) => changePasswordInputHandler(e)}
      />

      <ButtonForm title="Login" type="submit" />
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  login: (userId, token, email) => dispatch(loginAction(userId, token, null, email)),
})

export default connect(null, mapDispatchToProps)(Login);
