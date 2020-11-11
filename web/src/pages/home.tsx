import { Button, CircularProgress, Grid, IconButton, Input, makeStyles, Snackbar, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import PostForm from '../components/post-form';
import { TopicForm } from '../components/topic-form';
import TopicTable from '../components/topic-table';
import UserTable from '../components/user-table';
import { useCreateTopic, useCreateUser } from '../mutations';


const useStyles = makeStyles(theme => ({
  home: {
    paddingTop: '1.5rem',
    width: '100%',
    height: '100%',
  },
}));


const HomePage = forwardRef<HTMLDivElement>(({ }, ref) => {
  const [createUser, { loading, data, error }] = useCreateUser();
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
      <Grid container item lg={11} xl={10} justify="center">
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
        <Grid container item xs={12} justify="center">
          <TopicForm onTopicCreated={topic => {
            setSnackbarMessage('Topic created: ' + JSON.stringify(topic));
            setSnackbarOpen(true);
          }} />
        </Grid>
        <Grid container item xs={12} justify="center">
          <TopicTable />
        </Grid>
        <Grid container item xs={12} justify="center">
          <UserTable />
        </Grid>
        <Grid container item xs={12} justify="center">
          <PostForm />
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
