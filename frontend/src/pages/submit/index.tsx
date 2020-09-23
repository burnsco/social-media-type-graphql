import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/core"
import {
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@generated/graphql"
import { Field, Form, Formik } from "formik"
import * as React from "react"
import * as Yup from "yup"

const SubmitPage: React.FunctionComponent = () => {
  const initialValues = {
    categoryId: undefined,
    title: "",
    text: "",
    link: "",
    video: "",
    image: ""
  }
  const [
    getSubreddits,
    { data, loading: loadingSubreddits, error: subredditError }
  ] = useCategoriesLazyQuery()

  const [snapShot, setSnapShot] = React.useState(initialValues)
  const [tabIndex, setTabIndex] = React.useState(0)

  const [submitPost, { loading, error }] = useCreatePostMutation()

  if (loading || loadingSubreddits) return null

  if (subredditError) {
    console.log(subredditError)
  }
  if (error) {
    console.log(error)
  }

  console.log(tabIndex)

  return (
    <Box>
      <Formik
        initialValues={snapShot}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Required"),
          text: Yup.string().notRequired(),
          categoryId: Yup.number().required("Required")
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            submitPost({
              variables: {
                data: {
                  title: values.title,
                  text: values.text,
                  video: values.video,
                  link: values.link,
                  image: values.image,
                  categoryId: Number(values.categoryId)
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
                <Field name="categoryId">
                  {({ field }: any) => (
                    <FormControl id="categoryId">
                      <Select
                        aria-label="Choose a community"
                        onMouseOver={() => getSubreddits()}
                        {...field}
                        isRequired
                        placeholder="Choose a community"
                        size="lg"
                        width="50%"
                      >
                        {data?.categories.map(subreddit => (
                          <option
                            key={`subreddit-${subreddit.name}-sidemenu`}
                            value={Number(subreddit.id)}
                          >
                            {subreddit.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>

                <Tabs
                  variant="enclosed"
                  onChange={() => {
                    formik.handleReset()
                  }}
                >
                  <TabList>
                    <Tab>Post</Tab>
                    <Tab>Link</Tab>
                    <Tab>Images & Video</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Field name="title">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.title && form.touched.title}
                          >
                            <FormLabel htmlFor="title"></FormLabel>
                            <Input {...field} id="title" placeholder="Title" />
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="text">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.text && form.touched.text}
                          >
                            <FormLabel htmlFor="text"></FormLabel>
                            <Input
                              {...field}
                              id="text"
                              placeholder="Text (optional)"
                            />
                            <FormErrorMessage>
                              {form.errors.text}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
                      <Field name="title">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.title && form.touched.title}
                          >
                            <FormLabel htmlFor="title"></FormLabel>
                            <Input {...field} id="title" placeholder="Title" />
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="link">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.link && form.touched.link}
                          >
                            <FormLabel htmlFor="link"></FormLabel>
                            <Input {...field} id="link" placeholder="Url" />
                            <FormErrorMessage>
                              {form.errors.link}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
                      <Field name="title">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.title && form.touched.title}
                          >
                            <FormLabel htmlFor="title"></FormLabel>
                            <Input {...field} id="title" placeholder="Title" />
                            <FormErrorMessage>
                              {form.errors.title}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="image">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.image && form.touched.image}
                          >
                            <FormLabel htmlFor="image"></FormLabel>
                            <Input {...field} id="image" placeholder="Image" />
                            <FormErrorMessage>
                              {form.errors.image}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="video">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.video && form.touched.video}
                          >
                            <FormLabel htmlFor="video"></FormLabel>
                            <Input {...field} id="video" placeholder="Video" />
                            <FormErrorMessage>
                              {form.errors.video}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>
                    <Button
                      m={2}
                      colorScheme="teal"
                      isLoading={formik.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </TabPanels>
                </Tabs>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default SubmitPage
