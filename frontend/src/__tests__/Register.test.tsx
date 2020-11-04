import RegisterPage from "@/components/Register/Register"
import { RegisterDocument } from "@/generated/graphql"
import { fireEvent, render } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import preloadAll from "../lib/jest-next-dynamic/index"

const mocks = [
  {
    request: {
      query: RegisterDocument,
      variables: {
        username: "",
        password: "",
        email: ""
      }
    },
    result: {
      data: {
        register: {
          user: null,
          errors: {
            field: null,
            message: null
          }
        }
      }
    }
  }
]

beforeAll(async () => {
  await preloadAll()
})

describe("Register", () => {
  it("shows required when given empty values on each field", async () => {
    const { getByRole, getByText, findAllByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    )
    const submit = getByRole("button", { name: /submit/i })
    expect(submit).toBeInTheDocument()

    fireEvent.click(submit)
    expect(getByText(/Loading.../i)).toBeInTheDocument()

    const warning = await findAllByText(/required/i)
    expect(warning).toHaveLength(3)
  })
})
