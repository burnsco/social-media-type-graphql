import faker from "faker"
import { gCall } from "../testing/gCall"

const createCommentMutation = `
mutation CreateComment($data: CommentInput! ) {
  createComment(data: $data) {
    comment {
      body
    }
  }
}
`

describe("Category", () => {
  it("User can create a category", async () => {
    const comment = {
      body: faker.fake("{{internet.userName}}")
    }
    const response = await gCall({
      source: createCommentMutation,
      userId: "87584d89-fc02-4a12-ba8e-24657162555a",
      variableValues: {
        data: {
          postId: "e27fe7ed-495e-42e2-962a-3d6df5077ab9",
          body: comment.body
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        createComment: {
          comment: {
            body: comment.body
          }
        }
      }
    })
  })
})
