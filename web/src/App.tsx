import React, { Suspense } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CircularProgress, CssBaseline } from '@material-ui/core';

const HomePage = React.lazy(() => import('./pages/home'));

const client = new ApolloClient({
  uri: process.env.SERVER_URL ?? 'http://localhost:8765/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Suspense fallback={<CircularProgress />}>
        <HomePage />
      </Suspense>
    </ApolloProvider>
  );
}

export default App;
