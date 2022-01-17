import "./App.scss";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import BackendHome from "./components/BackendHome.js";
import { blogShape, bookShape, syllabusShape } from "./utils/inputData";
import Element from "./components/Element/Element.js";
import UpdateElement from "./components/Element/UpdateElement.js";
import AllBlogs from "./components/Blog/AllBlogs";
import AllSyllabus from "./components/Syllabus/AllSyllabus";
import AllBooks from "./components/Book/AllBooks";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import AuthContext from "./context/AuthContext";

function App() {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    name: "",
  });

  useEffect(() => {
    axios
      .post("/auth/verify-token", {
        token: localStorage.getItem("userToken"),
      })
      .then((data) => {
        setUserData({
          isLoggedIn: true,
          name: localStorage.getItem("userName"),
        });
      })
      .catch((error) => {
        console.log("Error: ", error.response);
        setUserData(false);
      });
  }, []);
  return (
    <AuthContext.Provider value={userData}>
      <div className="App">
        {userData.isLoggedIn ? (
          <div className="log-as">Logged in as {userData.name}</div>
        ) : (
          ""
        )}
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <BackendHome />
          </Route>
          <Route path="/add-blog">
            <Element data={blogShape} type="add" />
          </Route>
          <Route path="/all-blogs">
            <AllBlogs />
          </Route>
          <Route path="/update-blog/:_id" component={UpdateElement} />

          <Route path="/add-syllabus">
            <Element data={syllabusShape} type="add" />
          </Route>
          <Route path="/all-syllabus">
            <AllSyllabus />
          </Route>
          <Route path="/update-syllabus/:_id" component={UpdateElement} />
          <Route path="/add-book">
            <Element data={bookShape} type="add" />
          </Route>
          <Route path="/all-books">
            <AllBooks />
          </Route>
          <Route path="/update-book/:_id" component={UpdateElement} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
