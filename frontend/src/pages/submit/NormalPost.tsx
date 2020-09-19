import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/core"
import { PostInput, useCreatePostMutation } from "@generated/graphql"
import { Field, Formik } from "formik"
import { useRouter } from "next/router"
import * as React from "react"

const SubmitRegularPost: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [submitPost, { loading, error }] = useCreatePostMutation()

  if (error) {
    console.log(error)
  }
  if (loading) return null

  function validateTitle(value: string) {
    let error
    if (!value) {
      error = "Title is required"
    } else if (value.length < 2) {
      error = "Subreddit has to be at least 5 characters. "
    }
    return error
  }

  const handleSubmit = (values: PostInput) => {
    submitPost({
      variables: {
        data: {
          title: values.title,
          categoryId: values.categoryId
        }
      }
    })
  }

  return (
    <Box>
      <Formik
        initialValues={{ title: "", categoryId: 2 }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            handleSubmit(values)
          }, 1000)
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="title" validate={validateTitle}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <FormLabel htmlFor="title">Post Title</FormLabel>
                  <Input {...field} id="title" placeholder="title" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
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

export default SubmitRegularPost
