import { gql, InMemoryCache } from "@apollo/client"

export const signedInUserCache = new InMemoryCache()
signedInUserCache.writeQuery({
  query: gql`
    query MeQuery {
      me {
        id
        username
        email
      }
    }
  `,
  data: {
    me: {
      __typename: "User",
      id: "1",
      username: "Corey",
      email: "coreymburns@gmail.com"
    }
  }
})
