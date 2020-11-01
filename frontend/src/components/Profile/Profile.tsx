import { ChakraField } from "@/components/shared/ChakraField"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { Box, Button, useColorModeValue } from "@chakra-ui/core"
import { Form, Formik } from "formik"

const ProfilePage = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  const { data, loading } = useMeQuery()

  const [editUser, { loading: editUserLoading }] = useEditUserMutation()

  return (
    <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={4}>
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
  )
}

export default ProfilePage
