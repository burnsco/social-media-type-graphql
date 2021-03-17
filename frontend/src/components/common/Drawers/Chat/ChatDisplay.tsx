import { useChatRoomMessagesLazyQuery } from "@/generated/graphql"
import { useReactiveVar } from "@apollo/client"
import { Alert, Avatar, List, ListItem } from "@chakra-ui/react"
import { useEffect } from "react"
import { ImSpinner4 } from "react-icons/im"
import { selectedChatRoomId } from "../../../../lib/apolloClient"

export default function ChatDisplay() {
  const selectedCategoryId = useReactiveVar(selectedChatRoomId)

  const [
    fetchMessages,
    {
      data: messagesData,
      loading: loadingMessages,
      error: messagesError,
      subscribeToMore
    }
  ] = useChatRoomMessagesLazyQuery({
    variables: { categoryId: selectedCategoryId }
  })

  console.log("chat display")
  console.log(selectedCategoryId)

  useEffect(() => fetchMessages(), [fetchMessages, selectedCategoryId])

  if (messagesError) return <Alert>Error loading Messages</Alert>

  if (loadingMessages) return <ImSpinner4 />

  console.log(messagesData)

  return (
    <List mt={2} spacing={3}>
      {messagesData &&
      messagesData.category &&
      messagesData.category.messages ? (
        <>
          {messagesData.category.messages.map(message => (
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
        </>
      ) : null}
    </List>
  )
}
