import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import React from "react"
import { RegisterDocument } from "../generated/graphql"
import RegisterPage from "../pages/register"
import { render } from "../utils/test-utils"

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
          user: {
            id: "1",
            username: "frank111"
          },
          errors: {
            field: null,
            message: null
          }
        }
      }
    }
  }
]

describe("Register", () => {
  it("renders without crashing", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    )
  })
})
