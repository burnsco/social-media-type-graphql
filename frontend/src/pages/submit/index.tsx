import {
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import {
  Alert,
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
  useColorModeValue,
  useToast
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import { FaSpinner } from "react-icons/fa"
import { useIsAuth } from "src/hooks/useIsAuth"
import * as Yup from "yup"

const SubmitPage: React.FunctionComponent = () => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const toast = useToast()

  useIsAuth()
  const [
    getSubreddits,
    { data, loading: loadingSubreddits, error: subredditError }
  ] = useCategoriesLazyQuery()

  const [submitPost, { loading, error: postError }] = useCreatePostMutation()

  if (postError) {
    return <Alert>{postError.message}</Alert>
  }

  if (loadingSubreddits) return null
  if (loading) return <FaSpinner />

  if (subredditError) {
    return <Alert>{subredditError.message}</Alert>
  }

  return (
    <Box bg={bg}>
      <Formik
        initialValues={{
          userId: "",
          categoryId: "",
          title: "",
          text: "",
          link: "",
          video: "",
          image: ""
        }}
        validationSchema={Yup.object().shape({
          categoryId: Yup.number().required("Required"),
          title: Yup.string().min(5).required("Required"),
          link: Yup.string().notRequired(),
          text: Yup.string().notRequired()
        })}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false)
          const response = await submitPost({
            variables: {
              data: {
                userId: values.userId,
                title: values.title,
                text: values.text,
                video: values.video,
                link: values.link,
                image: values.image,
                categoryId: values.categoryId
              }
            }
          })

          if (response.data?.createPost.post) {
            toast({
              id: "success",
              title: `${response.data?.createPost?.post.title}!`,
              description: "Your post was submitted successfully.",
              status: "success",
              duration: 9000,
              isClosable: true
            })
          } else if (response.data?.createPost.errors) {
            toast({
              id: "error",
              title: `This was an error processing your post.`,
              description: `Please try again.`,
              status: "error",
              duration: 9000,
              isClosable: true
            })
          } else {
            console.log("unknown error")
          }
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
