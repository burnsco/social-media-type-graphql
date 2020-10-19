import { useCreateCommentMutation } from "@/generated/graphql"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  FormControl,
  Textarea,
  useColorModeValue
} from "@chakra-ui/core"
import { Field, Formik } from "formik"

interface CreateSubredditProps {
  postId: string
  body: string
}

const SubmitCommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const [
    submitComment,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateCommentMutation()

  if (mutationLoading) return null
  if (mutationError) {
    console.log(mutationError)
  }

  const handleSubmit = (values: CreateSubredditProps) => {
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
    <Box bg={bg} maxW="90%">
      <Formik
        initialValues={{ body: "", postId: postId }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            handleSubmit(values)
          }, 1000)
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Field name="body">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.body && form.touched.body}>
                  <Textarea {...field} id="body" placeholder="body" />
                </FormControl>
              )}
            </Field>
            <Button
              size="sm"
              colorScheme="orange"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default SubmitCommentForm
