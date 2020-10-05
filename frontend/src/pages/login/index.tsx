import { Box, Button, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import * as React from "react"
import { Wrapper } from "../../components/Layout/wrapper"
import { InputField } from "../../components/shared/InputField"
import { MeDocument, MeQuery } from "../../generated/graphql"

const LoginPage: React.FC = () => {
  const toast = useToast()
  const [login, { data, loading, error }] = useLoginMutation()

  if (loading) return null
  if (error) {
    console.log(error)
  }

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async values => {
          const response = await login({
            variables: {
              data: {
                email: values.email,
                password: values.password
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

          if (response.data?.login?.user) {
            toast({
              id: "success",
              title: `Welcome ${response.data.login.user.username}!`,
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
            {data?.login?.user ? "success" : null}
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default LoginPage
