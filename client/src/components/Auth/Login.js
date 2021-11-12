import axios from "axios";
import { useState } from "react";
import validator from "validator";
import { BiErrorCircle } from "react-icons/bi";
import "./auth.css";
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: {
      error: "",
      value: "",
    },

    password: {
      error: "",
      value: "",
    },
  });
  const [error, setError] = useState("");
  function validateLogin() {
    const result = loginData;
    let check = true;
    if (
      !validator.isEmail(loginData.email.value, {
        domain_specific_validation: true,
      })
    ) {
      result.email.error = "Enter valid email.";
      check = false;
    } else {
      result.email.error = "";
    }
    if (!validator.isLength(loginData.password.value, { min: 5, max: 25 })) {
      result.password.error = "Password is not valid.";
      check = false;
    } else {
      result.email.password = "";
    }
    setLoginData({ ...result });
    if (!check) {
      return false;
    }
    return true;
  }

  function setValue(name, value) {
    const result = loginData;
    result[name].value = value;
    setLoginData({ ...result });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validateLogin()) {
      return;
    }
    axios
      .post("/auth/login", {
        email: loginData.email.value,
        password: loginData.password.value,
      })
      .then((data) => {
        console.log("Logged in successfully.");
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userName", data.data.name);
        window.location = "/";
      })
      .catch((error) => {
        setError("Input Details are not valid.");
        console.log("Error occured while logging.");
      });
  }
  return (
    <div className="login">
      <div className="login-title">Login</div>
      <div
        className="error-title input-error"
        style={{
          alignSelf: "center",
          textAlign: "center",
          padding: 5,
          paddingLeft: 10,
          fontSize: 17,
        }}
      >
        {error}
      </div>
      <form
        className="login-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label for="email">Enter Email</label>
        <input
          placeholder="eg. learn@gmail.com"
          type="text"
          name="email"
          id="email"
          value={loginData.email.value}
          onChange={(e) => {
            setValue("email", e.target.value);
          }}
        />
        {loginData.email.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{loginData.email.error}</div>
          </div>
        )}
        <label for="password">Enter Password (5-25 letter)</label>

        <input
          type="password"
          minLength={5}
          value={loginData.password.value}
          id="password"
          name="password"
          onChange={(e) => {
            setValue("password", e.target.value);
          }}
        />
        {loginData.password.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{loginData.password.error}</div>
          </div>
        )}
        <button>Login</button>
      </form>
    </div>
  );
}
