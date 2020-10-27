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
import { FiEdit } from "react-icons/fi"

export const EditPostDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef<null | HTMLButtonElement>(null)

  return (
    <>
      <Tooltip
        placement="top"
        hasArrow
        label="Edit Post"
        bg="gray.200"
        color="black"
      >
        <IconButton
          onClick={() => setIsOpen(true)}
          mr={2}
          variant="outline"
          size="xs"
          aria-label="Edit Post"
          icon={<FiEdit />}
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
