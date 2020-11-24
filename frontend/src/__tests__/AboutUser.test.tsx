import AboutUserPage from "@/components/User/AboutUser"
import { UserDocument } from "@/generated/graphql"
import { customRender, waitForElementToBeRemoved } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import { signedInUserCache } from "./../utils/signed-in-user-cache"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

const mocks = {
  request: {
    query: UserDocument,
    variables: {
      userId: "1"
    }
  },
  result: {
    data: {
      user: {
        username: "bobby",
        email: "bobbby@gmail.com",
        about: "this is bobby"
      }
    }
  }
}

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

describe("About User", () => {
  it("Displays user username, email, about' ", async () => {
    useRouter.mockImplementation(() => ({
      route: "/user/[username]",
      pathname: "/user/[username]",
      query: { username: "bobby" },
      asPath: "/user/bobby"
    }))

    const { getByText } = customRender(
      <MockedProvider
        defaultOptions={{
          watchQuery: { fetchPolicy: "no-cache" },
          query: { fetchPolicy: "no-cache" }
        }}
        mocks={[mocks]}
        cache={signedInUserCache}
        addTypename={false}
      >
        <AboutUserPage />
      </MockedProvider>
    )

    const loading = getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitForElementToBeRemoved(loading).then(() => {
      const userHeadingel = getByText(/user/i)
      expect(userHeadingel).toBeInTheDocument()
    })
  })
})
