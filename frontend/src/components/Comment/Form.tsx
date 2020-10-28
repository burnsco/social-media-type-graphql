import { useCreateCommentMutation } from "@/generated/graphql"
import { gql } from "@apollo/client"
import {
  Alert,
  Box,
  Button,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/core"
import { Formik } from "formik"
import { ChakraField } from "../shared/ChakraField"

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
    <Box bg={bg} borderWidth="1px" rounded="md">
      <Skeleton isLoaded={!mutationLoading}>
        <Formik
          initialValues={{ body: "", postId }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false)
              handleSubmit(values)
            }, 1000)
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <ChakraField id="body" name="body" label="" textarea />
              <Button
                size="sm"
                colorScheme="orange"
                isDisabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
        {mutationError && <Alert>{mutationError.message}</Alert>}
      </Skeleton>
    </Box>
  )
}

export default SubmitCommentForm
