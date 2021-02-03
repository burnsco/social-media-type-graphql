import { ChakraField } from "@/components/common/index"
import { MeDocument, MeQuery, useLoginMutation } from "@/generated/graphql"
import { LoginSchema } from "@/types/User/schemas"
import { LoginUserInputType } from "@/types/User/types"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRef } from "react"

function LoginDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [login, { loading }] = useLoginMutation()

  const btnRef = useRef<HTMLButtonElement | null>(null)

  if (loading) return null

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
          <DrawerHeader>Login</DrawerHeader>
          <Formik
            initialValues={LoginUserInputType}
            validationSchema={LoginSchema}
            onSubmit={async (values, actions) => {
              setTimeout(async () => {
                actions.setSubmitting(false)
                await login({
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
                        me: data?.login.user
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
                  <Stack spacing={4}>
                    <ChakraField
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                    />

                    <ChakraField
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Stack>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    color="blue"
                  >
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
