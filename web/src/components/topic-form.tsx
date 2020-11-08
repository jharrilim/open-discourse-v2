import { Button, Grid, Input } from '@material-ui/core';
import React, { FC, useCallback, useState } from 'react';
import { useCreateTopic, CreateTopicResponse } from '../mutations';

interface TopicFormProps {
  onTopicCreated: (response: CreateTopicResponse) => void;
}

export const TopicForm: FC<TopicFormProps> = ({
  onTopicCreated,
}) => {
  const [createTopic, topicState] = useCreateTopic();
  const [topic, setTopic] = useState('');

  const createTopicHandler = useCallback(() => {
    createTopic({
      variables: { name: topic },
    }).then(res => {
      if (res.data) {
        setTopic('');
        onTopicCreated(res.data);
      }
    });
  }, [createTopic, onTopicCreated, topic]);

  return (
    <Grid container item xs={12} justify="center">
      <Grid container item xs={12} justify="center">
        <Input placeholder="Topic Name" disabled={topicState.loading} value={topic} onChange={ev => setTopic(ev.target.value)} />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button onClick={createTopicHandler} disabled={topicState.loading}>Create Topic</Button>
      </Grid>
    </Grid>
  );
};

export default TopicForm;
