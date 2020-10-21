import { InputField } from "@/components/shared/InputField"
import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
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
  FormControl,
  FormErrorMessage,
  useDisclosure
} from "@chakra-ui/core"
import { Field, Formik } from "formik"
import { useRef } from "react"
import * as Yup from "yup"

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
            {formik => {
              console.log(formik)
              return (
                <form onSubmit={formik.handleSubmit}>
                  <DrawerBody>
                    <Field name="email">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <InputField
                            id="email"
                            {...field}
                            name="email"
                            label="Email"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="username">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <InputField
                            id="username"
                            {...field}
                            name="username"
                            label="Username"
                          />
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <InputField
                            id="password"
                            {...field}
                            name="password"
                            label="Password"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={formik.isSubmitting}
                      color="blue"
                    >
                      Submit
                    </Button>
                  </DrawerFooter>
                </form>
              )
            }}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default RegisterDrawer
