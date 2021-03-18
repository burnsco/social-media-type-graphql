import { gql, useQuery, useReactiveVar } from "@apollo/client"
import { selectedChatRoomId } from "../../../../lib/apolloClient"
import ChatList from "./ChatList"

const CHAT_ROOM_MESSAGES_SUBSCRIPTION = gql`
  subscription NewChatMessage($categoryId: ID!) {
    newMessage(categoryId: $categoryId) {
      id
      content
      category {
        id
        name
      }
      sentBy {
        id
        username
      }
    }
  }
`

const CHAT_ROOM_MESSAGES_QUERY = gql`
  query ChatRoomMessages($categoryId: ID!) {
    category(categoryId: $categoryId) {
      createdAt
      id
      name
      messages {
        id
        createdAt
        content
        sentBy {
          id
          username
        }
      }
    }
  }
`

export default function ChatDisplay() {
  const selectedCategoryId = useReactiveVar(selectedChatRoomId)
  const { subscribeToMore, ...result } = useQuery(CHAT_ROOM_MESSAGES_QUERY, {
    variables: { categoryId: selectedCategoryId }
  })

  if (subscribeToMore !== undefined) {
    return (
      <ChatList
        {...result}
        handleSubscription={() =>
          subscribeToMore({
            document: CHAT_ROOM_MESSAGES_SUBSCRIPTION,
            variables: { categoryId: selectedCategoryId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newFeedItem = subscriptionData.data.newMessage
              return {
                ...prev,
                category: {
                  messages: [newFeedItem, ...prev.category.messages]
                }
              }
            }
          })
        }
      />
    )
  }
  return null
}
