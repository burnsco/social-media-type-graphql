import { gql } from "@apollo/client"
import { Box, Button, FormControl, Textarea } from "@chakra-ui/core"
import { useCreateCommentMutation } from "@generated/graphql"
import { Field, Form, Formik } from "formik"
import * as React from "react"

const SubmitCommentForm = () => {
  const [submitComment, { data, loading, error }] = useCreateCommentMutation()

  if (loading) return null
  if (error) {
    console.log(error)
  }
  const postId = 1
  return (
    <Box>
      <Formik
        initialValues={{ body: "", postId: 1 }}
        onSubmit={async values => {
          await submitComment({
            variables: {
              data: {
                postId: values.postId,
                body: values.body
              }
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  comments(existingComments = [], { readField }) {
                    const newCommentRef = cache.writeFragment({
                      data: data?.createComment.comment,
                      fragment: gql`
                        fragment NewComment on Comment {
                          id
                          createdAt
                          body
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
        }}
      >
        {formik => (
          <Form>
            <Field name="body">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.body && form.touched.body}>
                  <Textarea {...field} id="body" placeholder="body" />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SubmitCommentForm
