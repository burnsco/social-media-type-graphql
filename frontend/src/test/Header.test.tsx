import { gql, InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import React from "react"
import Header from "../components/Header"
import { render } from "../utils/renderChakra"

const cache = new InMemoryCache()
cache.writeQuery({
  query: gql`
    query MeQuery {
      me {
        id
        username
      }
    }
  `,
  data: {
    me: {
      __typename: "User",
      id: "1",
      username: "Corey"
    }
  }
})

describe("Index", () => {
  it("Renders without Crashing", async () => {
    render(
      <MockedProvider cache={cache}>
        <Header />
      </MockedProvider>
    )
  })
})
