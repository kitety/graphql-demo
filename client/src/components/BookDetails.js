import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetail = () => {
    const { book } = this.props.data;
    console.log(this);
    if (book) {
      return (
        <div>
          <h2>书名：{book.name}</h2>
          <p>类别：{book.genre}</p>
          <p>作者：{book.author.name}</p>
          <p>All Books By This Author</p>
          <ul>
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return (
      <div>
        <h2>No Book Selected!</h2>
      </div>
    );
  };
  render() {
    return <div id="book-details">{this.displayBookDetail()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
