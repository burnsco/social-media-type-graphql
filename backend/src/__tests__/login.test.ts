import faker from "faker"
import { gCall } from "../testing/gCall"

const loginMutation = `
mutation Login($data: LoginInput! ) {
  login(data: $data) {
    user {
      email
    }
  }
}
`

describe("Login", () => {
  it("User can login successfully.", async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: faker.fake("{{internet.email}}"),
          password: faker.fake("{{internet.password}}")
        }
      }
    })
    expect(response.data?.errors).toBeFalsy()
  })
})
