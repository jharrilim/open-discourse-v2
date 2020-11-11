import React, { Suspense } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CircularProgress, createMuiTheme, CssBaseline, Grid, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppNav from './components/app-nav';
import theme from './app.theme';

const HomePage = React.lazy(() => import('./pages/home'));

const client = new ApolloClient({
  uri: process.env.SERVER_URL ?? 'http://localhost:8765/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container item xs={12}>
          <AppNav />
          <Router>
            <Switch>
              <Route path="/">
                <Suspense fallback={<CircularProgress />}>
                  <HomePage />
                </Suspense>
              </Route>
              <Route path="/admin">
                <Suspense fallback={<CircularProgress />}>
                  <HomePage />
                </Suspense>
              </Route>
            </Switch>
          </Router>
        </Grid>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
