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
import { FiEdit } from "react-icons/fi"

export const EditPostDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<null | HTMLButtonElement>(null)

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        mr={2}
        variant="outline"
        size="xs"
        aria-label="Edit Post"
        icon={<FiEdit />}
      />

      <AlertDialog
        returnFocusOnClose={false}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader color="red.400" fontSize="lg" fontWeight="bold">
              Edit Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
