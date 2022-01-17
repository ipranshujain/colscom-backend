import axios from "axios";
import { EditorState } from "draft-js";
import Select from "react-select";
import { Content } from "../components/Content";
export function deleteAction(title, id, url, history, counter, setCounter) {
  axios
    .delete(`/${title}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("userToken")}` },
    })
    .then((data) => {
      history.push(url);
      setCounter(counter + 1);
    })
    .catch((error) => {
      console.log(error?.response?.data?.message);
      if (error?.response.data?.direct === "login") {
        history.push("/login");
      } else if (error?.response.data?.direct === "login") {
        history.push("/");
      }
      console.log("Error ", error);
    });
}

export function renderInput(input, idx, handleChange) {
  if (input.input === "input") {
    return (
      <input
        type={input.type}
        value={input.value}
        placeholder={input.placeholder}
        onChange={(e) => {
          handleChange(e.target.value, idx);
        }}
      />
    );
  }

  if (input.input === "textarea") {
    return (
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
    );
  }
  if (input.input === "select") {
    return (
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
    );
  }

  if (input.input === "content") {
    console.log("Input value is: ", input.value);
    return (
      <Content
        editorState={input.value ? input.value : EditorState.createEmpty()}
        setEditorState={(e) => {
          handleChange(e, idx);
        }}
      />
    );
  }
  return <div></div>;
}
