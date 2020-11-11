import { Button, Grid, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { forwardRef, useCallback, useState } from 'react';
import PostForm from '../components/post-form';
import { TopicForm } from '../components/topic-form';
import TopicTable from '../components/topic-table';
import UserForm from '../components/user-form';
import UserTable from '../components/user-table';


const useStyles = makeStyles(theme => ({
  home: {
    paddingTop: '1.5rem',
    width: '100%',
    height: '100%',
  },
}));


const HomePage = forwardRef<HTMLDivElement>((props, ref) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const classes = useStyles();

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);


  return (
    <Grid ref={ref} className={classes.home} container item xs={12} justify="center" alignItems="center">
      <Grid container item lg={11} xl={10} justify="center">
        <Grid container item xs={12} justify="center">
          <UserForm
            onUserCreated={username => {
              setSnackbarMessage(`User created: ${username}`);
              setSnackbarOpen(true);
            }}
            onUserCreatedError={err => {
              setSnackbarMessage(JSON.stringify(err));
              setSnackbarOpen(true);
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
          <PostForm />
        </Grid>
        <Grid container item xs={12} justify="center">
          <TopicTable />
        </Grid>
        <Grid container item xs={12} justify="center">
          <UserTable />
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
