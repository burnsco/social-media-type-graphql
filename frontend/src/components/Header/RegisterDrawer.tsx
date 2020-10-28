import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
import { RegisterSchema } from "@/types/User/schemas"
import { RegisterUserInputType } from "@/types/User/types"
import { toErrorMap } from "@/utils/toErrorMap"
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
  useDisclosure,
  useToast
} from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"
import { ChakraField } from "../shared/ChakraField"
import { PasswordField } from "../shared/PasswordField"

function RegisterDrawer() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [register] = useRegisterMutation()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Button ref={btnRef} size="md" colorScheme="blue" onClick={onOpen}>
        Register
      </Button>
      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Join the Community!</DrawerHeader>
          <Formik
            initialValues={RegisterUserInputType}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
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
              if (response.data?.register?.user) {
                toast({
                  id: "success",
                  title: `Welcome ${response.data.register.user.username}!`,
                  description: "Your account was created successfully.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                })
                router.push("/")
              } else if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors))
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
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
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                        helperText="Must be 8-20 characters and cannot contain special characters."
                      />

                      <PasswordField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                      />
                    </Stack>
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
              )
            }}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default RegisterDrawer
