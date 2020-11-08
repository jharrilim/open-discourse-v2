import { gql, useQuery } from '@apollo/client';

export interface GetTopicsResult {
  topics: {
    id: string;
    createdOn: string;
    name: string;
    posts: {
      title: string;
    }[];
  }[];
};

export const GET_TOPICS = gql`
  query {
    topics {
      id createdOn name posts { title }
    }
  }
`;

export const useGetTopics = () => useQuery<GetTopicsResult>(GET_TOPICS);

export interface GetUsersResult {
  users: {
    id: string;
    createdOn: string;
    name: string;
  }[];
}

export const GET_USERS = gql`
  query {
    user {
      id createdOn name
    }
  }
`;

export const useGetUsers = () => useQuery<GetUsersResult>(GET_USERS);
