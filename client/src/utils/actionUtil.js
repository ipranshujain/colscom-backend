import axios from "axios";
export function deleteAction(title, id, url) {
  axios
    .delete(`/${title}/${id}`, {
      headers: { Authorization: `${localStorage.getItem("userToken")}` },
    })
    .then((data) => {
      window.location = url;
    })
    .catch((error) => {
      console.log(error?.response?.data?.message);
      if (error?.response.data?.direct === "login") {
        window.location = "/login";
      } else if (error?.response.data?.direct === "login") {
        window.location = "/";
      }
      console.log("Error ", error);
    });
}
