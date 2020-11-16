import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      category
      price
      bid
    }
  }
`;

export const GET_USER_TASKS = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      tasks {
        id
        title
        description
        price
        category
      }
    }
  }
`;
