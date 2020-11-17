import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import { getUserAuth } from './utils/localStorage';
import App from './App';

import './index.css';

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: 'http://localhost:3010/graphql' });

const token = getUserAuth() && getUserAuth().token;

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

(async () => {
  try {
    await persistCache({
      cache,
      storage: window.localStorage,
    });
  } catch (err) {
    console.log(err);
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
