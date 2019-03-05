import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorQuery,
  addBookMutation,
  getBookQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };
  displayAuthors = () => {
    // const data = this.props.data; //无 compose key
    const data = this.props.getAuthorQuery; // compose key
    if (data.loading) {
      return <option disabled>Loading Authors... </option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  submitForm = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBookQuery }]
    });
  };
  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.submitForm}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <div>
          <button>+</button>
        </div>
      </form>
    );
  }
}

export default compose(
  // name 区别语句
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
