import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './components/App';
import './assets/styles/styles.scss';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'));