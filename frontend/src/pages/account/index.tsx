import { ChakraField } from "@/components/shared/ChakraField"
import { PasswordField } from "@/components/shared/PasswordField"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { Alert, Box, Button, useColorModeValue } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"
import * as Yup from "yup"

const AccountPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const bg = useColorModeValue("white", "#1A1A1B")

  const { data, loading } = useMeQuery()
  const [editUser, { loading: editLoading, error }] = useEditUserMutation()

  if (error) return <Alert>{error.message}</Alert>

  if (loading || editLoading) return null

  return (
    <Box bg={bg}>
      <Formik
        initialValues={{
          username: data?.me?.username,
          about: "",
          email: data?.me?.email,
          password: "",
          avatar: ""
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().notRequired(),
          username: Yup.string().notRequired(),
          about: Yup.string().notRequired(),
          email: Yup.string().notRequired(),
          password: Yup.string().notRequired(),
          avatar: Yup.string().notRequired()
        })}
        onSubmit={async (values, actions) => {
          setTimeout(async () => {
            actions.setSubmitting(false)
            await editUser({
              variables: {
                data: {
                  username: values.username,
                  about: values.about,
                  email: values.email,
                  password: values.password,
                  avatar: values.avatar
                }
              }
            })
          }, 1000)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ChakraField
              name="email"
              id="email"
              placeholder="email"
              label="Email"
            />
            <Box my="4">
              <ChakraField
                id="username"
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>

            <Box my="4">
              <ChakraField
                id="about"
                name="about"
                placeholder="about"
                label="About Me"
              />
            </Box>

            <Box my="4">
              <PasswordField
                id="password"
                name="password"
                placeholder="password"
                label="Password"
              />
            </Box>

            <Button
              mt={4}
              colorScheme="red"
              type="submit"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AccountPage
