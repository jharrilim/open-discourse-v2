import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { Columns, DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react';
import { useGetTopics } from '../queries';

const useStyles = makeStyles(theme => ({
  topicTable: {
    minHeight: '300px',
  },
}));

export const TopicTable = () => {
  const { data, loading, error, startPolling, stopPolling } = useGetTopics();
  const classes = useStyles();

  useEffect(() => {
    startPolling(5 * 1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if(error)
    console.log(error);

  const rows = data 
    ? data.topics.map(d => ({ id: d.id, createdOn: d.createdOn, name: d.name }))
    : [];

  const cols: Columns = [
    { field: 'id', headerName: 'ID', type: 'string', width: 350 },
    { field: 'createdOn', headerName: 'Created On', type: 'string', width: 200 },
    { field: 'name', headerName: 'Name', type: 'string', width: 200 },
  ];

  if (loading) return <CircularProgress />;

  return (
    <Grid container item xs={12} className={classes.topicTable}>
      <DataGrid autoHeight columns={cols} rows={rows} rowCount={20} />
    </Grid>
  );
};

export default TopicTable;
