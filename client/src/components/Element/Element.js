import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Element.scss";
import { BiErrorCircle } from "react-icons/bi";
import { renderInput } from "../../utils/actionUtil";
import { convertToRaw } from "draft-js";
export default function Element({ data, type }) {
  const [element, setElement] = useState(data);
  const history = useHistory();
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
      if (curr.input === "content") {
        // console.log(curr.value);
        acc[curr.name] = JSON.stringify(
          convertToRaw(curr.value.getCurrentContent())
        );
      } else {
        acc[curr.name] = curr.value;
      }
      return acc;
    }, {});
    postObj.token = localStorage.getItem("userToken");
    try {
      const result = await axios.post(element[type.toLowerCase()], postObj);
      if (result && result.data) {
        console.log("Data after posting is ", result.data);
      }
      if (data.title[data.title.length - 1] === "s") {
        history.push(`/all-${data.title}`);
      } else {
        history.push(`/all-${data.title}s`);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      if (error?.response.data?.direct === "login") {
        history.push("/location");
      } else if (error?.response.data?.direct === "login") {
        history.push("/");
      }
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
              {renderInput(input, idx, handleChange)}
              {input.error && (
                <div className="input-error">
                  <BiErrorCircle />
                  <div>{input.name} is required</div>
                </div>
              )}
            </div>
          );
        })}
        <button className="form-done">Done</button>
      </form>
    </div>
  );
}
