const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

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
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  field: {
    book: {
      type: BookType,
      // 参数
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        // 数据来源,从哪里得到数据:数据库或者其他来源
      }
    }
  }
});
// 导出内容
module.exports = new GraphQLSchema({
  query: RootQuery
});
