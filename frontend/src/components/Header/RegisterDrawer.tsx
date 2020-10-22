import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
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

function RegisterDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [register, { data, loading, error }] = useRegisterMutation()

  const btnRef = useRef<HTMLButtonElement | null>(null)

  if (loading) return null
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    )
  }

  return (
    <>
      <Button ref={btnRef} size="md" colorScheme="blue" onClick={onOpen}>
        Register
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Register</DrawerHeader>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={Yup.object().shape({
              username: Yup.string().min(2).max(20).required(),
              email: Yup.string().email().required(),
              password: Yup.string().min(8).max(20).required()
            })}
            onSubmit={async (values, actions) => {
              await sleep(500)
              actions.setSubmitting(false)
              await register({
                variables: {
                  data: {
                    ...values
                  }
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.user
                    }
                  })
                }
              })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <DrawerBody>
                  <ChakraField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                  />
                  <ChakraField
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                  />
                  <ChakraField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                  />
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

export default RegisterDrawer
