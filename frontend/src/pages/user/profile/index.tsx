import { ChakraField } from "@/components/shared/ChakraField"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { Alert, Box, Button, Heading, useColorModeValue } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const bg = useColorModeValue("white", "#1A1A1B")

  const { data, loading } = useMeQuery()
  const [editUser, { loading: editLoading, error }] = useEditUserMutation()

  if (error) return <Alert>{error.message}</Alert>

  if (loading || editLoading) return null

  return (
    <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={4}>
      <Heading>Profile</Heading>
      <Formik
        initialValues={{
          username: data?.me?.username ?? "",
          about: data?.me?.about ?? "",
          email: data?.me?.email ?? "",
          password: "",
          avatar: data?.me?.avatar ?? ""
        }}
        validationSchema={EditUserSchema}
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
            <Box my="4">
              <ChakraField
                id="about"
                name="about"
                placeholder="about"
                label="About Me"
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

export default ProfilePage
