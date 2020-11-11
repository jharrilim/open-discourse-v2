import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  loginForm: {

  }
}));

export const LoginForm = () => {
  const classes = useStyles();

  return (
    <Grid container item className={classes.loginForm} justify="center">
      
    </Grid>
  )
};

export default LoginForm;
