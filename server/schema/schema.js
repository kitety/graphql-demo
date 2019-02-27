const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

// 使用方法
// const book = new Book({
//   name: "深入react技术栈",
//   genre: "计算机",
//   authorId: "1"
// });
// book.save();

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
    id: "2",
    authorId: "1"
  },
  {
    name: "自我",
    genre: "心理",
    id: "3",
    authorId: "2"
  },
  {
    name: "自我1",
    genre: "心理1",
    id: "4",
    authorId: "2"
  },
  {
    name: "CSS世界",
    genre: "计算机",
    id: "5",
    authorId: "3"
  },
  {
    name: "CSS世界1",
    genre: "计算机1",
    id: "6",
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
        // console.log(parent);
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

// 修改的数据
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
        // 注意：在mongodb中，id是自动生成的
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLString }
        // 注意：在mongodb中，id是自动生成的
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

// 查询方式 类似
// {
//   book(id:'2'){name}
// }
// mutation
// mutation{
//   addAuthor(name: "kitety", age: 7){
//     age, name
//   }
// }

// 导出内容
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
