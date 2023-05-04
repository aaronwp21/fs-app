import { gql } from 'graphql-request';

const AllPosts = gql`
  query AllPosts {
    blogPosts {
      body
      createdAt
      title
      id
      heroImage {
        url
        width
      }
    }
  }
`;

export { AllPosts };
