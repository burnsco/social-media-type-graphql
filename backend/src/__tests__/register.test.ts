import faker from "faker"
import { User } from "../entities"
import { gCall } from "../utils/gCall"
import { testConnection } from "../utils/testConn"

const registerMutation = `
mutation Register($data: RegisterInput! ) {
  register(data: $data) {
    user {
      email
      username
      avatar
    }
    errors {
      field
      message
    }
  }
}
`

describe("Register", () => {
  it("user +  response and found in DB", async () => {
    const orm = await testConnection()
    const user = {
      username: faker.fake("{{internet.userName}}"),
      avatar: faker.fake("{{image.avatar}}"),
      password: faker.fake("{{internet.password}}"),
      email: faker.fake("{{internet.email}}")
    }
    const response = await gCall({
      source: registerMutation,
      userId: "1",
      variableValues: {
        data: {
          email: user.email,
          username: user.username,
          password: user.password
        }
      }
    })

    expect(response).toMatchObject({
      data: {
        register: {
          user: {
            email: user.email,
            username: user.username
          }
        }
      }
    })

    const dbUser = orm.em.findOne(User, { email: user.email })
    expect(dbUser).toBeDefined()
  })

  it("User res. is null when username taken.", async () => {
    const orm = await testConnection()
    const user = {
      username: "testUser",
      password: "testUser",
      email: "testUser1@gmail.com"
    }
    const response = await gCall({
      source: registerMutation,
      userId: "1",
      variableValues: {
        data: {
          email: user.email,
          username: user.username,
          password: user.password
        }
      }
    })

    expect(response.data?.user).toBeFalsy()

    const dbUser = orm.em.findOne(User, { email: user.email })
    expect(dbUser).toBeDefined()
  })
})
