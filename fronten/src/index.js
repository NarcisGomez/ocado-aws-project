import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const container = document.getElementById('root');
const root = createRoot(container);
const apolloClient = new ApolloClient({
  uri: "https://4lsuiuvhcnrvd2cw6tor6xutf40hfsbi.lambda-url.eu-west-3.on.aws",
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
