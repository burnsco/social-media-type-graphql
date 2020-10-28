import { ChakraField } from "@/components/shared/ChakraField"
import { PasswordField } from "@/components/shared/PasswordField"
import SEO from "@/components/shared/seo"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { Alert, Box, Button, useColorModeValue } from "@chakra-ui/core"
import { Form, Formik } from "formik"

const AccountPage = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  const { data, loading } = useMeQuery()
  const [editUser, { loading: editLoading, error }] = useEditUserMutation()

  if (error) return <Alert>{error.message}</Alert>

  if (loading || editLoading) return null

  return (
    <>
      <SEO title="Account" description="User Account Settings Form" />
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={3}>
        <Formik
          initialValues={{
            username: data?.me?.username ?? "",
            about: "",
            email: data?.me?.email ?? "",
            password: "",
            avatar: ""
          }}
          validationSchema={EditUserSchema}
          onSubmit={async (values, actions) => {
            setTimeout(async () => {
              actions.setSubmitting(false)
              await editUser({
                variables: {
                  data: {
                    ...values
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
    </>
  )
}

export default AccountPage
