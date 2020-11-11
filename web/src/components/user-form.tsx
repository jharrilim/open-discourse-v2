import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { FC, FormEvent, useCallback, useState } from 'react';
import { useCreateUser } from '../mutations';

interface UserFormProps {
  onUserCreated: (user: string) => void;
  onUserCreatedError: (err: any) => void;
}

export const UserForm: FC<UserFormProps> = ({
  onUserCreated,
  onUserCreatedError,
}) => {
  const [username, setUsername] = useState('');
  const [createUser] = useCreateUser();

  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    createUser({ variables: { name: username } })
      .then(res => {
        if (res.errors) {
          onUserCreatedError(res.errors);
        } else {
          console.log(res.data);
          onUserCreated(res.data!.createUser.name);
          setUsername('');
        }
      }).catch(err => {
        onUserCreatedError(err);
      });

  }, [setUsername, createUser, username, onUserCreated, onUserCreatedError]);

  return (
    <Grid component="form" container item xs={12} justify="center" onSubmit={submitHandler}>
      <Grid container item justify="center">
        <Typography>Create User</Typography>
      </Grid>
      <Grid container item xs={12} justify="center">
        <TextField
          title="Username"
          placeholder="Username"
          value={username}
          onChange={ev => {
            console.log(ev.target.value);
            setUsername(ev.target.value);
          }}
        />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button
          children="Create User"
          title="Create User"
          type="submit"
        />
      </Grid>
    </Grid>
  );
};

export default UserForm;
