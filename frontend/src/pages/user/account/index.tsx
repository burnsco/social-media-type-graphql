import { EditUserField } from "@/components/shared/EditUserField"
import { PasswordField } from "@/components/shared/PasswordField"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { toErrorMap } from "@/utils/toErrorMap"
import { Alert, Box, Button, useColorModeValue, VStack } from "@chakra-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"

const AccountPage = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  const { data, loading } = useMeQuery({ ssr: false })

  const [editUser, { loading: editLoading, error }] = useEditUserMutation()

  if (error) return <Alert>{error.message}</Alert>

  if (loading || editLoading) return null

  return (
    <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={3}>
      <Formik
        initialValues={{
          username: data?.me?.username ?? "",
          about: data?.me?.about ?? "",
          email: data?.me?.email,
          password: "",
          avatar: ""
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().notRequired(),
          username: Yup.string().notRequired(),
          about: Yup.string().notRequired(),
          email: Yup.string().notRequired(),
          password: Yup.string().notRequired(),
          avatar: Yup.string().notRequired()
        })}
        onSubmit={async (values, actions) => {
          setTimeout(async () => {
            actions.setSubmitting(false)
            const response = await editUser({
              variables: {
                data: {
                  username: values.username,
                  about: values.about,
                  email: values.email,
                  password: values.password,
                  avatar: values.avatar
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

export default AccountPage
