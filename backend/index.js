import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => {
    return 'Hello Taskmaster!';
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
