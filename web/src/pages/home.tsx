import classes from '*.module.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, CircularProgress, Grid, IconButton, Input, makeStyles, Snackbar, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

interface CreateUserResponse {
  id: string;
  name: string;
  createdOn: string;
}

interface CreateUserVariables {
  name: string;
}

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(createUserInput: { name: $name }) {
      id name createdOn
    }
  }
`;

const useStyles = makeStyles(theme => ({
  home: {
    width: '100vw',
    height: '100vh',
  },
}));

const HomePage = forwardRef<HTMLDivElement>(({ }, ref) => {
  const [createUser, { loading, data, error }] = useMutation<CreateUserResponse, CreateUserVariables>(CREATE_USER);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [username, setUsername] = useState('');
  const classes = useStyles();

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  useEffect(() => {
    if (loading)
      return;
    if (data) {
      setSnackbarMessage('User created: ' + JSON.stringify(data));
      setSnackbarOpen(true);
    }
    if (error) {
      setSnackbarMessage('Error: ' + error.message);
      setSnackbarOpen(true);
    }
  }, [loading, data, error]);

  return (
    <Grid ref={ref} className={classes.home} container item xs={12} justify="center" alignItems="center">
      <Grid container item md={6} justify="center" spacing={2}>
        <Typography>Create User</Typography>
        <Grid container item xs={12} justify="center">
          <Input
            title="Username"
            placeholder="Username"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
          />
        </Grid>
        <Grid container item xs={12} justify="center">
          <Button
            variant="contained"
            color="primary"
            children="Create User"
            title="Create User"
            onClick={() => {
              createUser({ variables: { name: username } });
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <>
            <Button color="secondary" size="small" onClick={handleSnackbarClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Grid>
  );
});

export default HomePage;
