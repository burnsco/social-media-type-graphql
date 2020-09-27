import { gql, InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import { screen, waitFor } from "@testing-library/react"
import React from "react"
import Header from "../components/Header"
import { render } from "../utils/renderChakra"

const notSignedInCache = new InMemoryCache()
notSignedInCache.writeQuery({
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
      id: null,
      username: null
    }
  }
})

const signedInCache = new InMemoryCache()
signedInCache.writeQuery({
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

describe("Header", () => {
  it("renders basic navbar layout when not logged in", async () => {
    render(
      <MockedProvider cache={notSignedInCache}>
        <Header />
      </MockedProvider>
    )
    await waitFor(() => screen.getByRole("button", { name: /register/i }))
    await waitFor(() => screen.getByRole("button", { name: /login/i }))

    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument
  })

  it("renders the username of logged in user in navbar", async () => {
    render(
      <MockedProvider cache={signedInCache}>
        <Header />
      </MockedProvider>
    )
    await waitFor(() => screen.getByRole("button", { name: /Corey/i }))

    expect(screen.getByRole("button", { name: /Corey/i })).toBeInTheDocument
  })

  it("renders home, submit, category buttons", async () => {
    render(
      <MockedProvider cache={signedInCache}>
        <Header />
      </MockedProvider>
    )

    await waitFor(() => screen.getByRole("button", { name: /submit post/i }))
    await waitFor(() => screen.getByRole("button", { name: /home/i }))
    await waitFor(() =>
      screen.getByRole("button", { name: /create subreddit/i })
    )

    expect(screen.getByRole("button", { name: /submit post/i }))
      .toBeInTheDocument
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument
    expect(screen.getByRole("button", { name: /create subreddit/i }))
      .toBeInTheDocument
  })
})