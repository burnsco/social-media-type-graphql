import { useEditUserMutation } from "@/generated/graphql"
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

const AccountPage: React.FunctionComponent = () => {
  const bg = useColorModeValue("white", "#1A1A1B")

  const [editUser, { loading, error }] = useEditUserMutation()

  if (error) return <Alert>{error.message}</Alert>

  if (loading) return null

  return (
    <Box bg={bg}>
      <Formik
        initialValues={{
          username: "",
          about: "",
          email: "",
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
            await editUser({
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
          }, 1000)
        }}
      >
        {formik => {
          return (
            <Form>
              <Stack spacing={5}>
                <Tabs
                  variant="enclosed"
                  onChange={() => {
                    formik.handleReset()
                  }}
                >
                  <TabList>
                    <Tab>User/Pass</Tab>
                    <Tab>About/Avatar</Tab>
                    <Tab>E-Mail</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Field name="username">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.username && form.touched.username
                            }
                          >
                            <FormLabel htmlFor="username"></FormLabel>
                            <Input
                              {...field}
                              id="username"
                              placeholder="Username"
                            />
                            <FormErrorMessage>
                              {form.errors.username}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="password">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          >
                            <FormLabel htmlFor="password"></FormLabel>
                            <Input
                              {...field}
                              id="password"
                              placeholder="Password"
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
                      <Field name="about">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.about && form.touched.about}
                          >
                            <FormLabel htmlFor="about"></FormLabel>
                            <Input
                              {...field}
                              id="about"
                              placeholder="About Me"
                            />
                            <FormErrorMessage>
                              {form.errors.about}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="avatar">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.avatar && form.touched.avatar
                            }
                          >
                            <FormLabel htmlFor="avatar"></FormLabel>
                            <Input
                              {...field}
                              id="avatar"
                              placeholder="Avatar Link"
                            />
                            <FormErrorMessage>
                              {form.errors.avatar}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
                      <Field name="email">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel htmlFor="email"></FormLabel>
                            <Input {...field} id="email" placeholder="E-Mail" />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
              <Button
                m={2}
                colorScheme="teal"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default AccountPage
