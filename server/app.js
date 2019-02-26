const express = require("express");
const mongoose = require("mongoose");

// 中间件
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// 链接mongodb
let mongodbUrl =
  "mongodb://kitety123:kitety123@ds123080.mlab.com:23080/graphql";
mongoose.connect(mongodbUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", err => {
  console.error("connection error:" , err);
});
db.once("open", () => {
  console.log("database connected!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log("The server is running on port:4000");
});
