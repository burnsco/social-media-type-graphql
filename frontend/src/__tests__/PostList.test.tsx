import PostList from "@/components/PostList"
import { PostsDocument } from "@/generated/graphql"
import { render } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import React from "react"

const postsMock = [
  {
    request: {
      query: PostsDocument,
      variables: {
        skip: 0,
        first: 4
      }
    },
    result: {
      data: {
        posts: {
          id: "1",
          createdAt: "1601511422000",
          updatedAt: "1601511422000",
          title: "Post #1",
          text: "Hello",
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
            score: 1,
            count: 0
          }
        },
        _allPostsMeta: {
          count: 1
        }
      }
    }
  }
]

describe("PostList", () => {
  it("renders without crashing", async () => {
    const { getByText, findByText } = render(
      <MockedProvider mocks={postsMock} addTypename={false}>
        <PostList />
      </MockedProvider>
    )

    expect(getByText("loading...")).toBeInTheDocument()

    const postTitle = await findByText("Post #1")
    expect(postTitle).toBeInTheDocument()
  })
})
