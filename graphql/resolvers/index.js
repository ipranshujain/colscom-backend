import Blog from "../../models/blog.js";
import Syllabus from "../../models/syllabus.js";
import Book from "../../models/book.js";

const getAll = async (Model) => {
  return await Model.find();
};

const root = {
  blogs: async () => {
    return getAll(Blog);
  },
  syllabus: async () => {
    return getAll(Syllabus);
  },
  books: async () => {
    return getAll(Book);
  },
};

export default root;
