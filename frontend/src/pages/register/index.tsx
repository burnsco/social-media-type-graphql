import { Wrapper } from "@/components/Layout/wrapper"
import { InputField } from "@/components/shared/InputField"
import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
import { Box, Button, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"

const RegisterPage: React.FC = () => {
  const toast = useToast()
  const [register, { data, loading, error }] = useRegisterMutation()

  if (loading) return null

  if (error) {
    console.log(error)
  }

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async values => {
          const response = await register({
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

          if (response.data?.register?.user) {
            toast({
              id: "success",
              title: `Welcome ${response.data.register.user.username}!`,
              description: "Your account was created successfully.",
              status: "success",
              duration: 9000,
              isClosable: true
            })
          } else if (response.data?.register.errors) {
            console.log(response.data?.register.errors)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Box my="2">
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box my="4">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
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
            {data?.register?.user ? "success" : null}
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default RegisterPage
