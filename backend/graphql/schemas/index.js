import { buildSchema } from 'graphql';

const schema = buildSchema(`
input InputTaskData {
  title: String!
  description: String!
  price: Float!
}

type Task {
  id: ID!
  title: String!
  description: String!
  price: Float!
}

type Query {
  hello: String
  tasks: [Task!]!
}

type Mutation {
  createTask(inputTask: InputTaskData): Task!
  editTask(taskId: String!,inputTask: InputTaskData): Task!
  deleteTask(taskId: String!): Task!
}
`);

export default schema;
