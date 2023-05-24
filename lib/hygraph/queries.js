import { gql } from 'graphql-request';

const AllPosts = gql`
  query Assets {
    blogPosts {
      body
      createdAt
      title
      id
      slug
      updatedAt
      heroImage {
        url
        width
        height
      }
    }
  }
`;

const SinglePost = gql`
  query SinglePost($slug: String!) {
    blogPost(where: { slug: $slug }) {
      body
      createdAt
      title
      id
      slug
      updatedAt
      heroImage {
        height
        url
        width
      }
    }
  }
`;

export { AllPosts, SinglePost };
