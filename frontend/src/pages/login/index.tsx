import { Box, Button, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { Container } from "next/app"
import { useRouter } from "next/router"
import * as React from "react"
import { InputField } from "../../components/shared/InputField"
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from "../../generated/graphql"
import { RegisterSchema } from "../../utils/Schemas"

const LoginPage: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [register] = useRegisterMutation()

  return (
    <Container>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          const response = await register({
            variables: {
              data: {
                username: values.username,
                password: values.password,
                email: values.email,
              },
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              })
            },
          })

          if (response.data?.register?.user) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
            router.push("/")
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
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LoginPage
