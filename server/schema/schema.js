const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = require("graphql");

// book author
const BookType = GraphQLObjectType({
  name: "Book",
  filed: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});
const AuthorType = GraphQLObjectType({
  name: "Author",
  filed: () => ({
    name: { type: GraphQLString }
  })
});
