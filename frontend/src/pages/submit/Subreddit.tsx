import { ChakraField } from "@/components/shared/ChakraField"
import { useCreateSubredditMutation } from "@/generated/graphql"
import { useIsAuth } from "@/utils/useIsAuth"
import { gql } from "@apollo/client"
import { Box, Button, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import * as Yup from "yup"
interface CreateSubredditProps {
  name: string
}

const CreateSubreddit: React.FC = () => {
  const toast = useToast()
  useIsAuth()
  const [
    submitSubreddit,
    { loading: mutationLoading, error: mutationError, data }
  ] = useCreateSubredditMutation()

  const handleSubmit = async (values, actions) => {
    const response = await submitSubreddit({
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

  if (mutationLoading) return <div>checking...</div>
  if (mutationError) {
    console.log(mutationError)
  }

  return (
    <Box>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(2).required("Required")
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            handleSubmit(values, actions)
          }, 1000)
        }}
      >
        {props => (
          <Form>
            <ChakraField
              name="name"
              type="text"
              placeholder="enter your desired subreddit"
              label="Name"
            />
            <Button
              type="submit"
              disabled={props.isSubmitting}
              isLoading={props.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default CreateSubreddit
