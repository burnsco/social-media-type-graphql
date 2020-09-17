import { Button, useToast } from '@chakra-ui/core'
import { Wrapper } from '@components/Layout/wrapper'
import { InputField } from '@components/shared/InputField'
import { useCreateSubredditMutation } from '@generated/graphql'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

const CreateSubreddit: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [submitSubreddit] = useCreateSubredditMutation()

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values) => {
          const response = await submitSubreddit({
            variables: {
              data: {
                name: values.name
              }
            }
          })

          if (response.data?.createCategory?.category) {
            toast({
              title: 'Success!',
              description: 'Your post has been submitted.',
              status: 'success',
              duration: 9000,
              isClosable: true
            })
            router.push('/')
          } else if (response.data?.createCategory.errors) {
            console.log(response.data?.createCategory.errors)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='name' placeholder='name' label='Subreddit Name' />
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
    </Wrapper>
  )
}

export default CreateSubreddit
