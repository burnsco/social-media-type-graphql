import { MockedProvider } from "@apollo/client/testing"
import { cleanup, fireEvent, screen } from "@testing-library/react"
import React from "react"
import RegisterPage from "."
import { RegisterDocument } from "../../generated/graphql"
import { render } from "../../utils/renderChakra"

afterAll(cleanup)

const mocks = [
  {
    request: {
      query: RegisterDocument,
      variables: {
        username: "frank",
        password: "frank",
        email: "frank@gmail.com"
      }
    },
    result: {
      data: {
        register: {
          id: "1",
          username: "frank",
          password: "frank",
          email: "frank@gmail.com"
        }
      }
    }
  }
]

describe("Register", () => {
  it("user is created successfully", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <RegisterPage />
      </MockedProvider>
    )
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "frank@gmail.com" }
    })
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "frank" }
    })
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "frank" }
    })

    fireEvent.click(screen.getByRole("button", { name: /submit/i }))
  })
})
