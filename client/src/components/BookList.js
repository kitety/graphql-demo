import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

class BookList extends Component {
  displayBooks = () => {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading Books... </div>;
    } else {
      return (
        <ul id="book-list">
          {data.books.map(book => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      );
    }
  };
  render() {
    // console.log(this.props);
    return (
      <div>
        {this.displayBooks()}
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
