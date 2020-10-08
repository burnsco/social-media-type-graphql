import PostList from "@/components/PostList"
import { PostsDocument } from "@/generated/graphql"
import { render } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import React from "react"
import { posts } from "../utils/postData"

const mocks = [
  {
    request: {
      query: PostsDocument,
      variables: {
        skip: 0,
        first: 4
      },
      notifyOnNetworkStatusChange: true
    },
    result: {
      data: {
        posts: [...posts],
        _allPostsMeta: {
          __typename: "_QueryMeta",
          count: 1
        }
      }
    }
  }
]

describe("PostList", () => {
  it("renders without crashing", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <PostList />
      </MockedProvider>
    )
    console.log(mocks)
    const loading = await screen.findByText(/no posts here/i)
    expect(loading).toBeInTheDocument()
  })
})
