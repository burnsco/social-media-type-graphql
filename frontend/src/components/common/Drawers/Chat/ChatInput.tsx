import { InputField } from "@/components/common/index"
import { useCreateMessageMutation } from "@/generated/graphql"
import {
  Box,
  Button,
  HStack,
  useColorModeValue,
  VStack
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { selectedChatRoomId } from "../../../../lib/apolloClient"

export default function ChatInput() {
  const submitButtonColor = useColorModeValue("purple", "blue")

  const selectedCategoryId = selectedChatRoomId()
  const [submitMessage] = useCreateMessageMutation()

  const handleSubmitMessage = async (values: any, actions: any) => {
    const response = await submitMessage({
      variables: {
        data: { content: values.content, categoryId: selectedCategoryId }
      }
    })
    console.log(response)
    actions.resetForm()
    return response
  }

  return (
    <Box>
      <Formik initialValues={{ content: "" }} onSubmit={handleSubmitMessage}>
        <Form>
          <VStack w="full">
            <HStack w="full">
              <InputField
                label=""
                id="content"
                name="content"
                placeholder="chat here..."
              />

              <Button type="submit" colorScheme={submitButtonColor}>
                Submit
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Formik>
    </Box>
  )
}
