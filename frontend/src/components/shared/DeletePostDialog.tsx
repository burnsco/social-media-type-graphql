import { useDeletePostMutation } from "@/generated/graphql"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Tooltip
} from "@chakra-ui/core"
import * as React from "react"
import { AiFillDelete } from "react-icons/ai"

export const DeletePostDialog: React.FC<{ postId?: string }> = ({ postId }) => {
  const [deletePost] = useDeletePostMutation()
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef<null | HTMLButtonElement>(null)

  if (postId) {
    return (
      <>
        <Tooltip
          placement="top"
          hasArrow
          label="Delete Post"
          bg="gray.200"
          color="black"
        >
          <IconButton
            onClick={() => setIsOpen(true)}
            variant="outline"
            size="xs"
            aria-label="Delete Post"
            icon={<AiFillDelete />}
          />
        </Tooltip>

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
                    console.log("delete post")
                    deletePost({
                      variables: {
                        data: {
                          postId
                        }
                      },
                      update(cache, { data }) {
                        if (data?.deletePost) {
                          cache.evict({ id: "Post:" + postId })
                        }
                        return null
                      }
                    })
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
