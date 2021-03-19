import { Category } from "@/generated/graphql"
import { InMemoryCache } from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"
import { selectedChatRoomId, selectedChatRoomName } from "./apolloClient"

export const cacheOptions = new InMemoryCache({
  typePolicies: {
    // QUERIES \\
    Query: {
      fields: {
        post(_, { args, toReference }) {
          return toReference({
            __typename: "Post",
            id: args.id
          })
        },

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
    },
    // ENTITIES \\
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
    Category: {
      fields: {
        messages: {
          merge(existing, incoming) {
            return { ...existing, ...incoming }
          }
        }
      }
    }
  }
})
