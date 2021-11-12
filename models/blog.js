import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    category: {
      type: Array,
      required: true,
      trim: true,
      minlength: 1,
    },
    info: {
      type: String,
      trim: true,
      minLength: 1,
    },
    like: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Blogs = mongoose.model("Blogs", BlogSchema);
export default Blogs;
