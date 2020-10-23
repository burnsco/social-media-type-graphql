import { ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { render, RenderOptions } from "@testing-library/react"
import { RouterContext } from "next/dist/next-server/lib/router-context"
import { NextRouter } from "next/router"
import * as React from "react"
export * from "@testing-library/react"
// override render method
export { customRender as render }

type DefaultParams = Parameters<typeof render>
type RenderUI = DefaultParams[0]
type RenderOptionz = DefaultParams[1] & { router?: Partial<NextRouter> }

const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
)

export function testRender(
  ui: RenderUI,
  { wrapper, router, ...options }: RenderOptionz = {}
) {
  if (!wrapper) {
    wrapper = ({ children }) => (
      <ChakraProvider resetCSS theme={theme}>
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
          {children}
        </RouterContext.Provider>
      </ChakraProvider>
    )
  }
  return customRender
}
