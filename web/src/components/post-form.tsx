import { Button, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useCreatePost } from '../mutations';
import { useCookies } from 'react-cookie';
import { useGetTopics } from '../queries';

export const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topicId, setTopicId] = useState('');

  const [cookies] = useCookies(['userId']);
  const [createPost] = useCreatePost();
  const { data: topicsData } = useGetTopics();

  useEffect(() => {
    console.log(topicsData?.topics);
    if (topicsData?.topics && topicsData.topics.length > 0)
      setTopicId(topicsData.topics[0].id ?? '');
  }, [topicsData]);

  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId } = cookies;
    createPost({ variables: { content, title, topicId, userId }})
      .then(yeet => yeet.data);
  }, [createPost, cookies, content, title, topicId]);

  return (
    <Grid component="form" container item justify="center" onSubmit={submitHandler}>
      <Grid container item justify="center">
        <Typography>Create Post</Typography>
      </Grid>
      <Grid container item justify="center">
        <Select value={topicId} onChange={e => setTopicId(e.target.value as string)}>
          {topicsData?.topics.map(topic =>
            <MenuItem key={topic.id} value={topic.id}>
              {topic.name}
            </MenuItem>
          )}
        </Select>
      </Grid>
      <Grid container item justify="center">
        <TextField placeholder="Title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
      </Grid>
      <Grid container item justify="center" xs={12}>
        <TextField
          placeholder="Write your thoughts here."
          name="content"
          multiline
          onChange={e => setContent(e.target.value)}
        />
      </Grid>
      <Grid container item justify="center">
        <Button type="submit">Create Post</Button>
      </Grid>
    </Grid>
  );
};

export default PostForm;
