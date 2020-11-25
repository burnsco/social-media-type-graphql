import faker from "faker"
import { gCall } from "../testing/gCall"
import { testConnection } from "../testing/testConn"
import { Comment } from "./../entities/Comment"

const createCommentMutation = `
mutation CreateComment($data: CommentInput! ) {
  createComment(data: $data) {
    comment {
      body
    }
  }
}
`

describe("Comment", () => {
  it("user can create a comment + found in db", async () => {
    const orm = await testConnection()
    const comment = {
      body: faker.fake("{{random.word}}")
    }
    const response = await gCall({
      source: createCommentMutation,
      userId: "14afd9b0-c36c-40b1-961b-fcd057ceb749",
      variableValues: {
        data: {
          postId: "69f8ed4b-be3f-4363-838e-2c1c50897ee3",
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
    const newComment = orm.em.findOne(Comment, { body: comment.body })
    expect(newComment).toBeDefined()
  })
})
