import { gql } from '@apollo/client'
import { Button, useToast } from '@chakra-ui/core'
import { InputField } from '@components/shared/InputField'
import { useCreatePostMutation } from '@generated/graphql'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

const CreateImageOrVideoPost: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [submitPost] = useCreatePostMutation()

  return (
    <Formik
      initialValues={{ title: '', categoryId: 1 }}
      onSubmit={async (values) => {
        const response = await submitPost({
          variables: {
            data: {
              title: values.title,
              categoryId: values.categoryId
            }
          },
          update: (cache, { data }) => {
            cache.modify({
              fields: {
                posts(existingPosts = []) {
                  const newPostRef = cache.writeFragment({
                    data: data?.createPost,
                    fragment: gql`
                      fragment NewPost on Post {
                        id
                        title
                      }
                    `
                  })
                  return [...existingPosts, newPostRef]
                }
              }
            })
          }
        })

        if (response.data?.createPost.post) {
          toast({
            title: 'Success!',
            description: 'Your post has been submitted.',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
          router.push('/')
        } else if (response.data?.createPost.errors) {
          console.log(response.data?.createPost.errors)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name='title' placeholder='title' label='Title' />
          <Button
            mt={4}
            colorScheme='red'
            type='submit'
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CreateImageOrVideoPost
