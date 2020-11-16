import Layout from "@/components/Layout"
import { EditUserField } from "@/components/shared/EditUserField"
import { PasswordField } from "@/components/shared/PasswordField"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { toErrorMap } from "@/utils/toErrorMap"
import { Box, Button, useColorModeValue, VStack } from "@chakra-ui/core"
import { Form, Formik } from "formik"

const AccountPageView = (): JSX.Element => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const { data, loading: meQueryLoading } = useMeQuery()
  const [editUser, { loading: editUserLoading }] = useEditUserMutation()

  return (
    <Layout title="My Account">
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={3}>
        <Formik
          initialValues={{
            username: data?.me?.username ?? "",
            about: data?.me?.about ?? "",
            email: data?.me?.email,
            password: "",
            avatar: ""
          }}
          validationSchema={EditUserSchema}
          onSubmit={async (values, actions) => {
            setTimeout(async () => {
              actions.setSubmitting(false)
              const response = await editUser({
                variables: {
                  data: {
                    ...values
                  }
                }
              })
              if (response.data?.editUser?.errors) {
                actions.setErrors(toErrorMap(response.data.editUser.errors))
              }
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack spacing={6}>
                <EditUserField
                  name="email"
                  id="email"
                  placeholder="email"
                  label="Email"
                />
                <EditUserField
                  id="username"
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <EditUserField
                  id="about"
                  name="about"
                  placeholder="about"
                  label="About"
                />
                <PasswordField
                  id="password"
                  name="password"
                  placeholder="password"
                  label="Password"
                />
              </VStack>
              <Button
                mt={4}
                colorScheme="red"
                type="submit"
                isDisabled={editUserLoading || meQueryLoading}
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

export default AccountPageView
