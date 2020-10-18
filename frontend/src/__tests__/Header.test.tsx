import Header from "@/components/Header"
import { render } from "@/utils/test-utils"
import { gql, InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"

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
    await screen.findByRole("button", { name: /register/i })
    await screen.findByRole("button", { name: /login/i })
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument
  })

  it("renders the username of logged in user in navbar", async () => {
    render(
      <MockedProvider cache={signedInCache}>
        <Header />
      </MockedProvider>
    )
    await screen.findByRole("button", { name: /Corey/i })
    expect(screen.getByRole("button", { name: /Corey/i })).toBeInTheDocument
  })

  it("renders home, submit, category buttons", async () => {
    render(
      <MockedProvider cache={signedInCache}>
        <Header />
      </MockedProvider>
    )
    await screen.findByRole("button", { name: /submit post/i })
    await screen.findByText(/reddit/i)
    await screen.findByRole("button", { name: /create subreddit/i })
    expect(screen.getByRole("button", { name: /submit post/i }))
      .toBeInTheDocument
    expect(screen.getByRole("button", { name: /reddit/i })).toBeInTheDocument
    expect(screen.getByRole("button", { name: /create subreddit/i }))
      .toBeInTheDocument
  })
})
