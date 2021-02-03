import { useDeletePostMutation } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
import { gql } from "@apollo/client"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { AiFillDelete } from "react-icons/ai"

const PostFragment = gql`
  fragment ClientBicycle on Bicycle {
    id
    title
    _deleted @client
  }
`

export const DeletePostDialog: React.FC<{
  postId?: string | null
}> = ({ postId }) => {
  const [deletePost, { client }] = useDeletePostMutation()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<null | HTMLButtonElement>(null)

  if (postId) {
    return (
      <>
        <IconButton
          onClick={() => setIsOpen(true)}
          size="xs"
          aria-label="Delete Post"
          icon={<AiFillDelete />}
        />

        <AlertDialog
          returnFocusOnClose={false}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                color="red.400"
                fontSize="lg"
                fontWeight="bold"
              >
                Delete Post
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You cannot undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    sleep(1000)
                    deletePost({
                      variables: {
                        data: {
                          postId
                        }
                      },
                      optimisticResponse: {
                        __typename: "Mutation",
                        deletePost: {
                          post: {
                            id: postId
                          }
                        }
                      },
                      update(_, { data }) {
                        if (data?.deletePost) {
                          const deletedPost = client.readFragment({
                            id: `Post:${postId}`,
                            fragment: PostFragment
                          })
                          if (deletedPost) {
                            client.writeFragment({
                              id: `Post:${data?.deletePost?.post?.id}`,
                              fragment: PostFragment,
                              data: {
                                ...deletedPost,
                                _deleted: true
                              }
                            })
                          }
                        }
                        return null
                      }
                    })
                    client.resetStore()
                    onClose()
                  }}
                  colorScheme="red"
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
  return null
}
