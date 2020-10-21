import { useCreateCommentMutation } from "@/generated/graphql"
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
  useColorModeValue
} from "@chakra-ui/core"
import { Field, Form, Formik, FormikValues } from "formik"
import { FaSpinner } from "react-icons/fa"
import * as Yup from "yup"

const SubmitCommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const [
    submitComment,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateCommentMutation()

  if (mutationLoading) return null
  if (mutationError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {mutationError.message}
      </Alert>
    )
  }

  return (
    <>
      <Box bg={bg} borderWidth="1px" rounded="md">
        <Formik
          initialValues={{ body: "", postId: postId }}
          validationSchema={Yup.object().shape({
            body: Yup.string()
              .min(5, "Must be at least 5 characters")
              .max(500, "Must be 500 or less characters")
              .required("Required"),
            postId: Yup.string().required()
          })}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false)
              submitComment({
                variables: {
                  data: { ...values }
                }
              })
            }, 1000)
          }}
        >
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <Field name="body">
                {({ field, form }: FormikValues) => (
                  <FormControl
                    isInvalid={form.errors.body && form.touched.body}
                  >
                    <Textarea
                      size="lg"
                      {...field}
                      id="body"
                      placeholder="enter comment here..."
                    />
                    <FormErrorMessage>{form.errors.body}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="orange"
                isLoading={formik.isSubmitting}
                spinner={<FaSpinner size={6} color="white" />}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default SubmitCommentForm
