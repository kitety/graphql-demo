import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorQuery } from "../queries/queries";

class AddBook extends Component {
  displayAuthors = () => {
    const data = this.props.data;
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
  render() {
    console.log(this.props);
    return (
      <form>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Genre</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Author</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
      </form>
    );
  }
}

export default graphql(getAuthorQuery)(AddBook);
