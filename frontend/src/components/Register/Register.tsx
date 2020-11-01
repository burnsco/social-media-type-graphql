import { Wrapper } from "@/components/Layout/wrapper"
import { ChakraField } from "@/components/shared/ChakraField"
import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
import { RegisterSchema } from "@/types/User/schemas"
import { RegisterUserInputType } from "@/types/User/types"
import { toErrorMap } from "@/utils/toErrorMap"
import { Box, Button, useColorModeValue, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import Layout from "../Layout/Layout"

const RegisterPage: React.FC = () => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const router = useRouter()
  const toast = useToast()
  const [register, { loading }] = useRegisterMutation()

  return (
    <Layout title="Register">
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
        <Wrapper variant="small">
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
            {({ isSubmitting }) => (
              <Form>
                <ChakraField name="email" placeholder="email" label="Email" />
                <Box my="4">
                  <ChakraField
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
                </Box>
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
                  isDisabled={loading || isSubmitting}
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

export default RegisterPage
