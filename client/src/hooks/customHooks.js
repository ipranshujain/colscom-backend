import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { Loading } from "../components/Loading";

export function useElements({ url }) {
  const [items, setItems] = useState(null);
  const [counter, setCounter] = useState(0);
  let history = useHistory();
  const [direct, setDirect] = useState({});
  useEffect(() => {
    axios
      .get(url)
      .then((data) => {
        setItems(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [counter]);

  return { items, setDirect, history, counter, setCounter, direct };
}
