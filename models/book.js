import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    purpose: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    semester: {
      type: Object,
      required: true,
      trim: true,
      minlength: 1,
    },
    branch: {
      type: Object,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("book", BookSchema);
export default Book;
