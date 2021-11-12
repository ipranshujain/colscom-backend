import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { bookShape } from "../../utils/inputData";
import { deleteAction } from "../../utils/actionUtil";
export default function AllBooks() {
  const [book, setBook] = useState([]);
  const [direct, setDirect] = useState({});
  useEffect(() => {
    axios
      .get("/book/all-books")
      .then((data) => {
        setBook(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  if (!_.isEmpty(direct)) {
    return <Redirect to={direct} />;
  }
  return (
    <div className="all-blogs">
      <div className="all-blogs-head">All Books</div>
      <div className="all-blogs-list">
        {book.map((syll, idx) => {
          return (
            <div className="all-element" key={idx}>
              <div className="all-book-title">
                <div style={{ fontSize: 24 }}>{syll.name}</div>
                <div
                  style={{
                    marginLeft: "10px",
                    marginRight: "auto",
                    alignSelf: "center",
                  }}
                >
                  by {syll.author}{" "}
                </div>
                <div className="all-book-side">
                  <div
                    onClick={() => {
                      setDirect({
                        pathname: `/update-book/${syll._id}`,
                        state: {
                          data: bookShape,
                        },
                      });
                    }}
                  >
                    🖋 Edit
                  </div>
                  <div
                    onClick={() => {
                      deleteAction(bookShape.title, syll._id, "/all-books");
                    }}
                  >
                    🚮 Delete
                  </div>
                </div>
              </div>
              <div className="all-book-title">
                <div style={{ textTransform: "capitalize" }}>
                  {syll.semester.label} Semester,
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    marginRight: "auto",
                    alignSelf: "center",
                  }}
                >
                  {syll.branch.label}{" "}
                </div>
              </div>
              <div className="all-book-title">
                <div>Purpose: {syll.purpose}</div>
              </div>
              <div className="all-book-title">
                <div><a style={{color: "black"}} href={syll.link}>PDF link: {syll.link.substr(0, 120)}</a></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
