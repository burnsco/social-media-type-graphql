import { ChakraField } from "@/components/shared/ChakraField"
import {
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import {
  Alert,
  Box,
  Button,
  FormControl,
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

const EditPostPage = () => {
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
    <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
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
                      <ChakraField
                        label=""
                        id="title"
                        placeholder="title"
                        aria-placeholder="post title"
                        name="title"
                      />
                      <ChakraField
                        label=""
                        id="text"
                        placeholder="text"
                        aria-placeholder="post text"
                        name="text"
                      />
                    </TabPanel>

                    <TabPanel>
                      <ChakraField
                        label=""
                        id="title"
                        placeholder="title"
                        aria-placeholder="post title"
                        name="title"
                      />
                      <ChakraField
                        label=""
                        id="link"
                        placeholder="link"
                        aria-placeholder="post link"
                        name="link"
                      />
                    </TabPanel>

                    <TabPanel>
                      <ChakraField
                        label=""
                        id="title"
                        placeholder="title"
                        aria-placeholder="post title"
                        name="title"
                      />
                      <ChakraField
                        label=""
                        id="image"
                        placeholder="image"
                        aria-placeholder="post image"
                        name="image"
                      />
                      <ChakraField
                        label=""
                        id="video"
                        placeholder="video"
                        aria-placeholder="post video"
                        name="video"
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Stack>
              <Button
                m={2}
                colorScheme="orange"
                isDisabled={formik.isSubmitting}
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

export default EditPostPage
