import faker from "faker"
import { gCall } from "../testing/gCall"

const createPostMutation = `
mutation CreatePost($data: CreatePostInput! ) {
  createPost(data: $data) {
    post {
      title
    }
  }
}
`

describe("Post", () => {
  it("User can create a Post", async () => {
    const post = {
      title: faker.fake("{{internet.userName}}")
    }
    const response = await gCall({
      source: createPostMutation,
      userId: "87584d89-fc02-4a12-ba8e-24657162555a",
      variableValues: {
        data: {
          categoryId: "78f236ec-20dd-449b-a91a-dd9ad32b01fa",
          title: post.title
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        createPost: {
          post: {
            title: post.title
          }
        }
      }
    })
  })
})
