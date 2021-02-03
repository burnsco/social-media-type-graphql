import { Category } from "@/generated/graphql"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"
import merge from "deepmerge"
import isEqual from "lodash/isEqual"
import { useMemo } from "react"

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__"

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include"
  })

  const cacheOptions = new InMemoryCache({
    typePolicies: {
      Category: {
        merge: true
      },
      TotalVotes: {
        merge: true
      },
      Query: {
        fields: {
          posts: concatPagination(),
          categories: {
            keyArgs: [],
            merge(
              existing: Category[] | undefined,
              incoming: Category[]
            ): Category[] {
              return existing ? [...incoming, ...existing] : [...incoming]
            }
          }
        }
      }
    }
  })

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httpLink,
    cache: cacheOptions,
    resolvers: {
      Post: {
        _deleted: post => Boolean(post._deleted)
      }
    }
  })

  return client
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
