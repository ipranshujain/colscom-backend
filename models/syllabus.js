import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SyllabusSchema = new Schema(
  {
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
    link: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
  },
  {
    timestamps: true,
  }
);
const Syllabus = mongoose.model("syllabus", SyllabusSchema);
export default Syllabus;
