import { useEditUserMutation } from "@/generated/graphql"
import {
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
  Tabs
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import * as React from "react"
import * as Yup from "yup"

const ProfileSettingsPage: React.FunctionComponent = () => {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    about: "",
    avatar: ""
  }

  const [editUser, { loading, error }] = useEditUserMutation()

  if (loading) return null

  if (error) {
    console.log(error)
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          username: Yup.string().notRequired(),
          password: Yup.string().notRequired(),
          email: Yup.string().notRequired(),
          about: Yup.string().notRequired(),
          avatar: Yup.string().notRequired()
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            editUser({
              variables: {
                data: {
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  about: values.about,
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
                    <Tab>Profile</Tab>
                    <Tab>Account</Tab>
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
                              placeholder="Display Name"
                            />
                            <FormErrorMessage>
                              {form.errors.username}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel htmlFor="email"></FormLabel>
                            <Input {...field} id="email" placeholder="Email" />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
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
                      <Field name="about">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.about && form.touched.about}
                          >
                            <FormLabel htmlFor="about"></FormLabel>
                            <Input
                              {...field}
                              id="about"
                              placeholder="About Me (blurb)"
                            />
                            <FormErrorMessage>
                              {form.errors.about}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
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
                              placeholder="avatar"
                            />
                            <FormErrorMessage>
                              {form.errors.avatar}
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

export default ProfileSettingsPage
