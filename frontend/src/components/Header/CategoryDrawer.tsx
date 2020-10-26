import { useCreateSubredditMutation } from "@/generated/graphql"
import { toErrorMap } from "@/utils/toErrorMap"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/core"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"
import * as Yup from "yup"
import { ChakraField } from "../shared/ChakraField"

function CreateCategoryDrawer() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [createCategory] = useCreateSubredditMutation()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Button ref={btnRef} size="md" colorScheme="blue" onClick={onOpen}>
        Subreddit
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Subreddit Name: </DrawerHeader>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required")
            })}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(false)
              let response
              try {
                response = await createCategory({
                  variables: {
                    data: {
                      ...values
                    }
                  },
                  update(cache) {
                    cache.evict({ fieldName: "categories:{}" })
                  }
                })
              } catch (ex) {
                console.log(ex)
              }

              if (response?.data?.createCategory?.category) {
                toast({
                  id: "success",
                  title: `${response.data.createCategory.category.name}!`,
                  description:
                    "Your subreddit/category was created successfully.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                })
                onClose()
              } else if (response?.data?.createCategory.errors) {
                actions.setErrors(
                  toErrorMap(response.data.createCategory.errors)
                )
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <DrawerBody>
                    <ChakraField id="name" name="name" label="Name" />
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting} color="blue">
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

export default CreateCategoryDrawer
