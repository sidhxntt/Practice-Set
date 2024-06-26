import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';
import connectToDatabase from "./connect_to_db.js";
import { typeDefs, resolvers } from "./GraphQL/Index.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await connectToDatabase();
await server.start();

app.use(
  "/graphql",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
  express.json(),
  expressMiddleware(server, {
    context: ({ req, res }) => {
      const token = req.headers.authorization || "";
      return { token, res };
    },
  })
);

// Proxy setup
app.use('/proxy', createProxyMiddleware({
  target: 'http://localhost:4000/', // Replace with your target server
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '', // Remove /proxy from the request path
  },
}));

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
