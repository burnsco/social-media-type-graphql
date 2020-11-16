import Header from "@/components/Header"
import preloadAll from "@/lib/jest-next-dynamic/index"
import { render } from "@/utils/test-utils"
import { gql, InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"

afterEach(cleanup)

beforeAll(async () => {
  await preloadAll()
})

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

describe("Header", () => {
  it("renders basic navbar layout when not logged in", async () => {
    const { getByRole, getByText } = render(
      <MockedProvider cache={notSignedInCache}>
        <Header />
      </MockedProvider>
    )
    const loading = getByText(/loading header/i)
    expect(loading).toBeInTheDocument()
  })
})
