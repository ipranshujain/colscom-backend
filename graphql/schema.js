import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Select{
    label: String!,
    value: String!,
  }

  type Blog{
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
    blogs: [Blog]!,
    syllabus: [Syllabus]!,
    books: [Book]!,
    blog(id: ID!): Blog!,
    syllabusOne(id: ID!): Syllabus!
    book(id: ID!): Book!
  }
`);

export default schema;
