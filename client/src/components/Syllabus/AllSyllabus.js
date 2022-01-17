import { Redirect } from "react-router-dom";
import _ from "lodash";
import { syllabusShape } from "../../utils/inputData";
import { deleteAction } from "../../utils/actionUtil";
import { Loading } from "../Loading";
import { useElements } from "../../hooks/customHooks";
import "./Syllabus.scss";

export default function AllSyllabus() {
  const { items, direct, setDirect, history, counter, setCounter } =
    useElements({ url: "/syllabus/all-syllabus" });

  if (!_.isEmpty(direct)) {
    return <Redirect to={direct} />;
  }
  if (items === null) {
    return <Loading />;
  }
  if (items && items.length === 0) {
    return <Loading>No Data Found</Loading>;
  }
  return (
    <div className="all-elements" style={{ marginTop: 20 }}>
      <div className="all-blogs-head">All Syllabus</div>
      <div className="all-blogs-list">
        {items.map((syll, idx) => {
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
                        "/all-syllabus",
                        history,
                        counter,
                        setCounter
                      );
                    }}
                  >
                    🚮 Delete
                  </div>
                </div>
              </div>
              <div className="syllabus-link" style={{ fontSize: 17 }}>
                <a style={{ color: "black" }} href={syll.link}>
                  Pdf Link: {syll.link.substr(0, 120)}...
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
