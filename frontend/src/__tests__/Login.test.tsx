import LoginPage from "@/components/Login/Login"
import { LoginDocument } from "@/generated/graphql"
import preloadAll from "@/lib/jest-next-dynamic/index"
import { cleanup, fireEvent, render } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"

afterEach(cleanup)
beforeAll(async () => {
  await preloadAll()
})

const mocks = [
  {
    request: {
      query: LoginDocument,
      variables: {
        email: "coreymburns@gmail.com",
        password: "opiate15150"
      }
    },
    result: {
      data: {
        login: {
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

jest.mock("next/dynamic", () => () => "dynamicsidemenu")

describe("Login", () => {
  it("shows required when given empty values on each field", async () => {
    const { getByRole, getByText, findAllByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )
    const submit = getByRole("button", { name: /submit/i })
    expect(submit).toBeInTheDocument()

    fireEvent.click(submit)
    const loading = getByText("Loading...")
    expect(loading).toBeInTheDocument()

    const warning = await findAllByText(/required/i)
    expect(warning).toHaveLength(2)
  })
})
