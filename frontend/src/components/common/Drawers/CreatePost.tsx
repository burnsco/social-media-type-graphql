import { ChakraField, ChakraSelect } from "@/components/common/index"
import {
  CreatePostInput,
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { CreatePostInputType } from "@/types/Post/types"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Progress,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { BsPencilSquare } from "react-icons/bs"
import request from "superagent"

function CreatePostDrawer() {
  const [uploadProgress, setUploadProgress] = useState(0)

  const [imageUrl, setImageUrl] = useState(null)

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
          categoryId: values.categoryId,
          title: values.title,
          text: values.text,
          link: values.link,
          image: imageUrl
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

  const onDrop = useCallback(acceptedFile => {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dmztdsduf/upload"
    const cloudinaryPreset = "qapnebg6"

    request
      .post(cloudinaryUrl)
      .field("upload_preset", cloudinaryPreset)
      .field("file", acceptedFile)
      .field("multiple", false)
      .on("progress", progress => {
        console.log(progress)
        if (progress && progress.percent) {
          setUploadProgress(progress.percent)
        }
      })
      .end((error, response) => {
        if (error) {
          throw new Error(error.message)
        }

        setImageUrl(response.body.public_id)
      })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles
  } = useDropzone({
    onDrop,
    maxFiles: 1
  })

  return (
    <>
      <Tooltip
        hasArrow
        label="Create Post"
        fontSize="md"
        bg="black"
        color="whitesmoke"
      >
        <chakra.span>
          <IconButton
            variant="ghost"
            aria-label="Create a Post"
            icon={<BsPencilSquare size="1.5em" />}
            ref={btnRef}
            size="md"
            onClick={onOpen}
          />
        </chakra.span>
      </Tooltip>
      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("whitesmoke", "gray.900")}>
          <DrawerCloseButton />
          <DrawerHeader>Submit a Post!</DrawerHeader>
          <Formik
            initialValues={CreatePostInputType}
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
                            {isDragActive ? (
                              <p>Drop the files here ...</p>
                            ) : (
                              <p>
                                Drag and drop some files here, or click to
                                select files
                              </p>
                            )}
                            <div {...getRootProps({})}>
                              <Box
                                id="upload-media"
                                border="3px dashed"
                                p={4}
                                my={2}
                              >
                                <ChakraField
                                  label=""
                                  id="image"
                                  name="image"
                                  placeholder="image"
                                  aria-placeholder="Post Image"
                                />
                                <input {...getInputProps({})} />

                                {uploadProgress === 100 ? "COMPLETE" : null}

                                {uploadProgress !== 0 &&
                                uploadProgress !== 100 ? (
                                  <Progress
                                    my={4}
                                    size="lg"
                                    hasStripe
                                    value={uploadProgress}
                                  />
                                ) : null}
                              </Box>
                            </div>
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
                      colorScheme="orange"
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
