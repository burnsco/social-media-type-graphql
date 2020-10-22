import { useCreateSubredditMutation } from "@/generated/graphql"
import { useIsAuth } from "@/utils/useIsAuth"
import { gql } from "@apollo/client"
import {
  Alert,
  AlertIcon,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRef } from "react"
import * as Yup from "yup"
import { ChakraField } from "../shared/ChakraField"

interface CreateSubredditProps {
  name: string
}

function CreateCategoryDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useIsAuth()
  const [
    submitSubreddit,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateSubredditMutation()

  const btnRef = useRef<HTMLButtonElement | null>(null)

  if (mutationLoading) return null
  if (mutationError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {mutationError.message}
      </Alert>
    )
  }

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
    <>
      <Button ref={btnRef} size="md" colorScheme="blue" onClick={onOpen}>
        Subreddit
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Subreddit Name: </DrawerHeader>
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
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <DrawerBody>
                  <ChakraField id="name" name="name" type="text" label="Name" />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSubmitting} color="blue">
                    Submit
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CreateCategoryDrawer
