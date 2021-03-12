import { useNewUserSubscription } from "@/generated/graphql"
import { useToast } from "@chakra-ui/react"
import { useLayoutEffect } from "react"

function NewUserNotfications() {
  const { data } = useNewUserSubscription()

  const toast = useToast()

  useLayoutEffect(() => {
    if (data && data.newUser && data.newUser.username) {
      const { username } = data.newUser
      toast({
        id: `${username}-toast-just-created`,
        title: `${username}`,
        description: "Has just joined the community!",
        status: "success",
        duration: 5000,
        isClosable: true
      })
    }
  }, [data, data?.newUser, data?.newUser.username, toast])
}

export default NewUserNotfications
