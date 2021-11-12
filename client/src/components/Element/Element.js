import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./Element.css";
import { BiErrorCircle } from "react-icons/bi";
export default function Element({ data, type }) {
  const [element, setElement] = useState(data);
  if (type === undefined) {
    type = "update";
  }
  function handleChange(value, idx) {
    const result = element;
    result.inputs[idx].value = value;
    if (result.inputs[idx].required)
      result.inputs[idx].error = value.length !== 0 ? false : true;
    setElement({ ...result });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = element;
    let check = false;
    element.inputs.map((input, idx) => {
      if (input.required && input.value.length === 0) {
        input.error = true;
        check = true;
      } else {
        input.error = false;
      }
      return true;
    });
    if (check) {
      setElement({ ...result });
      return;
    }

    const postObj = element.inputs.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});
    postObj.token = localStorage.getItem("userToken");
    // console.log("User token is: ", localStorage.getItem("userToken"));
    try {
      const result = await axios.post(element[type.toLowerCase()], postObj);
      if (result && result.data) {
        console.log("Data after posting is ", result.data);
      }
      if (data.title[data.title.length - 1] === "s") {
        window.location = `/all-${data.title}`;
      } else {
        window.location = `/all-${data.title}s`;
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      if (error?.response.data?.direct === "login") {
        window.location = "/login";
      } else if (error?.response.data?.direct === "login") {
        window.location = "/";
      }
      // console.log("Following error occured while posting: ", error);
    }
  };
  return (
    <div className="form-container">
      <div className="form-title"> {type + " " + element.title}</div>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {element.inputs.map((input, idx) => {
          return (
            <div className="inp" key={idx}>
              <label>
                {input.label + " " + (input.required ? "(*)" : "(optional)")}
              </label>
              {input.input === "input" ? (
                <input
                  type={input.type}
                  value={input.value}
                  placeholder={input.placeholder}
                  onChange={(e) => {
                    handleChange(e.target.value, idx);
                  }}
                />
              ) : input.input === "textarea" ? (
                <textarea
                  type={input.type}
                  value={input.value}
                  placeholder={input.placeholder}
                  maxLength={input.maxLength}
                  rows={input.rows}
                  onChange={(e) => {
                    handleChange(e.target.value, idx);
                  }}
                />
              ) : (
                <div className="select-category">
                  <Select
                    options={input.options}
                    type={input.type}
                    value={input.value}
                    isMulti={input.isMulti}
                    onChange={(e) => {
                      handleChange(e, idx);
                    }}
                  />
                </div>
              )}
              {input.error && (
                <div className="input-error">
                  <BiErrorCircle />
                  <div>{input.name} is required</div>
                </div>
              )}
            </div>
          );
        })}
        <button>Done</button>
      </form>
    </div>
  );
}
