import { ChakraField, ChakraSelect } from "@/components/common/index"
import {
  CreatePostInput,
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { useIsAuth } from "@/hooks/useIsAuth"
import { CreatePostInputType } from "@/types/Post/types"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
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
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { ImPencil2 } from "react-icons/im"
import request from "superagent"

// TODO
// upload the video or image
// validate that is is uploaded
// send that public_id to the image/video value in formik

function CreatePostDrawer() {
  useIsAuth()

  const [uploadProgress, setUploadProgress] = useState(0)

  const [imageUrl, setImageUrl] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

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
        console.log(response)
        if (response.body.public_id) {
          setImageUrl(response.body.public_id)
        }
        // public_id
        // convert .jpg to .webp
        // add a srcSet in the image component
        // with jpg and webP
        if (error) {
          console.log(error)
        }
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
            onSubmit={(actions, values) => createPostHandler(actions, values)}
          >
            {formik => {
              console.log(formik)
              const test = formik.getFieldHelpers("image")
              console.log(test)
              if (videoUrl !== null) {
                test.setValue(videoUrl)
              }
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
                            <div
                              {...getRootProps({
                                onClick: e => console.log(e)
                              })}
                            >
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
                                <input
                                  {...getInputProps({
                                    onDrop: e => console.log(e)
                                  })}
                                />
                                <ChakraField
                                  label=""
                                  id="video"
                                  name="video"
                                  placeholder="video"
                                  aria-placeholder="Post Video"
                                />
                                <input
                                  {...getInputProps({
                                    onDrop: e => console.log(e)
                                  })}
                                />
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
