import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { Columns, DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react';
import { useGetTopics, useGetUsers } from '../queries';

const useStyles = makeStyles(theme => ({
  userTable: {
    minHeight: '300px',
  },
}));

export const UserTable = () => {
  const { data, loading, error, startPolling, stopPolling } = useGetUsers();
  const classes = useStyles();

  useEffect(() => {
    startPolling(5 * 1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if(error)
    console.log(error);

  const rows = data?.users.map(user => ({ id: user.id, createdOn: user.createdOn, name: user.name })) ?? [];

  const cols: Columns = [
    { field: 'id', headerName: 'ID', type: 'string', width: 350 },
    { field: 'createdOn', headerName: 'Created On', type: 'string', width: 200 },
    { field: 'name', headerName: 'Name', type: 'string', width: 200 },
  ];

  if (loading) return <CircularProgress />;

  return (
    <Grid container item xs={12} className={classes.userTable}>
      <DataGrid autoHeight columns={cols} rows={rows} rowCount={20} />
    </Grid>
  );
};

export default UserTable;
