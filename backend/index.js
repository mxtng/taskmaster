import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

let tasks = [
  {
    id: '1',
    title: 'Door repair',
    description: 'Repair door knob',
    price: 50.00,
  },
  {
    id: '2',
    title: 'Furniture assembly',
    description: 'Assemble ikea bed, kitchen table & chairs',
    price: 40.00,
  },
  {
    id: '3',
    title: 'Dog walker',
    description: 'Walk to the dog for 30mins',
    price: 10.00,
  },
  {
    id: '4',
    title: 'Food delivery',
    description: 'Order & pickup food from Dominos',
    price: 20.00,
  },
  {
    id: '5',
    title: 'Mow the lawn',
    description: 'Mow the garden lawn',
    price: 65.00,
  },
];

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

const rootValue = {
  tasks: () => {
    return tasks.map((task) => {
      return task;
    });
  },
  createTask: (args) => {
    const { title, description, price } = args.inputTask;
    const task = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      price,
    };
    tasks.push(task);
    return task;
  },
  editTask: (args) => {
    const { title, description, price } = args.inputTask;
    const editedTask = {
      id: args.taskId,
      title,
      description,
      price,
    };
    tasks = tasks.map((task) => {
      return task.id === args.taskId ? editedTask : task;
    });
    return editedTask;
  },

  deleteTask: ({ taskId }) => {
    const deletedTask = tasks.find((task) => task.id === taskId);
    tasks = tasks.filter((task) => task.id !== taskId);
    return deletedTask;
  },
};

const app = express();
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello Taskmaster!');
});

const port = process.env.PORT || 3010;
app.listen(port, () =>
  console.log(`Server connected @ http://localhost:${port}`)
);
