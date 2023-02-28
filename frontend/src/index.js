import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const container = document.getElementById('root');
const root = createRoot(container);
const apolloClient = new ApolloClient({
  uri: "https://gefbjiv5ets7qntmjpmfngrmwi0lqjmd.lambda-url.eu-west-3.on.aws/",
  cache: new InMemoryCache({
    addTypename: false
  }),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
