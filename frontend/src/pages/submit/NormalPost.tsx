import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/core"
import { Field, Form } from "formik"
import * as React from "react"

const SubmitRegularPost: React.FC = () => {
  return (
    <Box>
      {(props: any) => (
        <Form onSubmit={props.handleSubmit}>
          <Field name="title">
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
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
        </Form>
      )}
    </Box>
  )
}

export default SubmitRegularPost
