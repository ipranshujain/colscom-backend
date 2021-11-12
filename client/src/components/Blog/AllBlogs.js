import axios from "axios";
import { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { blogShape } from "../../utils/inputData";
import { deleteAction } from "../../utils/actionUtil";
export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [direct, setDirect] = useState({});
  useEffect(() => {
    axios
      .get("/blog/all-blogs")
      .then((data) => {
        setBlogs(data.data);
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
      <div className="all-blogs-head">All blogs</div>
      <div className="all-blogs-list">
        {blogs.map((blog, idx) => {
          return (
            <div className="all-element" key={idx}>
              <div className="all-blogs-title" >
                <div style={{fontSize: 30,}}>{blog.title}</div>
                <div className="all-blogs-side">
                  <div>{blog.like} likes</div>
                  <div>By {blog.author}</div>
                  <div
                    onClick={() => {
                      setDirect({
                        pathname: `/update-blog/${blog._id}`,
                        state: {
                          data: blogShape,
                        },
                      });
                    }}
                  >
                    🖋 Edit
                  </div>
                  <div
                    onClick={() => {
                      deleteAction(blogShape.title, blog._id, "/all-blogs");
                    }}
                  >
                    🚮 Delete
                  </div>
                </div>
              </div>
              <div className="all-blogs-info">{blog.info}</div>
              <div className="all-blogs-description" style={{fontWeight : "bold"}}>
                {blog.description.substr(0, 300)} ......
              </div>
              <div className="all-blogs-category">
                {blog.category.map((c, i) => {
                  return (
                    <div className="category-c" key={i}>
                      {c.label}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
