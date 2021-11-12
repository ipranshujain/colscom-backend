import express from "express";
import mongoose from "mongoose";
import Blog from "../models/blog.js";
import auth from "../middleware/auth.js";

const app = express.Router();
app.route("/add-blog").post(auth, async (req, res) => {
  const { title, description, info, category, author } = req.body;
  const newBlog = new Blog({
    title,
    description,
    info,
    category,
    author,
    like: 0,
  });
  try {
    await newBlog.save();
    res.json({ success: true });
  } catch (error) {
    console.log("Following error occured: ", error);
    res.json({ sucess: false });
  }
  console.log("I get executed even after try and catch :P");
});
app.route("/all-blogs").get((req, res) => {
  Blog.find()
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((error) => {
      console.log("Error is: ", error);
    });
});
app.route("/update-blog/:_id").post(auth, (req, res) => {
  const { title, description, info, category, author } = req.body;
  Blog.findById(req.params._id).then((blog) => {
    blog.title = title;
    blog.description = description;
    blog.author = author;
    blog.category = category;
    blog.info = info;

    blog
      .save()
      .then(() => {
        res.json({ status: true, message: "Updated Successfully." });
      })
      .catch((error) => {
        console.log("Error ", error);
        res
          .status(400)
          .json({ status: false, message: "Can't Update due to some error." });
      });
  });
});
app.route("/:_id").get((req, res) => {
  Blog.findById(req.params._id)
    .then((blog) => {
      res.json(blog);
    })
    .catch((error) => {
      console.log("Error ", error);
      res.status(400).json({ status: "Error" });
    });
});

app.route("/:_id").delete(auth, (req, res) => {
  Blog.findByIdAndDelete(req.params._id)
    .then(() => {
      res.json({ status: true, message: "Successfully Deleted." });
    })
    .catch((error) => {
      console.log("Error ", error);
      res.json({
        status: false,
        message: "Some error occured while deleting.",
      });
    });
});
export default app;
