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
    });

    const app = express();
    app.use(express.json());

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

    const port = process.env.PORT || 3010;
    app.listen(port, () =>
      console.log(`Server connected @ Port: ${port}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
