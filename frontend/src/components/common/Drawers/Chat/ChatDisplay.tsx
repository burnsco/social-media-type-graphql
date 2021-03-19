import { gql, useQuery } from "@apollo/client"
import React from "react"
import ChatList from "./ChatList"

const CHAT_ROOM_MESSAGES_SUBSCRIPTION = gql`
  subscription NewChatMessage {
    newMessage {
      id
      content
      createdAt

      sentBy {
        id
        username
      }
    }
  }
`

export const CHAT_ROOM_MESSAGES_QUERY = gql`
  query {
    messages {
      id
      content
      createdAt

      sentBy {
        id
        username
      }
    }
  }
`

export default function ChatDisplay() {
  const { subscribeToMore, ...result } = useQuery(CHAT_ROOM_MESSAGES_QUERY)

  if (subscribeToMore !== undefined) {
    return (
      <ChatList
        {...result}
        handleSubscription={() =>
          subscribeToMore({
            document: CHAT_ROOM_MESSAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newFeedItem = subscriptionData.data.newMessage
              return {
                ...prev,
                messages: [newFeedItem, { ...prev.messages }]
              }
            }
          })
        }
      />
    )
  }
  return null
}
