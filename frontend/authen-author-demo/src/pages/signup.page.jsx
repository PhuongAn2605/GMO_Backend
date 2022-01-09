import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";
import { useHttpCLient } from "../hooks/http-hook";
import ImageUpload from "../components/input/ImageUpload";
import { loginAction, setAvatar, setEmailAction } from "../redux/auth/auth.actions";

const SignUp = ({ token, onChange, avatar, login }) => {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // const imageRef = useRef(null);

  const signupHandler = async (event) => {
    event.preventDefault();
    // console.log(imageRef.current.value)
    // alert()
    try {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);
      // formData.append("image", avatar);

      // console.log(...formData);
      // console.log('end...')

      // const response = await sendRequest("http://localhost:5000/api/signup", "POST", formData, {
      //   Authorization: "Bearer" + token,
      // });

      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        body: formData,
      });

      //response.json returns a promise
      const data = await response.json();
      const { userId, token, email } = data; 

      login(userId, token, email);

      navigate("/");
    } catch (err) {}
  };

  return (
    <form
      className="sign-up"
      onSubmit={signupHandler}
      encType="multipart/form-data"
    >
      <InputForm
        id="name"
        name="Name"
        type="text"
        ref={nameRef}
        onChange={(e) => (nameRef.current.value = e.currentTarget.value)}
      />
      <InputForm
        id="email"
        name="Email"
        type="email"
        ref={emailRef}
        onChange={(e) => (emailRef.current.value = e.currentTarget.value)}
      />
      <InputForm
        id="password"
        name="Password"
        type="password"
        ref={passwordRef}
        onChange={(e) => (passwordRef.current.value = e.currentTarget.value)}
      />

      {/* <ImageUpload 
        id="image"
        center="center"
      /> */}

      {/* <InputForm
        id="image"
        name="Avatar"
        type="file"
        // accept=".jpg,.png,.jpeg"
        ref={imageRef}
        // onChange={e => console.log(e.currentTarget)}

      /> */}

      <ButtonForm title="Sign Up" type="submit" />
    </form>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  avatar: state.auth.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userId, token, email) => dispatch(loginAction(userId, token, null, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
