import gql from "graphql-tag";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
        id
        age
        books {
          name
          id
        }
      }
    }
  }
`;
export { getBookQuery, getAuthorQuery, addBookMutation, getBooksQuery };
