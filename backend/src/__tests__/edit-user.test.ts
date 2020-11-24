import { User } from "../entities/User"
import { gCall } from "../testing/gCall"
import { testConnection } from "../testing/testConn"

const editUserMutation = `
mutation EditUser($data: EditUserInput! ) {
  editUser(data: $data) {
    user {
      username
      about
      email
      avatar
    }
  }
}
`

describe("Edit User", () => {
  it("username changed (graphql response + DB)", async () => {
    const orm = await testConnection()
    const response = await gCall({
      source: editUserMutation,
      userId: "14afd9b0-c36c-40b1-961b-fcd057ceb749",
      variableValues: {
        data: {
          username: "changed2New"
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        editUser: {
          user: {
            username: "changed2New",
            email: "changedEmail@gmail.com",
            about: null,
            avatar: null
          }
        }
      }
    })
    const dbUser = orm.em.findOne(User, { username: "changed2New" })
    expect(dbUser).toBeDefined()
  })
  it("email changed (graphql response + DB)", async () => {
    const orm = await testConnection()
    const response = await gCall({
      source: editUserMutation,
      userId: "14afd9b0-c36c-40b1-961b-fcd057ceb749",
      variableValues: {
        data: {
          email: "changedEmail@gmail.com"
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        editUser: {
          user: {
            username: "changed2New",
            email: "changedEmail@gmail.com",
            about: null,
            avatar: null
          }
        }
      }
    })
    const dbUser = orm.em.findOne(User, { email: "changedEmail@gmail.com" })
    expect(dbUser).toBeDefined()
  })
})
