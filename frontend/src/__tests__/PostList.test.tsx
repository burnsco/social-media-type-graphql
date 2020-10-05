import { InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import React from "react"
import PostList from "../components/PostList"
import { PostsDocument } from "../generated/graphql"
import { render } from "../utils/test-utils"

const postsCache = new InMemoryCache()
postsCache.writeQuery({
  query: PostsDocument,
  data: {
    posts: {
      id: "1",
      createdAt: "1601511422000",
      updatedAt: "1601511422000",
      title: "Test Post",
      category: {
        id: "1",
        name: "React"
      },
      author: {
        id: "1",
        username: "Corey"
      },
      totalComments: {
        count: 0
      },
      totalVotes: {
        count: 0
      }
    }
  }
})

describe("PostList", () => {
  it("renders without crashing", async () => {
    render(
      <MockedProvider cache={postsCache} addTypename={false}>
        <PostList />
      </MockedProvider>
    )
  })
})
