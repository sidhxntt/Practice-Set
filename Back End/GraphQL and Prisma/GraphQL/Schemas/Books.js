const BooktypeDefs = `#graphql

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

type Query {
  getAllbooks: [Book!]!
  getOnebook(id: ID!): Book
  getPaginatedBooks(page: Int!, limit: Int!): PaginatedBook!
}

type Mutation {
  createBook(title: String!, authorName: String!, price: Int!, quantity: Int!, reviews: [String!]): Book!
  updateBook(id: ID!, title: String, authorName: String, price: Int, quantity: Int, reviews: [String!]): Book!
  deleteBook(id: ID!): Boolean!
}

`;
export default BooktypeDefs
