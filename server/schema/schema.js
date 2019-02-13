const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

const books = [
  {
    name: "深入react技术栈",
    genre: "计算机",
    id: "1"
  },
  {
    name: "自我",
    genre: "心理",
    id: "2"
  },
  {
    name: "CSS世界",
    genre: "计算机",
    id: "3"
  }
];
// console.log(_.find(books, { id: '2' }));

// book author
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      // 参数
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        console.log(args)
        // 数据来源,从哪里得到数据:数据库或者其他来源
        // mongodb mysql postgresql
        return _.find(books, { id: args.id });
      }
    }
  }
});

// 查询方式 类似
// {
//   book(id:'2'){name}
// }

// 导出内容
module.exports = new GraphQLSchema({
  query: RootQuery
});
