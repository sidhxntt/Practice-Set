import BooktypeDefs from "/Users/siddhantgupta/Desktop/SID/Practice-Set/GraphQL and Prisma/GraphQL/Schemas/Books.js";
import AuthorTypeDefs from "/Users/siddhantgupta/Desktop/SID/Practice-Set/GraphQL and Prisma/GraphQL/Schemas/Authors.js";
import BookResolvers from "/Users/siddhantgupta/Desktop/SID/Practice-Set/GraphQL and Prisma/GraphQL/Resolvers/Books.js"
import AuthorResolvers from "/Users/siddhantgupta/Desktop/SID/Practice-Set/GraphQL and Prisma/GraphQL/Resolvers/Authors.js";

const typeDefs = `#graphql
  ${BooktypeDefs}
  ${AuthorTypeDefs}
`;
const resolvers = {
  Query: {
    ...BookResolvers.Query,
    ...AuthorResolvers.Query,
  },
  Mutation: {
    ...BookResolvers.Mutation,
    ...AuthorResolvers.Mutation,
  },
};

export {typeDefs, resolvers}