import { Category, Post } from "@/generated/graphql"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { useMemo } from "react"

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include"
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const cacheOptions = new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          category: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }
            }
          }
        }
      },
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(existing: Post[] | undefined, incoming: Post[]): Post[] {
              return existing ? [...existing, ...incoming] : [...incoming]
            }
          },
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
    link: errorLink.concat(httpLink),
    cache: cacheOptions,
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" }
    }
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
