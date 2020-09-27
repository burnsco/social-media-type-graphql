import faker from "faker"
import { User } from "../entities/User"
import { gCall } from "../testing/gCall"
import { testConnection } from "../testing/testConn"

const registerMutation = `
mutation Register($data: RegisterInput! ) {
  register(data: $data) {
    user {
      email
      username
    }
  }
}
`

describe("Register", () => {
  it("User", async () => {
    const orm = await testConnection()
    const user = {
      username: faker.fake("{{internet.userName}}"),
      password: faker.fake("{{internet.password}}"),
      email: faker.fake("{{internet.email}}")
    }
    const response = await gCall({
      source: registerMutation,
      userId: "1",
      variableValues: {
        data: {
          ...user
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
})
