import { ChakraField } from "@/components/common/index"
import { User, useSendMessageMutation } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  chakra,
  IconButton,
  Tooltip
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { FC, useRef, useState } from "react"
import { RiMailSendLine } from "react-icons/ri"

const MessageUser: FC<Partial<User>> = user => {
  const [sendMessage, { loading }] = useSendMessageMutation()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<null | HTMLButtonElement>(null)

  if (user) {
    return (
      <>
        <Tooltip
          hasArrow
          label="Send Message"
          fontSize="md"
          bg="black"
          color="whitesmoke"
        >
          <chakra.span>
            <IconButton
              onClick={() => setIsOpen(true)}
              size="xs"
              aria-label={`Message ${user.username}`}
              icon={<RiMailSendLine />}
            />
          </chakra.span>
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
                Message ${user.username}
              </AlertDialogHeader>

              <Formik
                initialValues={{ content: "" }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(false)
                  sleep(1000)
                  await sendMessage({
                    variables: {
                      data: {
                        userId: user.id as string,
                        content: values.content
                      }
                    }
                  })
                }}
              >
                <Form>
                  <AlertDialogBody>
                    <ChakraField id="content" name="content" label="Message" />
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={loading}
                      colorScheme="red"
                      ml={3}
                    >
                      Send
                    </Button>
                  </AlertDialogFooter>
                </Form>
              </Formik>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
  return null
}

export default MessageUser
