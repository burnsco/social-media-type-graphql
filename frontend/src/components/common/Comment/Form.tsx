import { InputField } from "@/components/common/index"
import { useCreateCommentMutation } from "@/generated/graphql"
import CreateCommentSchema from "@/types/Comment/schemas"
import { gql } from "@apollo/client"
import { Box, Button, useColorModeValue, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"

const SubmitCommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const bg = useColorModeValue("white", "#202020")
  const toast = useToast()

  const [
    submitComment,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateCommentMutation()

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      rounded="md"
      p={3}
      _hover={{
        boxShadow: "lg",
        borderWidth: "1px",
        borderColor: useColorModeValue("gray.200", "gray.600")
      }}
    >
      <Formik
        initialValues={{ body: "", postId }}
        validationSchema={CreateCommentSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false)
          const response = await submitComment({
            variables: {
              data: {
                ...values
              }
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  comments(existingComments = []) {
                    const newCommentRef = cache.writeFragment({
                      data: data?.createComment?.comment,
                      fragment: gql`
                        fragment NewComment on Comment {
                          id
                          body
                          createdAt
                          updatedAt
                          createdBy {
                            id
                            username
                          }
                        }
                      `
                    })
                    return [newCommentRef, ...existingComments]
                  }
                }
              })
            }
          })
          if (response.data?.createComment?.comment) {
            toast({
              id: "success",
              title: "Your comment was posted successfully.",
              status: "success",
              duration: 9000,
              isClosable: true
            })
            actions.resetForm()
          }
        }}
      >
        {formik => (
          <Form>
            <InputField id="body" name="body" label="" textarea />
            <Button
              size="sm"
              colorScheme="orange"
              isLoading={mutationLoading || formik.isSubmitting}
              isDisabled={mutationLoading || formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {mutationError &&
        toast({
          id: "error",
          title: "An error occurred.",
          description: "There was an error trying to submit your comment",
          status: "error",
          duration: 9000,
          isClosable: true
        })}
    </Box>
  )
}

export default SubmitCommentForm
