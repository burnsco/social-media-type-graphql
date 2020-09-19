import { gql } from "@apollo/client"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/core"
import { CategoryInput, useCreateSubredditMutation } from "@generated/graphql"
import { Field, Formik } from "formik"
import { useRouter } from "next/router"
import React from "react"

const CreateSubreddit: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [submitSubreddit, { loading, error }] = useCreateSubredditMutation()

  if (error) {
    console.log(error)
  }
  if (loading) return null

  function validateName(value: string) {
    let error
    if (!value) {
      error = "Name is required"
    } else if (value.length < 5) {
      error = "Subreddit has to be at least 5 characters. "
    }
    return error
  }

  const handleSubmit = (values: CategoryInput) => {
    submitSubreddit({
      variables: {
        data: {
          name: values.name
        }
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            categories(existingCategories = []) {
              const newCategoryRef = cache.writeFragment({
                data: data?.createCategory.category,
                fragment: gql`
                  fragment NewCategory on Category {
                    id
                    name
                  }
                `
              })
              return [newCategoryRef, ...existingCategories]
            }
          }
        })
      }
    })
  }

  return (
    <Box>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            handleSubmit(values)
          }, 1000)
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="name" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Subreddit Name/Title</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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

export default CreateSubreddit
