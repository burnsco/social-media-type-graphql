import { Category } from "@/generated/graphql"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
  split
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { concatPagination, getMainDefinition } from "@apollo/client/utilities"
import { useMemo } from "react"
import { SubscriptionClient } from "subscriptions-transport-ws"

export const selectedChatRoomId: ReactiveVar<string> = makeVar<string>(
  "179e9376-828d-421f-a20d-fc8d9b9c7cf4"
)
export const selectedChatRoomName: ReactiveVar<string> = makeVar<string>(
  "react"
)

let apolloClient: ApolloClient<NormalizedCacheObject>
const WS_URI = `ws://localhost:4000/subscriptions`

function createApolloClient() {
  const ssrMode = typeof window === "undefined"
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include"
  })
  const cacheOptions = new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          category: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }
            }
          },
          totalVotes: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }
            }
          }
        }
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
          },
          selectedChatRoomId: {
            read() {
              return selectedChatRoomId()
            }
          },
          selecteChatRoomName: {
            read() {
              return selectedChatRoomName()
            }
          }
        }
      }
    }
  })

  if (ssrMode) {
    return new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: cacheOptions
    })
  }

  const client = new SubscriptionClient(WS_URI, {
    reconnect: true
  })

  const wsLink = new WebSocketLink(client)
  const link = process.browser
    ? split(
        ({ query }) => {
          const operations = getMainDefinition(query)
          return (
            operations.kind === "OperationDefinition" &&
            operations.operation === "subscription"
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  return new ApolloClient({
    ssrMode,
    link,
    cache: cacheOptions
  })
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
