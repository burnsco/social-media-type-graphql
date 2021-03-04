import { gql } from "@apollo/client"

export const COMMENTS_FOR_POST_QUERY = gql`
  query CommentsForPost($postId: ID!) {
    post(postId: $postId) {
      comments {
        id
        createdAt
        updatedAt
        body
        createdBy {
          id
          username
        }
      }
    }
  }
`
