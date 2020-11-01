import { Category } from "@/generated/graphql"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"
import { useMemo } from "react"

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include"
  })

  const cacheOptions = new InMemoryCache({
    typePolicies: {
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
    cache: cacheOptions
  })

  return client
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  if (typeof window === "undefined") return _apolloClient

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
