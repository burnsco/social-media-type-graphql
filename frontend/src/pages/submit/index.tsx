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
  PostInput,
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@generated/graphql"
import { Field, Form, Formik } from "formik"
import * as React from "react"
import * as Yup from "yup"
import { postTypes } from "./postTypes"

const SubmitPage: React.FunctionComponent = () => {
  const [
    getSubreddits,
    { data, loading: loadingSubreddits, error: subredditError }
  ] = useCategoriesLazyQuery()
  const [tabIndex, setTabIndex] = React.useState(0)
  const [submitPost, { loading, error }] = useCreatePostMutation()

  if (loading || loadingSubreddits) return null
  if (subredditError) {
    console.log(subredditError)
  }
  if (error) {
    console.log(error)
  }

  const handleSubmit = (values: PostInput) => {
    submitPost({
      variables: {
        data: {
          title: values.title,
          text: values.text,
          categoryId: Number(values.categoryId)
        }
      }
    })
  }

  const formValues = postTypes[tabIndex]
  console.log(formValues)
  return (
    <Box>
      <Formik
        initialValues={{ formValues }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Required"),
          text: Yup.string().notRequired(),
          categoryId: Yup.number().required("Required")
        })}
        onSubmit={(values: PostInput, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            handleSubmit(values)
          }, 1000)
        }}
      >
        {props => (
          <Form>
            <Stack spacing={5}>
              <Field name="categoryId">
                {({ field }: any) => (
                  <FormControl id="categoryId">
                    <Select
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
                          value={subreddit.id}
                        >
                          {subreddit.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>

              <Tabs variant="enclosed" onChange={index => setTabIndex(index)}>
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
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
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
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SubmitPage
