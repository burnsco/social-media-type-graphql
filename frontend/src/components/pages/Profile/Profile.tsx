import { ChakraField } from "@/components/common/index"
import Layout from "@/components/ui/Layout"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { Box, Button, Spinner, useColorModeValue } from "@chakra-ui/react"
import { Form, Formik } from "formik"

const ProfilePage = () => {
  const bg = useColorModeValue("white", "#202020")

  const { data, loading } = useMeQuery()

  const [editUser, { loading: editUserLoading }] = useEditUserMutation()

  if (!loading) {
    return (
      <Layout title="My Profile">
        <Box shadow="sm" borderWidth="1px" rounded="md" p={4} bg={bg}>
          <Formik
            initialValues={{
              username: data?.me?.username ?? "",
              about: data?.me?.about ?? "",
              email: data?.me?.email ?? "",
              password: "",
              avatar: data?.me?.avatar ?? ""
            }}
            validationSchema={EditUserSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
              setTimeout(() => {
                editUser({
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
                  isDisabled={isSubmitting || editUserLoading}
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Layout>
    )
  }
  return <Spinner />
}

export default ProfilePage
