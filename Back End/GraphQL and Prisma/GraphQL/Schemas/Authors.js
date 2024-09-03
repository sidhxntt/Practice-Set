const AuthortypeDefs = `#graphql

type Author {
  id: String!
  name: String!
  age: Int!
  gender: String!
  role: String
}

type Query {
  getAllauthors: [Author!]!
  getOneauthor: Author
}

type Mutation {
  createAuthor(name: String!, age: Int!, gender: String!, role: String): Author!
  updateAuthor(id: ID!, name: String, age: Int, gender: String): Author!
  deleteAuthor(id: ID!): Boolean!
}

`;
export default AuthortypeDefs
