import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Select{
    label: String!,
    value: String!,
  }

  type Blogs{
    title: String!,
    description: String!,
    category: [Select]!,
    info: String!,
    like: Int!,
    author: String!
  }
  
  type Syllabus{
    semester: Select!,
    branch: Select!,
    link: String!
  }

  type Book{
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
