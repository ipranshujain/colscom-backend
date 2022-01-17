import { Redirect } from "react-router-dom";
import _ from "lodash";
import { blogShape } from "../../utils/inputData";
import { deleteAction } from "../../utils/actionUtil";
import { useElements } from "../../hooks/customHooks";
import { Loading } from "../Loading";
import "./Blog.scss";
export default function AllBlogs() {
  const { items, direct, setDirect, history, counter, setCounter } =
    useElements({ url: "/blog/all-blogs" });
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
    <div className="all-blogs">
      <div className="all-blogs-head">All blogs</div>
      <div className="all-blogs-list">
        {items.map((blog, idx) => {
          return (
            <div className="all-element" key={idx}>
              <div className="all-blogs-title">
                <div style={{ fontSize: 30 }}>{blog.title}</div>
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
                      deleteAction(
                        blogShape.title,
                        blog._id,
                        "/all-blogs",
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
              <div className="all-blogs-info">{blog.info}</div>
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
