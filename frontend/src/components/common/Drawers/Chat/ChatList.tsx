import {
  Avatar,
  Box,
  Code,
  Divider,
  List,
  ListItem,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react"
import React, { useEffect } from "react"

export default function ChatList(props: any) {
  const { handleSubscription } = props
  const { data, loading } = props

  useEffect(() => {
    handleSubscription()
  })

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [data])

  if (!loading && data && data.messages) {
    return (
      <Box overflowY="auto">
        <List mt={2} spacing={3}>
          {data.messages.map((message: any) => (
            <ListItem key={message.id}>
              <Stack h="100%" direction="row">
                <Avatar
                  size="xs"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  mr={3}
                />
                <Code>{message.sentBy.username}</Code>
                <Divider orientation="vertical" colorScheme="orange" />
                <Text>{message.content}</Text>
                <Spacer />
                <Box>{new Date(message.createdAt).toLocaleTimeString()}</Box>
              </Stack>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
    )
  }
  return <>No messages yet</>
}
