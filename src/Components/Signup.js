import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fs } from "../Config/Config";

export const Signup = () => {
  // to rediracted to login page
  const navigate = useNavigate();
  // signup state
  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  // error state
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  //  signup handler
  let handleSignup = (event) => {
    let { name, value } = event.target;

    setSignupInfo((prevValue) => {
      if (name === "fullname") {
        return {
          fullname: value,
          email: prevValue.email,
          password: prevValue.password,
        };
      } else if (name === "email") {
        return {
          fullname: prevValue.fullname,
          email: value,
          password: prevValue.password,
        };
      } else if (name === "password") {
        return {
          fullname: prevValue.fullname,
          email: prevValue.email,
          password: value,
        };
      }
    });
  };
  // handle user submit function
  let handleUserSubmit = (event) => {
    event.preventDefault();
    let { fullname, email, password } = signupInfo;
    // console.log(fullname, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullname,
            Email: email,
            Password: password,
          })
          .then(() => {
            setSuccessMsg(
              "Signup successfully. You will now automatically get redirected to Login page."
            );
            setSignupInfo({
              fullname: "",
              email: "",
              password: "",
            });
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Sign Up</h1>
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
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          required
          name="fullname"
          placeholder="Endter your full name"
          onChange={handleSignup}
          value={signupInfo.fullname}
        ></input>
        <br></br>
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          required
          name="email"
          placeholder="example@mail.com"
          onChange={handleSignup}
          value={signupInfo.email}
        ></input>
        <br></br>
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          required
          name="password"
          onChange={handleSignup}
          value={signupInfo.password}
        ></input>
        <br></br>
        <div className="btn-box">
          <span>
            Already have an account Login
            <Link to={"/login"} className="link">
              {" "}
              Here
            </Link>
          </span>
          <button type="submit" className="btn btn-success btn-md">
            SIGN UP
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
