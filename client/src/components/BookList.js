import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    bookId: null
  };
  displayBooks = () => {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading Books... </div>;
    } else {
      return (
        <ul id="book-list">
          {data.books.map(book => {
            return (
              <li
                key={book.id}
                onClick={e => this.setState({ bookId: book.id })}
              >
                {book.name}
              </li>
            );
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
        <BookDetails bookId={this.state.bookId} />
        <br />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
