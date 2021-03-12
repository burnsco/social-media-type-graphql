import { ChakraField, PasswordField } from "@/components/common/index"
import { MeDocument, useRegisterMutation } from "@/generated/graphql"
import { RegisterSchema } from "@/types/User/schemas"
import { RegisterUserInputType } from "@/types/User/types"
import { convertToErrorMap } from "@/utils/index"
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
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"

function RegisterDrawer() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const colorScheme = useColorModeValue("purple", "blue")
  const [register] = useRegisterMutation()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Button
        ref={btnRef}
        size="md"
        colorScheme={useColorModeValue("purple", "orange")}
        onClick={onOpen}
      >
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
        <DrawerContent bg={useColorModeValue("whitesmoke", "gray.900")}>
          <DrawerCloseButton />
          <DrawerHeader>Join the Community!</DrawerHeader>
          <Formik
            initialValues={RegisterUserInputType}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: {
                  data: {
                    username: values.username,
                    email: values.email,
                    password: values.password
                  }
                },
                update: (cache, { data }) => {
                  cache.writeQuery({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.user
                    }
                  })
                }
              })

              if (response?.data?.register?.errors) {
                setErrors(convertToErrorMap(response?.data?.register?.errors))
              } else {
                toast({
                  id: `${response?.data?.register?.user?.username}-toast`,
                  title: `Welcome ${response?.data?.register?.user?.username}!`,
                  description: "Your account was created successfully.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                })
                router.push("/")
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
                    <Button
                      variant="solid"
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme={colorScheme}
                    >
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
