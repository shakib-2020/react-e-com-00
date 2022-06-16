import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Config/Config";

export const Login = () => {
  // to rediracted to home page
  const navigate = useNavigate();
  // login state
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  // error state
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  // login info handler
  let loginInfoHandler = (event) => {
    const { name, value } = event.target;

    setLoginInfo((prevValue) => {
      if (name === "email") {
        return {
          email: value,
          password: prevValue.password,
        };
      } else if (name === "password") {
        return {
          email: prevValue.email,
          password: value,
        };
      }
    });
  };
  // handle user submit function
  let handleUserSubmit = (event) => {
    event.preventDefault();
    let { email, password } = loginInfo;
    // console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSuccessMsg(
          "Login Successfull. You will now automatically get rediracted to home."
        );
        setLoginInfo({
          email: "",
          password: "",
        });
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 3000);
      })
      .catch((error) => setErrorMsg(error.message));
  };
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Login</h1>
      <hr></hr>
      {successMsg && (
        <>
          <div className="success-msg">
            {successMsg} <br />
          </div>
        </>
      )}
      <form
        className="form-group"
        autoComplete="off"
        onSubmit={handleUserSubmit}
      >
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          required
          name="email"
          placeholder="Enter your email"
          value={loginInfo.email}
          onChange={loginInfoHandler}
        ></input>
        <br></br>
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          required
          name="password"
          value={loginInfo.password}
          onChange={loginInfoHandler}
        ></input>
        <br></br>
        <div className="btn-box">
          <span>
            Don't have an account SignUp
            <Link to="/signup" className="link">
              {" "}
              Here
            </Link>
          </span>
          <button type="submit" className="btn btn-success btn-md">
            LOGIN
          </button>
        </div>
      </form>
      {errorMsg && (
        <>
          <div className="error-msg">
            <br /> {errorMsg}
          </div>
        </>
      )}
    </div>
  );
};
