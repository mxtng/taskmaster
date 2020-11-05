import { buildSchema } from 'graphql';

const schema = buildSchema(`
input InputTaskData {
  title: String!
  description: String!
  price: Float!
  category: String!
}

type User {
  id: ID!
  email: String!
}

type Task {
  id: ID!
  title: String!
  description: String!
  price: Float!
  category: String!
  createdBy: User!
}

type Query {
  tasks: [Task!]!
  users: [User!]!
  getUser(userId: String!): User!
  getTask(taskId: String!): Task!
}

type Mutation {
  createUser(email: String!, password: String!): String!
  loginUser(email: String!, password: String!): String!
  createTask(inputTask: InputTaskData): Task!
  editTask(taskId: String!,inputTask: InputTaskData): Task!
  deleteTask(taskId: String!): Task!
}
`);

export default schema;
 