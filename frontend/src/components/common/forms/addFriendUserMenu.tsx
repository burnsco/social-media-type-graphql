import { useAddFriendMutation } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import { gql } from "@apollo/client"
import { Box, MenuItem, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { IoAddCircle } from "react-icons/io5"

export default function UserMenuDialog(username: string) {
  const bg = useColorModeValue("white", "#202020")
  const [addFriend, { loading }] = useAddFriendMutation()
  const [loggedInUser] = useLoggedInUser()

  return (
    <MenuItem
      onClick={async () => {
        let response
        try {
          response = await addFriend({
            variables: {
              data: {
                username
              }
            },
            update(cache, { data }) {
              if (loggedInUser) {
                cache.modify({
                  id: cache.identify(loggedInUser),
                  fields: {
                    friends(existingFriends = []) {
                      const newFriendRef = cache.writeFragment({
                        data: data?.addFriend.me,
                        fragment: gql`
                          fragment NewFriend on User {
                            id
                            username
                            online
                          }
                        `
                      })
                      return [newFriendRef, ...existingFriends]
                    }
                  }
                })
              }
              throw new Error("Something went wrong adding a friend")
            }
          })
        } catch (ex) {
          console.log(ex)
        }
      }}
    >
      <IoAddCircle />
      <Box ml={3}>Add to Friends</Box>
    </MenuItem>
  )
}
