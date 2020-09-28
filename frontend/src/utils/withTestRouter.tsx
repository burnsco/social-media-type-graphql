import { RouterContext } from "next/dist/next-server/lib/router-context"
import { NextRouter } from "next/router"
import React from "react"

export function withTestRouter(
  tree: React.ReactElement,
  router: Partial<NextRouter> = {}
) {
  const {
    route = "",
    pathname = "",
    query = {},
    asPath = "",
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null
    }
  } = router

  return (
    <RouterContext.Provider
      value={{
        basePath: "/",
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events
      }}
    >
      {tree}
    </RouterContext.Provider>
  )
}
