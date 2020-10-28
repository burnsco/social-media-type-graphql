import { AlertError } from "@/components/shared/AlertError"
import { ChakraField } from "@/components/shared/ChakraField"
import { useCreateSubredditMutation } from "@/generated/graphql"
import { gql } from "@apollo/client"
import { Button, Skeleton, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useIsAuth } from "src/hooks/useIsAuth"
import * as Yup from "yup"

const CreateSubreddit: React.FC = () => {
  const toast = useToast()
  useIsAuth()
  const [
    submitSubreddit,
    { loading: mutationLoading, error: mutationError, data }
  ] = useCreateSubredditMutation()

  return (
    <>
      <Skeleton isLoaded={!mutationLoading}>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={Yup.object().shape({
            name: Yup.string().min(2).required("Required")
          })}
          onSubmit={async (values, actions) => {
            setTimeout(async () => {
              actions.setSubmitting(false)
              await submitSubreddit({
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
      </Skeleton>
      {mutationError ? <AlertError error={mutationError.message} /> : null}
    </>
  )
}

export default CreateSubreddit
