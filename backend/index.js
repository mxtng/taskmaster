import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import Task from './models/task';

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // let tasks = [
    //   {
    //     id: '1',
    //     title: 'Door repair',
    //     description: 'Repair door knob',
    //     price: 50.0,
    //   },
    //   {
    //     id: '2',
    //     title: 'Furniture assembly',
    //     description: 'Assemble ikea bed, kitchen table & chairs',
    //     price: 40.0,
    //   },
    //   {
    //     id: '3',
    //     title: 'Dog walker',
    //     description: 'Walk to the dog for 30mins',
    //     price: 10.0,
    //   },
    //   {
    //     id: '4',
    //     title: 'Food delivery',
    //     description: 'Order & pickup food from Dominos',
    //     price: 20.0,
    //   },
    //   {
    //     id: '5',
    //     title: 'Mow the lawn',
    //     description: 'Mow the garden lawn',
    //     price: 65.0,
    //   },
    // ];

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
      tasks: async () => {
        try {
          const tasks = await Task.find();
          return tasks;
        } catch (err) {
          throw err;
        }
      },
      createTask: async (args) => {
        try {
          const { title, description, price } = args.inputTask;
          const task = new Task({
            title,
            description,
            price,
          });

          await task.save();
          return task;
        } catch (err) {
          throw err;
        }
      },
      editTask: async (args) => {
        try {
          const { title, description, price } = args.inputTask;
          const editedTask = await Task.findByIdAndUpdate(
            args.taskId,
            {
              title,
              description,
              price,
            },
            { new: true }
          );
          return editedTask;
        } catch (err) {
          throw err;
        }
      },

      deleteTask: async ({ taskId }) => {
        try {
          const deletedTask = await Task.findByIdAndDelete(taskId);
          return deletedTask;
        } catch (err) {
          throw err;
        }
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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
