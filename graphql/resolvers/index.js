import Blog from "../../models/blog.js";
import Syllabus from "../../models/syllabus.js";
import Book from "../../models/book.js";

const getAll = async (Model) => {
  return await Model.find();
};
const getItem = async (Model, id) => {
  return await Model.findById(id);
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

  blog: async function ({ id }, req) {
    return getItem(Blog, id);
  },

  syllabusOne: async function ({ id }, req) {
    return getItem(Syllabus, id);
  },

  book: async function ({ id }, req) {
    return getItem(Book, id);
  },
};

export default root;
