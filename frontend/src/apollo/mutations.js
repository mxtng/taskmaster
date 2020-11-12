import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!
    $description: String!
    $price: Float!
    $category: String!
  ) {
    createTask(
      inputTask: {
        title: $title
        description: $description
        price: $price
        category: $category
      }
    ) {
      id
      title
      description
      category
      price
      bid
    }
  }
`;