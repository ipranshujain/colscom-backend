import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Select{
    label: String!,
    value: String!,
  }

  type Blogs{
    _id: String!,
    title: String!,
    description: String!,
    category: [Select]!,
    info: String!,
    like: Int!,
    author: String!
  }
  
  type Syllabus{
    _id: String!,
    semester: Select!,
    branch: Select!,
    link: String!
  }

  type Book{
    _id: String!,
    name: String!,
    author: String!,
    purpose: String!,
    link: String!,
    semester: Select!,
    branch: Select!
  }

  type Query {
    blogs: [Blogs]!,
    syllabus: [Syllabus]!,
    books: [Book]!,
  }
`);

export default schema;
