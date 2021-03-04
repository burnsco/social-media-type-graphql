import { EditUserField } from "@/components/common/index"
import { Layout } from "@/components/ui"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { convertToErrorMap } from "@/utils/index"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react"
import { Form, Formik } from "formik"

const AccountContent = (): JSX.Element => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const { data, loading: meQueryLoading } = useMeQuery()
  const [editUser, { loading: editUserLoading }] = useEditUserMutation()

  const accountFormData = [
    { id: "edit-user-username-field", field: "username", title: "Username" },
    {
      id: "edit-user-password-field",
      field: "password",
      title: "Password",
      type: "password"
    },
    {
      id: "edit-user-email-field",
      field: "email",
      title: "Email",
      type: "email"
    },
    { id: "edit-user-about-field", field: "about", title: "About" },
    { id: "edit-user-avatar-field", field: "avatar", title: "Avatar" }
  ]

  if (!meQueryLoading) {
    return (
      <Layout title="my account">
        <Container>
          <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={5}>
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
                actions.setSubmitting(false)
                setTimeout(async () => {
                  const response = await editUser({
                    variables: {
                      data: {
                        ...values
                      }
                    }
                  })
                  if (response.data?.editUser?.errors) {
                    actions.setErrors(
                      convertToErrorMap(response.data.editUser.errors)
                    )
                  }
                }, 1000)
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Accordion allowToggle>
                    {accountFormData.map(formItem => (
                      <AccordionItem key={formItem.id}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {formItem.title}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <EditUserField
                            name={formItem.field}
                            type={formItem.type || "text"}
                            id={formItem.field}
                            label=""
                          />
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>

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
        </Container>
      </Layout>
    )
  }
  return <Spinner />
}

export default AccountContent
