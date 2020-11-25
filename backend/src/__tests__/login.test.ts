import { gCall } from "../testing/gCall"

const loginMutation = `
mutation Login($data: LoginInput! ) {
  login(data: $data) {
    user {
      username
      email
    }
    errors {
      field
      message
    }
  }
}
`

describe("Login", () => {
  it("User receives proper response when email and/or password is not correct.", async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: "asdfasdf11@asdfsadf.com",
          password: "aasdfkjaklsljlkdj2"
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        login: {
          user: null,
          errors: [
            {
              field: "email",
              message: "Email and/or Password is incorrect."
            }
          ]
        }
      }
    })
  })
  it("User works +  response when email/pass is correct", async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: "loginTest@gmail.com",

          password: "loginTest"
        }
      }
    })
    expect(response).toMatchObject({
      data: {
        login: {
          user: {
            email: "loginTest@gmail.com",
            username: "loginTest"
          },
          errors: null
        }
      }
    })
  })
})
