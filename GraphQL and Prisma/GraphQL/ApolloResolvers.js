import { PrismaClient } from "@prisma/client";
import createToken from "../Auth/JWT.cjs";
const prisma = new PrismaClient();
import { GraphQLError } from "graphql";
import decryptJWT from "../Auth/Decrypt.cjs";

const resolvers = {
  Query: {
    getAllbooks: async () => {
      return prisma.book.findMany();
    },
    getPaginatedBooks: async (_, { page, limit }) => {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const books = await prisma.book.findMany();

      const results = {
        total: page * limit,
        Current_limt: limit,
        current_Page: page,
        next_Page: page + 1,
        previous_Page: page - 1,
        results: books.slice(startIndex, endIndex),
      };

      return results;
    },
    getOnebook: async (_, { id }) => {
      return prisma.book.findUnique({
        where: { id },
      });
    },
    getAllauthors: async (_, __, contexValue) => {
      if (!contexValue.token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const authorID = await decryptJWT(contexValue.token);
      if (authorID){
        return prisma.author.findMany();
      } 
    },
    getOneauthor: async (_, { id }, contexValue) => {
      if (!contexValue.token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const authorID = await decryptJWT(contexValue.token);
      if (authorID) {
        return prisma.author.findUnique({
          where: { id },
        });
      }
    },
  },
  Mutation: {
    createBook: async (_, { title, authorName, price, quantity, reviews }) => {
      return prisma.book.create({
        data: {
          title,
          author: authorName,
          price,
          quantity,
          reviews: { set: reviews || [] },
        },
      });
    },
    updateBook: async (
      _,
      { id, title, authorName, price, quantity, reviews }
    ) => {
      return prisma.book.update({
        where: { id },
        data: {
          title,
          author: authorName,
          price,
          quantity,
          reviews: { set: reviews || [] },
        },
      });
    },
    deleteBook: async (_, { id }) => {
      try {
        await prisma.book.delete({
          where: { id },
        });
        return true; // Deletion successful
      } catch (error) {
        console.error(`Error deleting book with ID ${id}:`, error);
        return false; // Deletion failed
      }
    },
    createAuthor: async (_, { name, age, gender }, contextValue) => {
      const author = await prisma.author.create({
        data: {
          name,
          age,
          gender,
        },
      });
      const res = contextValue.res;
      const token = createToken(author.id);
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

export default resolvers;
