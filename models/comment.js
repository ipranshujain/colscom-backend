import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    blogId: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
    },
    innerComment: {
      type: Boolean,
      required: true,
    },
    // parent Comment Id, if not have parent; then set to -1
    commentId: {
      type: String,
      trim: true,
      required: true,
    },
    like: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Comments = mongoose.model("Comments", CommentSchema);
export default Comments;
