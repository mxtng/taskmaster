/*
PROCESS ENV VARIABLES CONFIGURATION LIST:
(1) process.env.PORT
(2) process.env.MONGODB_URI
(3) process.env.JWT_SECRET_KEY
*/

import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schemas';
import resolvers from './graphql/resolvers';

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const app = express();
    app.use(express.json());

    if (process.env.NODE_ENV === 'development') {
      app.use((req, res, next) => {
        res.set({
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Headers': ['Authorization', 'Content-Type'],
          'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST'],
          'Content-Type': 'application/json',
        });

        if (req.method === 'OPTIONS') {
          return res.sendStatus(200);
        }
        next();
      });
    }

    app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true,
      })
    );

    app.get('/', (req, res) => {
      res.send('Hello Taskmaster!');
    });

    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server connected @ Port: ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
