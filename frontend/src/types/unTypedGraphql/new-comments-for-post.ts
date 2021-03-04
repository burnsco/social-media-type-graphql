import { gql } from "@apollo/client"

export const NEW_COMMENTS_SUBSCRIPTION = gql`
  subscription NewComments($postId: ID!) {
    newComments(postId: $postId) {
      id
      createdAt
      updatedAt
      body

      createdBy {
        id
        username
      }

      post {
        id
        title
      }
    }
  }
`
