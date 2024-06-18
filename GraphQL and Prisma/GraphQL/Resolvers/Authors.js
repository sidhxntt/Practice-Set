import { PrismaClient } from "@prisma/client";
import createToken from "/Users/siddhantgupta/Desktop/SID/Practice-Set/GraphQL and Prisma/Auth/JWT.cjs";
const prisma = new PrismaClient();
import { GraphQLError } from "graphql";
import decryptJWT from "/Users/siddhantgupta/Desktop/SID/Practice-Set/GraphQL and Prisma/Auth/Decrypt.cjs";

const AuthorResolvers = {
  Query: {
    getAllauthors: async (_, __, contextValue) => {
      if (!contextValue.token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
        const decodedToken = await decryptJWT(contextValue.token);
        const authorID = decodedToken.id;

        const Author = await prisma.author.findUnique({
          where: { id: authorID },
        });

        if (Author.role !== 'admin') {
          throw new GraphQLError("Access denied", {
            extensions: {
              code: "FORBIDDEN",
              http: { status: 403 },
            },
          });
        }
        return prisma.author.findMany();
    },

    getOneauthor: async (_, __, contextValue) => {
      if (!contextValue.token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const decodedToken = await decryptJWT(contextValue.token);
      const authorID = decodedToken.id;
      if (authorID) {
        return prisma.author.findUnique({
          where: { id: authorID },
        });
      }
    },
  },

  Mutation: {
    createAuthor: async (_, { name, age, gender, role }, contextValue) => {
      const author = await prisma.author.create({
        data: {
          name,
          age,
          gender,
        },
      });
      const res = contextValue.res;
      const token = await createToken(author.id); // Ensure createToken returns a resolved promise
      res.set("Authorization", `Bearer ${token}`);
      console.log(token);
      return author;
    },
    updateAuthor: async (_, { id, name, age, gender }) => {
      return prisma.author.update({
        where: { id },
        data: {
          name,
          age,
          gender,
        },
      });
    },
    deleteAuthor: async (_, { id }) => {
      try {
        await prisma.author.delete({
          where: { id },
        });
        return true; // Deletion successful
      } catch (error) {
        console.error(`Error deleting author with ID ${id}:`, error);
        return false; // Deletion failed
      }
    },
  },
};

export default AuthorResolvers;
