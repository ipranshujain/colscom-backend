import axios from "axios";
import { useState } from "react";
import validator from "validator";
import { BiErrorCircle } from "react-icons/bi";
import "./auth.css";
export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: {
      error: "",
      value: "",
      type: "text",
    },
    email: {
      error: "",
      value: "",
      type: "email",
    },
    password: {
      error: "",
      value: "",
      type: "password",
    },
    adminEmail: {
      error: "",
      value: "",
      type: "email",
    },
    adminPassword: {
      error: "",
      value: "",
      type: "password",
    },
  });
  const [error, setError] = useState("");
  function validateLogin() {
    const result = registerData;
    let check = true;
    Object.keys(registerData).forEach((value, idx) => {
      if (
        registerData[value].type === "email" &&
        !validator.isEmail(registerData[value].value, {
          domain_specific_validation: true,
        })
      ) {
        result[value].error = "Enter valid email.";
        console.log("Inside email");
        check = false;
      } else if (
        registerData[value].type === "password" &&
        !validator.isLength(registerData[value].value, { min: 5, max: 25 })
      ) {
        result[value].error = "Enter valid Password.";
        check = false;
      } else if (
        registerData[value].type === "text" &&
        !validator.isLength(registerData[value].value, { min: 1, max: 50 })
      ) {
        result[value].error = "Enter valid text.";
        check = false;
      } else {
        result[value].error = "";
      }
    });

    setRegisterData({ ...result });
    if (!check) {
      return false;
    }
    return true;
  }

  function setValue(name, value) {
    const result = registerData;
    result[name].value = value;
    setRegisterData({ ...result });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validateLogin()) {
      return;
    }
    axios
      .post("/auth/register", {
        name: registerData.name.value,
        email: registerData.email.value,
        password: registerData.password.value,
        adminEmail: registerData.adminEmail.value,
        adminPassword: registerData.adminPassword.value,
      })
      .then((data) => {
        console.log("Registered successfully.");
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userName", data.data.name);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setError("Input Details are not valid.");
        console.log("Error occured while registering.");
      });
  }
  return (
    <div className="login">
      <div className="login-title">Register New Admin</div>
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
        <label for="name">Enter Name</label>
        <input
          type="text"
          value={registerData.name.value}
          id="name"
          name="name"
          onChange={(e) => {
            setValue("name", e.target.value);
          }}
        />
        {registerData.name.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{registerData.name.error}</div>
          </div>
        )}
        <label for="email">Enter Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={registerData.email.value}
          onChange={(e) => {
            setValue("email", e.target.value);
          }}
        />
        {registerData.email.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{registerData.email.error}</div>
          </div>
        )}
        <label for="password">Enter Password (5-25 letter)</label>

        <input
          type="password"
          minLength={5}
          value={registerData.password.value}
          id="password"
          name="password"
          onChange={(e) => {
            setValue("password", e.target.value);
          }}
        />
        {registerData.password.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{registerData.password.error}</div>
          </div>
        )}

        <label for="adminEmail">Enter authorized email</label>
        <input
          type="text"
          value={registerData.adminEmail.value}
          id="adminEmail"
          name="adminEmail"
          onChange={(e) => {
            setValue("adminEmail", e.target.value);
          }}
        />
        {registerData.adminEmail.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{registerData.adminEmail.error}</div>
          </div>
        )}

        <label for="adminPassword">Enter authorized password</label>
        <input
          type="password"
          minLength={5}
          value={registerData.adminPassword.value}
          id="adminPassword"
          name="adminPassword"
          onChange={(e) => {
            setValue("adminPassword", e.target.value);
          }}
        />
        {registerData.adminPassword.error && (
          <div className="input-error">
            <BiErrorCircle />
            <div>{registerData.adminPassword.error}</div>
          </div>
        )}

        <button>Register</button>
      </form>
    </div>
  );
}
