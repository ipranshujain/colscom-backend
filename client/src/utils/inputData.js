const categoryOptions = [
  { value: "1", label: "Web Development" },
  { value: "2", label: "Programming Languages" },
  { value: "3", label: "Android Development" },
  { value: "4", label: "ReactJS" },
  { value: "5", label: "JavaScript" },
  { value: "6", label: "C++" },
  { value: "7", label: "Java" },
  { value: "8", label: "Python" },
  { value: "9", label: "Data Science" },
  { value: "10", label: "Machine Learning" },
  { value: "11", label: "Artificial Learning" },
  { value: "12", label: "C++" },
  { value: "13", label: "Others" },
];
const blogShape = {
  title: "blog",
  update: "/blog/update-blog",
  add: "/blog/add-blog",
  inputs: [
    {
      input: "input",
      label: "Enter Title",
      placeholder: "eg. Intro to C++ Programming",
      name: "title",
      required: true,
      maxLength: 100,
      value: "",
      type: "text",
      error: false,
    },
    {
      input: "textarea",
      label: "Enter Title Info",
      placeholder:
        "eg. Learn one the foundational language to solve complex problems and ace in your career by reading this blog.",
      name: "info",
      required: false,
      maxLength: 200,
      rows: 3,
      value: "",
      type: "text",
      error: false,
    },
    {
      input: "textarea",
      label: "Enter Content",
      placeholder:
        "eg. In this blog post we will learn some basic Introduction to C++ and its features. C++ is an OOP's Programming Language and it is mainly used in creating high performance applications, operating system and games. Apart from that C++ language is used as a pillar by other languages including but not limited to JavaScript, Python etc. ",
      name: "description",
      required: true,
      rows: 10,
      value: "",
      type: "text",
      error: false,
    },
    {
      input: "select",
      label: "Enter Category",
      placeholder: "eg. Web Development",
      name: "category",
      required: true,
      isMulti: true,
      value: [],
      options: categoryOptions,
      error: false,
    },
    {
      input: "input",
      label: "Enter Author Name",
      placeholder: "eg. Rabindranath Tagore",
      name: "author",
      required: true,
      value: "",
      error: false,
    },
  ],
};

const branches = [
  "Computer Science Engineering (CSE)",
  "Mechanical Engineering (ME)",
  "Electronics and Communication Engineering (ECE)",
  "Civil Engineering (CE)",
];
const semesters = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
];
const generateLabelArray = (array) => {
  return array.reduce((acc, curr, i) => {
    acc.push({ value: i, label: curr });
    return acc;
  }, []);
};

const syllabusShape = {
  title: "syllabus",
  update: "/syllabus/update-syllabus",
  add: "/syllabus/add-syllabus",
  inputs: [
    {
      input: "select",
      label: "Enter Branch",
      placeholder: "eg. CSE",
      name: "branch",
      required: true,
      isMulti: false,
      value: {},
      options: generateLabelArray(branches),
      error: false,
    },
    {
      input: "select",
      label: "Enter Semester",
      placeholder: "eg. 8th",
      name: "semester",
      required: true,
      isMulti: false,
      value: {},
      options: generateLabelArray(semesters),
      error: false,
    },
    {
      input: "input",
      label: "Enter Syllabus PDF link: ",
      placeholder: "eg. https://drive.google.com/12345678/xxxx.pdf",
      name: "link",
      required: true,
      value: "",
      error: false,
      type: "text",
    },
  ],
};
const bookShape = {
  title: "book",
  update: "/book/update-book",
  add: "/book/add-book",
  inputs: [
    {
      input: "input",
      label: "Enter Book Name",
      placeholder: "eg. Introduction to Algorithms",
      name: "name",
      required: true,
      value: "",
      error: false,
    },
    {
      input: "input",
      label: "Enter Author",
      placeholder: "eg. Corman",
      name: "author",
      required: true,
      value: "",
      error: false,
    },
    {
      input: "input",
      label: "Enter Book PDF link: ",
      placeholder: "eg. https://drive.google.com/12345678/xxxx.pdf",
      name: "link",
      required: true,
      value: "",
      error: false,
      type: "text",
    },
    {
      input: "input",
      label: "Enter Purpose",
      placeholder:
        "eg. book for learning algorithms or used in DSA or ADA subject",
      name: "purpose",
      required: true,
      value: "",
      error: false,
    },
    {
      input: "select",
      label: "Enter Semester",
      placeholder: "eg. 8th",
      name: "semester",
      required: true,
      isMulti: false,
      value: {},
      options: generateLabelArray(semesters),
      error: false,
    },
    {
      input: "select",
      label: "Enter Branch",
      placeholder: "eg. CSE",
      name: "branch",
      required: true,
      isMulti: false,
      value: {},
      options: generateLabelArray(branches),
      error: false,
    },
  ],
};
export { blogShape, syllabusShape, bookShape };
