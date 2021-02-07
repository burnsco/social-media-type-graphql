import { ChakraField, ChakraSelect } from "@/components/common/index"
import {
  CreatePostInput,
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { useIsAuth } from "@/hooks/useIsAuth"
import { CreatePostSchema } from "@/types/Post/schemas"
import { CreatePostInputType } from "@/types/Post/types"
import { gql } from "@apollo/client"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"
import { ImPencil2 } from "react-icons/im"

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dmztdsduf/upload"
const cloudinaryPreset = "qapnebg6"

function CreatePostDrawer() {
  useIsAuth()

  const router = useRouter()
  const toast = useToast()

  const [getSubreddits, { data }] = useCategoriesLazyQuery()
  const [submitPost, { loading }] = useCreatePostMutation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const createPostHandler = async (
    values: typeof CreatePostInputType,
    actions: FormikHelpers<CreatePostInput>
  ) => {
    actions.setSubmitting(false)
    const response = await submitPost({
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
    if (response.data?.createPost.post) {
      toast({
        id: `success-${response.data?.createPost.post.title}`,
        title: `${response.data?.createPost?.post.title}!`,
        description: "Your post was submitted successfully.",
        status: "success",
        duration: 9000,
        isClosable: true
      })
      router.push("/")
      onClose()
    }
  }

  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="Create a Post"
        icon={<ImPencil2 />}
        ref={btnRef}
        size="md"
        onClick={onOpen}
      />

      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Submit a Post!</DrawerHeader>
          <Formik
            initialValues={CreatePostInputType}
            validationSchema={CreatePostSchema}
            onSubmit={(actions, values) => createPostHandler(actions, values)}
          >
            {formik => {
              return (
                <Form>
                  <DrawerBody>
                    <Stack spacing={5}>
                      <ChakraSelect
                        placeholder="Choose a community"
                        aria-label="Choose a community"
                        onMouseOver={() => getSubreddits()}
                        id="categoryId"
                        name="categoryId"
                        label=""
                      >
                        {data?.categories?.map(subreddit => (
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
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isDisabled={formik.isSubmitting || loading}
                      isLoading={formik.isSubmitting}
                      color="blue"
                    >
                      Submit
                    </Button>
                  </DrawerFooter>
                </Form>
              )
            }}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CreatePostDrawer
