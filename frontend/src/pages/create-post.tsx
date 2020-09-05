import { gql } from '@apollo/client'
import { Button, Spinner } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/layout'
import { Wrapper } from '../components/layout/Wrapper'
import { InputField } from '../components/shared/InputField'
import { useMeQuery } from '../generated/graphql'

const CreatePost: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useMeQuery()
  const user = data?.me?.id
  const shouldRedirect = !(loading || error || user)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login')
    }
  }, [shouldRedirect])

  const [createPost] = useCreate

  if (user) {
    return (
      <Layout>
        <Wrapper variant="small">
          <Formik
            initialValues={{ title: '' }}
            onSubmit={async values => {
              await createPost({
                variables: {
                  data: {
                    title: values.title,
                    categoryId: 3
                  }
                },
                update: (cache, { data }) => {
                  cache.modify({
                    fields: {
                      posts(existingPosts = []) {
                        const newPostRef = cache.writeFragment({
                          data: data?.createPost,
                          fragment: gql`
                            fragment postInfo on Post {
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
              router.push('/')
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="title" placeholder="title" label="Title" />
                <Button
                  mt={4}
                  colorScheme="red"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Layout>
    )
  }
  return <Spinner />
}

export default CreatePost
