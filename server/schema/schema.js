const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require("graphql");

/**
 * 书 作者 一个书一个作者(假设) 一个作者很多书
 * 查询一个作者的书
 * 查询一本书的作者
 */

const books = [
  {
    name: "深入react技术栈",
    genre: "计算机",
    id: "1",
    authorId: "1"
  },
  {
    name: "深入react技术栈1",
    genre: "计算机1",
    id: "11",
    authorId: "1"
  },
  {
    name: "自我",
    genre: "心理",
    id: "2",
    authorId: "2"
  },
  {
    name: "自我1",
    genre: "心理1",
    id: "12",
    authorId: "2"
  },
  {
    name: "CSS世界",
    genre: "计算机",
    id: "3",
    authorId: "3"
  },
  {
    name: "CSS世界1",
    genre: "计算机1",
    id: "13",
    authorId: "3"
  }
];
const authors = [
  { name: "kitety1", age: 22, id: "1" },
  { name: "kitety2", age: 23, id: "2" },
  { name: "kitety3", age: 24, id: "3" }
];
// console.log(_.find(books, { id: '2' }));

// book author
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // 数据的关联
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // parent对应查询到的对象
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
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
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // 传递整型也会转换为string
        console.log(args);
        // 数据来源,从哪里得到数据:数据库或者其他来源
        // mongodb mysql postgresql
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // 传递整型也会转换为string
        console.log(args);
        // 数据来源,从哪里得到数据:数据库或者其他来源
        // mongodb mysql postgresql
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      // 获取的时候,那个BookType里面的authors还可以拓展的
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
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
