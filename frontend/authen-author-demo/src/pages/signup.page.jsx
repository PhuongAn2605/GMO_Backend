import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputForm from "../components/input/Input.component";
import ButtonForm from "../components/button/Button.comonent";
import { useHttpCLient } from "../hooks/http-hook";

const SignUp = ({ token, onChange }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpCLient();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const imageRef = useRef(null);

  // const [nameValue, setNameValue] = useState("");
  // const [emailValue, setEmailValue] = useState("");
  // const [passwordValue, setPasswordValue] = useState("");
  // const [imagePath, setImagePath] = useState('');

  const signupHandler = async (event) => {
    // console.log(nameRef.current.value)
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);
      formData.append("image", imageRef.current.value);

      // console.log(...formData);

      await sendRequest("http://localhost:3001/api/signup", "POST", formData, {
        Authorization: "Bear" + token,
      });
      navigate("/");
    } catch (err) {}
  };


  return (
    <form className="sign-up" onSubmit={signupHandler} encType="multipart/form-data">
      <InputForm
        id="name"
        name="Name"
        type="text"
        ref={nameRef}
        onChange={e => nameRef.current.value = e.currentTarget.value}
      />
      <InputForm
        id="email"
        name="Email"
        type="email"
        ref={emailRef}
        onChange={e => emailRef.current.value = e.currentTarget.value}

      />
      <InputForm
        id="password"
        name="Password"
        type="password"
        ref={passwordRef}
        onChange={e => passwordRef.current.value = e.currentTarget.value}

      />

      <InputForm
        id="image"
        name="Avatar"
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={imageRef}
        // onChange={e => imageRef.current.value = e.currentTarget.value}
      />

      <ButtonForm title="Sign Up" type="submit" />
    </form>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(SignUp);
