import PostList from "@/components/PostList"
import { PostsDocument } from "@/generated/graphql"
import { render } from "@/utils/test-utils"
import { InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import React from "react"

const posts = new InMemoryCache()
posts.writeQuery({
  query: PostsDocument,
  variables: {
    skip: 0,
    first: 4
  },
  data: {
    posts: {
      __typename: "Post",
      id: "1",
      createdAt: "1601511422000",
      updatedAt: "1601511422000",
      title: "Post #1",
      text: "Hello",
      category: {
        __typename: "Category",
        id: "1",
        name: "React"
      },
      author: {
        __typename: "User",
        id: "1",
        username: "Corey"
      },
      totalComments: {
        count: 0
      },
      totalVotes: {
        score: 1,
        count: 0
      }
    },
    _allPostsMeta: {
      count: 1
    }
  }
})

describe("PostList", () => {
  it("renders without crashing", async () => {
    render(
      <MockedProvider cache={posts} addTypename={false}>
        <PostList />
      </MockedProvider>
    )

    const loading = await screen.findByText(/no posts here/i)
    screen.debug(loading)
    expect(loading).toBeInTheDocument()
  })
})
