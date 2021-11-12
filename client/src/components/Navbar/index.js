import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { BsFillSunFill } from "react-icons/bs";
import "./Navbar.css";
import AuthContext from "../../context/AuthContext";
const navbarItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blogs",
    href: "",
    items: [
      { name: "Add Blog", href: "/add-blog" },
      { name: "All Blogs", href: "/all-blogs" },
    ],
  },
  {
    name: "Syllabus",
    href: "",
    items: [
      { name: "Add Syllabus", href: "/add-syllabus" },
      { name: "All Syllabus", href: "/all-syllabus" },
    ],
  },
  {
    name: "Books",
    href: "",
    items: [
      { name: "Add Book", href: "/add-book" },
      { name: "All Books", href: "/all-books" },
    ],
  },
  {
    name: "Register",
    href: "/register",
  },
];
const themes = ["light", "colourful", "black"];
function changeTheme(idx) {
  for (let i = 0; i < themes.length; i++) {
    document.querySelector("body").classList.remove(themes[i]);
  }
  document.querySelector("body").classList.toggle(themes[idx % themes.length]);
}
export default function Navbar() {
  const [counter, setCounter] = useState(1);
  function toggleMenu() {
    document
      .querySelector(".navbar-items")
      .classList.toggle("navbar-items-show");
  }
  const { isLoggedIn } = useContext(AuthContext);
  changeTheme(counter);
  return (
    <div className="navbar">
      <div className="navbar-icon">
        <RiMenu3Line
          size={30}
          onClick={(e) => {
            toggleMenu();
          }}
        />
      </div>
      <div
        className="navbar-title"
        onClick={() => {
          document.location = "/";
        }}
      >
        colscom backend
      </div>
      <div className="navbar-items">
        {navbarItems.map((navbarItem, idx) => {
          return (
            <div key={idx} className="navbar-item">
              <Link
                className="navbar-item-head navbar-head"
                to={navbarItem.href}
                onClick={() => {
                  if (navbarItem.href) {
                    toggleMenu();
                  }
                }}
              >
                {navbarItem.name}
              </Link>

              {navbarItem.items && navbarItems.length && (
                <div className="navbar-item-list">
                  {navbarItem.items.map((item, jdx) => {
                    return (
                      <div
                        key={jdx}
                        className="navbar-item-list-item"
                        onClick={() => {
                          if (item.href) {
                            toggleMenu();
                          }
                        }}
                      >
                        <Link
                          className="navbar-item-head navbar-head-item"
                          to={item.href}
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {!isLoggedIn ? (
          <div className="navbar-item">
            <Link
              className="navbar-item-head navbar-head"
              to={"/login"}
              onClick={() => {
                toggleMenu();
              }}
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="navbar-item">
            <div
              className="navbar-item-head navbar-head"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                toggleMenu();
                localStorage.removeItem("userToken");
                window.location = "/";
              }}
            >
              Logout
            </div>
          </div>
        )}
        <div
          className="navbar-item change-theme-icon"
          onClick={() => {
            setCounter(counter + 1);
            changeTheme(counter + 1);
          }}
        >
          <BsFillSunFill size={25} />
        </div>
      </div>
    </div>
  );
}
