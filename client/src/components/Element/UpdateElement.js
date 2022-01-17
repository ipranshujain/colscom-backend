import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import "./Element.scss";
import { BiErrorCircle } from "react-icons/bi";
import { renderInput } from "../../utils/actionUtil";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
function transformData(unit, data) {
  console.log("In transform data function.");
  const result = _.cloneDeep(data);
  result.inputs.map((input, i) => {
    if (input.input === "content") {
      const ss = convertFromRaw(JSON.parse(unit[input.name]));
      input.value = EditorState.createWithContent(ss);
    } else {
      input.value = unit[input.name];
    }
    return input;
  });
  console.log("Outside transform data function.");
  return result;
}
export default function Element({
  match: {
    params: { _id },
  },
  location: {
    state: { data },
  },
}) {
  const [element, setElement] = useState({});
  let history = useHistory();
  useEffect(() => {
    axios
      .get(`/${data.title}/${_id}`)
      .then((result) => {
        console.log("URL is: ", `${data.title}/${_id}`);
        console.log("Resultant data is: ", result);
        setElement(transformData(result.data, data));
      })
      .catch((error) => {
        console.log("Error occured ", error);
      });
  }, []);
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
    console.log("Data is: ", postObj);
    try {
      const result = await axios.post(`${element["update"]}/${_id}`, postObj);
      if (result && result.data) {
        console.log("Data after posting is ", result.data);
        if (data.title[data.title.length - 1] === "s") {
          history.push(`/all-${data.title}`);
        } else {
          history.push(`/all-${data.title}s`);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      if (error?.response.data?.direct === "login") {
        history.push("/location");
      } else if (error?.response.data?.direct === "login") {
        history.push("/");
      }
      console.log("Following error occured while posting: ", error);
    }
  };
  if (_.isEmpty(element)) {
    return (
      <div
        style={{
          fontSize: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <div>Loading</div>
      </div>
    );
  }
  return (
    <div className="form-container">
      <div className="form-title"> {"Update " + element.title}</div>

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
