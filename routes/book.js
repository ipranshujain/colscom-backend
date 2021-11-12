import express from "express";
import mongoose from "mongoose";
import Book from "../models/book.js";
import auth from "../middleware/auth.js";

const app = express.Router();

app.route("/add-book").post(auth, async (req, res) => {
  const { name, author, purpose, link, branch, semester } = req.body;
  const newBook = new Book({
    name,
    author,
    purpose,
    link,
    branch,
    semester,
  });
  try {
    await newBook.save();
    res.json({ success: true });
  } catch (error) {
    console.log("Following error occured: ", error);
    res.json({ sucess: false });
  }
  console.log("I get executed even after try and catch :P");
});
app.route("/all-books").get((req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.log("Error is: ", error);
    });
});
app.route("/update-book/:_id").post(auth, (req, res) => {
  const { name, author, purpose, link, branch, semester } = req.body;
  Book.findById(req.params._id).then((book) => {
    book.name = name;
    book.author = author;
    book.purpose = purpose;
    book.link = link;
    book.semester = semester;
    book.branch = branch;
    book
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
  Book.findById(req.params._id)
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      console.log("Error ", error);
      res.status(400).json({ status: "Error" });
    });
});

app.route("/:_id").delete(auth, (req, res) => {
  Book.findByIdAndDelete(req.params._id)
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
