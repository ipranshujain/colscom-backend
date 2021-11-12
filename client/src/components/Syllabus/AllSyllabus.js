import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { syllabusShape } from "../../utils/inputData";
import { deleteAction } from "../../utils/actionUtil";
export default function AllSyllabus() {
  const [syllabus, setSyllabus] = useState([]);
  const [direct, setDirect] = useState({});
  useEffect(() => {
    axios
      .get("/syllabus/all-syllabus")
      .then((data) => {
        setSyllabus(data.data);
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
      <div className="all-blogs-head">All Syllabus</div>
      <div className="all-blogs-list">
        {syllabus.map((syll, idx) => {
          return (
            <div className="all-element" key={idx}>
              <div className="all-syllabus-title">
                <div
                  style={{
                    textTransform: "capitalize",
                    alignSelf: "center",
                  }}
                >
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
                <div className="all-syllabus-side">
                  <div
                    onClick={() => {
                      setDirect({
                        pathname: `/update-blog/${syll._id}`,
                        state: {
                          data: syllabusShape,
                        },
                      });
                    }}
                  >
                    🖋 Edit
                  </div>
                  <div
                    onClick={() => {
                      deleteAction(
                        syllabusShape.title,
                        syll._id,
                        "/all-syllabus"
                      );
                    }}
                  >
                    🚮 Delete
                  </div>
                </div>
              </div>
              <div className="syllabus-link" style={{ fontSize: 17 }}>
                <a style={{color: "black"}} href={syll.link}>Pdf Link: {syll.link.substr(0, 120)}...</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
