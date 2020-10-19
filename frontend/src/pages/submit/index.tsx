import {
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { gql } from "@apollo/client"
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
  Tabs,
  useColorModeValue
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

const SubmitPage: React.FunctionComponent = () => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const initialValues = {
    userId: "",
    categoryId: "",
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

  const [submitPost, { loading, error }] = useCreatePostMutation()

  const handleSubmit = (values: any) => {
    submitPost({
      variables: {
        data: {
          ...values
        }
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            posts(existingPosts = []) {
              const newPostRef = cache.writeFragment({
                data: data?.createPost.post,
                fragment: gql`
                  fragment NewPost on Post {
                    id
                    title
                  }
                `
              })
              return [newPostRef, ...existingPosts]
            }
          }
        })
      }
    })
  }

  if (loading || loadingSubreddits) return null

  if (subredditError) {
    console.log(subredditError)
  }
  if (error) {
    console.log(error)
  }

  return (
    <Box bg={bg}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Required"),
          text: Yup.string().notRequired(),
          categoryId: Yup.number().required("Required")
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            handleSubmit(values)
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
                            <FormLabel htmlFor="regular-title"></FormLabel>
                            <Input
                              {...field}
                              id="regular-title"
                              placeholder="Title"
                            />
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
                            <FormLabel htmlFor="link-title"></FormLabel>
                            <Input
                              {...field}
                              id="link-title"
                              placeholder="Title"
                            />
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
                            <FormLabel htmlFor="media-title"></FormLabel>
                            <Input
                              {...field}
                              id="media-title"
                              placeholder="Title"
                            />
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

export default SubmitPage
