import { ApolloLink } from "@apollo/client"

export const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null
    }
  }))

  return forward(operation)
})

export const activityMiddleware = new ApolloLink((operation, forward) => {
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "recent-activity": localStorage.getItem("lastOnlineTime") || null
    }
  }))

  return forward(operation)
})
