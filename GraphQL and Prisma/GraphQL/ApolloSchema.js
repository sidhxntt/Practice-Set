const typeDefs = `#graphql

type Book {
  id: String!
  title: String!
  author: String!
  price: Int!
  quantity: Int!
  reviews: [String!]
}

type Author {
  id: String!
  name: String!
  age: Int!
  gender: String!
}

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
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
