import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import { screen, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { RegisterDocument } from "../generated/graphql"
import RegisterPage from "../pages/register"
import { render } from "../utils/renderChakra"

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
          __typename: "UserMutationResponse",
          user: {
            id: "1",
            username: "frank"
          }
        }
      }
    }
  },
  {
    request: {
      query: RegisterDocument,
      variables: {
        username: "f",
        password: "fk",
        email: "frank@gmail.com"
      }
    },
    result: {
      data: {
        register: {
          __typename: "UserMutationResponse",
          user: null,
          errors: {
            field: "username",
            message: "username is too short"
          }
        }
      }
    }
  }
]

describe("Register", () => {
  it("user", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    )
    userEvent.type(screen.getByLabelText("Email"), "frank@gmail.com")
    userEvent.type(screen.getByLabelText("Username"), "frank")
    userEvent.type(screen.getByLabelText("Password"), "frank")

    userEvent.click(await screen.findByText("Submit"))

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))
  })
})
