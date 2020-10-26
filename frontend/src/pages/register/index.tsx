import { Wrapper } from "@/components/Layout/wrapper"
import { ChakraField } from "@/components/shared/ChakraField"
import SEO from "@/components/shared/seo"
import { MeDocument, MeQuery, useRegisterMutation } from "@/generated/graphql"
import { toErrorMap } from "@/utils/toErrorMap"
import { Box, Button, useToast } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from "yup"

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const toast = useToast()
  const [register, { data }] = useRegisterMutation()

  console.log(data)

  return (
    <>
      <SEO title="Register" description="Register here to post on the site." />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required")
          })}
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
            console.log(response)
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
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  )
}

export default RegisterPage
