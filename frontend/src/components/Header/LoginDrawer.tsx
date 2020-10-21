import { InputField } from "@/components/shared/InputField"
import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
import {
  Box,
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

function LoginDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [register, { data, loading, error }] = useRegisterMutation()

  const btnRef = useRef<HTMLButtonElement | null>(null)

  if (loading) return null

  if (error) {
    console.log(error)
  }

  return (
    <>
      <Button variant="outline" size="md" ref={btnRef} onClick={onOpen}>
        Login
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
              setTimeout(async () => {
                actions.setSubmitting(false)
                await register({
                  variables: {
                    data: {
                      username: values.username,
                      password: values.password,
                      email: values.email
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
              }, 1000)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <DrawerBody>
                  <InputField name="email" label="Email" />
                  <Box my="2">
                    <InputField name="username" label="Username" />
                  </Box>
                  <Box my="4">
                    <InputField
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Box>
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

export default LoginDrawer
