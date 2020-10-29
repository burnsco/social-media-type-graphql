import { ChakraField } from "@/components/shared/ChakraField"
import { ChakraSelect } from "@/components/shared/ChakraSelect"
import {
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { CreatePostSchema } from "@/types/Post/schemas"
import { CreatePostInputType } from "@/types/Post/types"
import {
  Alert,
  Box,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useToast
} from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FaSpinner } from "react-icons/fa"
import { useIsAuth } from "src/hooks/useIsAuth"

const SubmitPage: React.FunctionComponent = () => {
  useIsAuth()

  const router = useRouter()
  const bg = useColorModeValue("white", "#1A1A1B")
  const toast = useToast()

  const [
    getSubreddits,
    { data, loading: loadingSubreddits, error: subredditError }
  ] = useCategoriesLazyQuery()

  const [submitPost, { loading }] = useCreatePostMutation()

  if (loadingSubreddits) return null
  if (loading) return <FaSpinner />

  if (subredditError) {
    return <Alert>{subredditError.message}</Alert>
  }

  return (
    <>
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
        <Formik
          initialValues={CreatePostInputType}
          validationSchema={CreatePostSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false)
            const response = await submitPost({
              variables: {
                data: {
                  ...values
                }
              },
              update: cache => {
                cache.evict({ fieldName: "posts:{}" })
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
              router.push("/")
            }
          }}
        >
          {formik => {
            return (
              <Form>
                <Stack spacing={5}>
                  <ChakraSelect
                    placeholder="Choose a community"
                    aria-label="Choose a community"
                    onMouseOver={() => getSubreddits()}
                    id="categoryId"
                    name="categoryId"
                    label=""
                  >
                    {data?.categories.map(subreddit => (
                      <option
                        key={`subreddit-${subreddit.name}-sidemenu`}
                        value={subreddit.id}
                      >
                        {subreddit.name}
                      </option>
                    ))}
                  </ChakraSelect>

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
                          aria-placeholder="post Title"
                          name="title"
                        />
                        <ChakraField
                          label=""
                          id="text"
                          placeholder="text"
                          aria-placeholder="post Text"
                          name="text"
                        />
                      </TabPanel>

                      <TabPanel>
                        <ChakraField
                          label=""
                          id="title"
                          name="title"
                          placeholder="title"
                          aria-placeholder="Post Title"
                        />
                        <ChakraField
                          label=""
                          id="link"
                          name="link"
                          placeholder="link"
                          aria-placeholder="Post Link"
                        />
                      </TabPanel>

                      <TabPanel>
                        <ChakraField
                          label=""
                          id="title"
                          name="title"
                          placeholder="title"
                          aria-placeholder="Post Title"
                        />
                        <ChakraField
                          label=""
                          id="image"
                          name="image"
                          placeholder="image"
                          aria-placeholder="Post Image"
                        />
                        <ChakraField
                          label=""
                          id="video"
                          name="video"
                          placeholder="video"
                          aria-placeholder="Post Video"
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
    </>
  )
}

export default SubmitPage
