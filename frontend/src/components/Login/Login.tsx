import Layout from "@/components/Layout"
import { Wrapper } from "@/components/Layout/wrapper"
import { ChakraField } from "@/components/shared/ChakraField"
import { MeDocument, MeQuery, useLoginMutation } from "@/generated/graphql"
import { LoginSchema } from "@/types/User/schemas"
import { LoginUserInputType } from "@/types/User/types"
import { toErrorMap } from "@/utils/toErrorMap"
import {
  Box,
  Button,
  useColorModeValue,
  useToast,
  VisuallyHidden
} from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"

const LoginPage: React.FC = (): JSX.Element => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const router = useRouter()
  const toast = useToast()
  const [Login, { loading: loginAttempt }] = useLoginMutation()

  if (loginAttempt) return <VisuallyHidden>Attempting to Login</VisuallyHidden>

  return (
    <Layout title="Login">
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
        <Wrapper variant="small">
          <Formik
            initialValues={LoginUserInputType}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setErrors }) => {
              const response = await Login({
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
              if (response.data?.login?.user) {
                toast({
                  id: "success",
                  title: `Welcome ${response.data.login.user.username}!`,
                  description: "Your account was created successfully.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                })
                router.push("/")
              } else if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors))
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ChakraField name="email" placeholder="email" label="Email" />
                <Box my="4">
                  <ChakraField
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
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Box>
    </Layout>
  )
}

export default LoginPage
