import { Box, Button, FormControl, Textarea } from "@chakra-ui/core"
import { PostQuery, useCreateCommentMutation } from "@generated/graphql"
import { Field, Form, Formik } from "formik"
import * as React from "react"

const SubmitCommentForm: React.FC<PostQuery> = ({ post }) => {
  const [submitComment, { loading, error }] = useCreateCommentMutation()

  if (loading) return null
  if (error) {
    console.log(error)
  }

  return (
    <Box>
      <Formik
        initialValues={{ body: "", postId: 1 }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            submitComment({
              variables: {
                data: {
                  postId: values.postId,
                  body: values.body
                }
              }
            })
          }, 1000)
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
