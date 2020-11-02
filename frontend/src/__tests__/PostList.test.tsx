import PostList from "@/components/PostList"
import { PostsDocument } from "@/generated/graphql"
import { cleanup, render, waitForElementToBeRemoved } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"

afterEach(cleanup)

const mocks = {
  request: {
    query: PostsDocument,
    variables: {
      skip: 0,
      first: 4
    }
  },
  result: {
    data: {
      posts: [
        {
          author: {
            id: "1",
            username: "Bob"
          },
          category: {
            id: "1",
            name: "react"
          },
          comments: [],
          createdAt: "1603212919000",
          id: "1",
          image: "",
          link: "",
          text: "you agree?",
          title: "react rocks!",
          totalComments: {
            count: 0
          },
          totalVotes: {
            count: 0,
            score: null
          },
          updatedAt: "1603212919000",
          video: ""
        },
        {
          author: {
            id: "1",
            username: "Susan"
          },
          category: {
            id: "2",
            name: "movies"
          },
          comments: [],
          createdAt: "1603212919000",
          id: "2",
          image: "",
          link: "",
          text: "is the best movie!",
          title: "the shining",
          totalComments: {
            count: 0
          },
          totalVotes: {
            count: 0,
            score: null
          },
          updatedAt: "1603212919000",
          video: ""
        }
      ]
    }
  }
}

describe("PostList", () => {
  it("Renders 'loading' then 2 posts.' ", async () => {
    const { debug, getByText } = render(
      <MockedProvider
        defaultOptions={{
          watchQuery: { fetchPolicy: "no-cache" },
          query: { fetchPolicy: "no-cache" }
        }}
        mocks={[mocks]}
        addTypename={false}
      >
        <PostList />
      </MockedProvider>
    )
    const loading = getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitForElementToBeRemoved(loading).then(() =>
      console.log("element is no longer in DOM")
    )

    const post1 = getByText(/react rocks!/i)
    expect(post1).toBeInTheDocument()
  })
})
