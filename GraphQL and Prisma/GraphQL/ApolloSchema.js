const typeDefs = `#graphql

type Book {
  id: String!
  title: String!
  author: String!
  price: Int!
  quantity: Int!
  reviews: [String!]
}

type PaginatedBook {
  total: Int!
  Current_limt: Int!
  current_Page: Int!
  next_Page: Int!
  previous_Page: Int!
  results: [Book!]!
}

type Author {
  id: String!
  name: String!
  age: Int!
  gender: String!
}

type Query {
  getAllbooks: [Book!]!
  getOnebook(id: ID!): Book
  getPaginatedBooks(page: Int!, limit: Int!): PaginatedBook!
  getAllauthors: [Author!]!
  getOneauthor(id: ID!): Author
}

type Mutation {
  createBook(title: String!, authorName: String!, price: Int!, quantity: Int!, reviews: [String!]): Book!
  updateBook(id: ID!, title: String, authorName: String, price: Int, quantity: Int, reviews: [String!]): Book!
  deleteBook(id: ID!): Boolean!

  createAuthor(name: String!, age: Int!, gender: String!): Author!
  updateAuthor(id: ID!, name: String, age: Int, gender: String): Author!
  deleteAuthor(id: ID!): Boolean!
}

`;
export default typeDefs
