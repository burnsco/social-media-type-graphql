import { Category } from "@/generated/graphql"
import { InMemoryCache } from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"
import { selectedChatRoomId, selectedChatRoomName } from "./apolloClient"

// ⚠️ Note: For the above to work properly, the data returned by the list query has to include all of the data the specific detail query needs. If the specific detail query fetches a field that the list query doesn't return, Apollo Client will consider the cache hit to be incomplete, and will attempt to fetch the full data set over the network (if network requests are enabled).

export const cacheOptions = new InMemoryCache({
  typePolicies: {
    // QUERIES \\
    Query: {
      fields: {
        // post(_, { args, toReference }) {
        //   return toReference({
        //     __typename: "Post",
        //     id: args?.id
        //   })
        // },

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
