import { useCreateSubredditMutation, useMeQuery } from "@/generated/graphql"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton
} from "@chakra-ui/core"
import { Field, Formik } from "formik"
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as Yup from "yup"
interface CreateSubredditProps {
  name: string
}

const CreateSubreddit: React.FC = () => {
  const router = useRouter()
  const {
    data: userData,
    loading: userLoading,
    error: userError
  } = useMeQuery({ ssr: false })
  const [
    submitSubreddit,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateSubredditMutation()
  const user = userData?.me
  const shouldRedirect = !(userLoading || userError || user)

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/signin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect])

  const handleSubmit = (values: CreateSubredditProps) => {
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
      <Skeleton isLoaded={!mutationLoading}>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required")
          })}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false)
              handleSubmit(values)
            }, 1000)
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <Field name="name">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
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
        {mutationError && <p>Error: ( Please try again</p>}
      </Skeleton>
    </Box>
  )
}

export default CreateSubreddit
