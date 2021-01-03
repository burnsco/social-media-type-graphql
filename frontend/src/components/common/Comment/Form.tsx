import { InputField } from "@/components/common/index"
import { CommentInput, useCreateCommentMutation } from "@/generated/graphql"
import { gql } from "@apollo/client"
import { Alert, Box, Button, useColorModeValue } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import CreateCommentSchema from "../../../types/Comment/schemas"

const SubmitCommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const bg = useColorModeValue("white", "#202020")

  const [
    submitComment,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateCommentMutation()

  const handleSubmit = (values: CommentInput) => {
    submitComment({
      variables: {
        data: {
          postId: values.postId,
          body: values.body
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
  }

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
        onSubmit={(values, actions) => {
          actions.setSubmitting(false)
          setTimeout(() => {
            handleSubmit(values)
          }, 1000)
          actions.resetForm()
        }}
      >
        {formik => (
          <Form>
            <InputField id="body" name="body" label="" textarea />
            <Button
              size="sm"
              colorScheme="orange"
              isDisabled={formik.isSubmitting || mutationLoading}
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {mutationError && <Alert>{mutationError.message}</Alert>}
    </Box>
  )
}

export default SubmitCommentForm
