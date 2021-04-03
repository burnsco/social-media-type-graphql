import { useReactiveVar } from "@apollo/client"
import { Avatar, Box, Code, List, ListItem, Stack } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useCategoryLazyQuery } from "../../../../generated/graphql"
import { selectedChatRoomId } from "../../../../lib/apolloClient"

export default function ChatUsers() {
  const chatId = useReactiveVar(selectedChatRoomId)
  const [getChatRoomUsers, { data, loading }] = useCategoryLazyQuery()

  useEffect(
    () => getChatRoomUsers({ variables: { categoryId: Number(chatId) } }),
    [getChatRoomUsers, chatId]
  )

  if (loading) return null

  if (data && data.category && data.category.chatUsers) {
    return (
      <Box overflowY="auto">
        <List mt={2} spacing={3}>
          {data.category.chatUsers.map((user: any) => (
            <ListItem key={`chat user ${user.username}`}>
              <Stack h="100%" direction="row">
                <Avatar
                  size="xs"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  mr={3}
                />
                <Code>{user.username}</Code>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  }
  return null
}
