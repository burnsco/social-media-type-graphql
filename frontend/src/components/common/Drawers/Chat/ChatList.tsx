import { Avatar, List, ListItem } from "@chakra-ui/react"
import { useEffect } from "react"

export default function ChatList(props: any) {
  const { handleSubscription } = props
  const { data, loading } = props

  useEffect(() => {
    handleSubscription()
  }, [handleSubscription])

  console.log("chat list component -->")
  console.log(data)
  console.log(handleSubscription)

  if (!loading && data) {
    return (
      <List mt={2} spacing={3}>
        {data.category.messages.map((message: any) => (
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
      </List>
    )
  }
  return null
}
