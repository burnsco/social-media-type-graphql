import faker from "faker"
import { gCall } from "../testing/gCall"
import { testConnection } from "../testing/testConn"
import { Post } from "./../entities/Post"

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
  it("User can create a post and is found in DB", async () => {
    const orm = await testConnection()
    const post = {
      title: faker.fake("{{random.word}}")
    }
    const response = await gCall({
      source: createPostMutation,
      userId: "7dd263db-895a-42ee-bb67-4454b67180c9",
      variableValues: {
        data: {
          categoryId: "711661db-e763-4112-96f7-7c83721615e6",
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
    const newPost = await orm.em.findOne(Post, { title: post.title })
    expect(newPost).toBeDefined()
  })
})
