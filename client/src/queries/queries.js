import gql from "graphql-tag";

const getBookQuery = gql`
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
export { getBookQuery, getAuthorQuery };
