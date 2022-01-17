import bcrypt from "bcryptjs";
const ans = await bcrypt.hash("dfs", 10);
console.log(await bcrypt.compare("sdfs", ans));
console.log(ans);

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log("Apollo Server Started on :", url);
// });

// import { gql } from "apollo-server-express";
// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//   type Book {
//     title: String
//     author: String
//   }
//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };
// export { typeDefs, resolvers };

// import { ApolloServer } from "apollo-server-express";

// import { ApolloServer } from "apollo-server";

// import { typeDefs, resolvers } from "./schema.js";

// const fun = async () => {
//   await server.start();
//   server.applyMiddleware({ app });
//   console.log(server.graphqlPath);
// };
// fun();
