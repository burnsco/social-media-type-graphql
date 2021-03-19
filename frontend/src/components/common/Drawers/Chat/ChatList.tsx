import {
  Avatar,
  Box,
  List,
  ListItem,
  useSafeLayoutEffect
} from "@chakra-ui/react"
import React from "react"

export default function ChatList(props: any) {
  const { handleSubscription } = props
  const { data, loading } = props

  useSafeLayoutEffect(() => {
    handleSubscription()
  }, [handleSubscription])

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [data, data.messages])

  if (!loading && data && data.messages) {
    return (
      <Box overflowY="auto">
        <List mt={2} spacing={3}>
          {data.messages.map((message: any) => (
            <ListItem key={message.id}>
              <Avatar
                size="xs"
                name="Ryan Florence"
                src="https://bit.ly/ryan-florence"
                mr={3}
              />
              {message.content}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
    )
  }
  return <>No messages yet</>
}
