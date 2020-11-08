import { gql, useMutation } from '@apollo/client';

export interface CreateUserResponse {
  id: string;
  name: string;
  createdOn: string;
}

export interface CreateUserVariables {
  name: string;
}

export const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(createUserInput: { name: $name }) {
      id name createdOn
    }
  }
`;

export const useCreateUser = () => useMutation<CreateUserResponse, CreateUserVariables>(CREATE_USER);

export interface CreatePostVariables {
  userId: string;
  topicId: string;
  title: string;
  content: string;
}

export interface CreatePostResponse {
  topic: {
    name: string;
  };
  creator: {
    name: string;
  };
  title: string;
  content: string;
}

export const CREATE_POST = gql`
  input CreatePostInput {
    """The ID of the user who is creating this post."""
    userId: String!

    """The ID of the topic that this post belongs to."""
    topicId: String!
    title: String!
    content: String!
  }
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      topic { name } title content creator { name }
    }
  }
`;

export const useCreatePost = () => useMutation<CreatePostResponse, CreatePostVariables>(CREATE_POST);

export interface CreateTopicVariables {
  name: string;
}

export interface CreateTopicResponse {
  id: string;
  createdOn: string;
  name: string;
}

export const CREATE_TOPIC = gql`
  mutation CreateTopic($name: String!) {
    createTopic(createTopicInput: { name: $name }) {
      id createdOn name
    }
  }
`;

export const useCreateTopic = () => useMutation<CreateTopicResponse, CreateTopicVariables>(CREATE_TOPIC);
