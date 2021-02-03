import { ChakraField } from "@/components/common/index"
import {
  useCategoriesQuery,
  useEditPostMutation,
  usePostQuery
} from "@/generated/graphql"
import { EditPostSchema } from "@/types/Post/schemas"
import {
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
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { ImSpinner5 } from "react-icons/im"

const EditPost = () => {
  const bg = useColorModeValue("white", "#1A1A1B")
  const toast = useToast()

  const router = useRouter()
  const postId = (router?.query?.id as string) ?? "1"

  const { data: categories } = useCategoriesQuery()

  const { data, loading: getPostLoading } = usePostQuery({
    variables: { postId }
  })
  const [editPost, { loading: editPostLoading }] = useEditPostMutation()

  if (getPostLoading) return <ImSpinner5 />

  if (data && data.post) {
    return (
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
        <Formik
          initialValues={{
            postId,
            categoryId: data?.post.category.id,
            title: data?.post.title,
            text: data?.post.text,
            link: data?.post.link,
            video: data?.post.video,
            image: data?.post.image
          }}
          validationSchema={EditPostSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false)
            const response = await editPost({
              variables: {
                data: {
                  ...values
                }
              }
            })
            if (response.data?.editPost.post) {
              toast({
                id: "success",
                title: `${response.data?.editPost?.post.title}!`,
                description: "Your post was submitted successfully.",
                status: "success",
                duration: 9000,
                isClosable: true
              })
            } else if (response.data?.editPost.errors) {
              toast({
                id: "error",
                title: `This was an error processing your post.`,
                description: `Please try again.`,
                status: "error",
                duration: 9000,
                isClosable: true
              })
            }
          }}
        >
          {formik => {
            if (categories) {
              return (
                <Form>
                  <Stack spacing={5}>
                    <Field name="categoryId">
                      {({ field }: any) => (
                        <FormControl id="categoryId">
                          <Select
                            aria-label="Choose a community"
                            onMouseOver={() => categories}
                            {...field}
                            isRequired
                            placeholder="Choose a community"
                            size="lg"
                            width="50%"
                          >
                            {categories?.categories?.map((subreddit): any => (
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
                    isDisabled={
                      formik.isSubmitting || getPostLoading || editPostLoading
                    }
                    isLoading={formik.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )
            }
            return null
          }}
        </Formik>
      </Box>
    )
  }
  return null
}

export default EditPost
