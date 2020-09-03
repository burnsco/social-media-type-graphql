import { gql } from '@apollo/client'
import { Button, Spinner } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { InputField } from '../../../components/InputField'
import Layout from '../../../components/Layout'
import { Wrapper } from '../../../components/wrapper'
import { useCreateSubredditMutation, useMeQuery } from '../generated/graphql'

const CreateSubreddit: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useMeQuery()
  const user = data?.me?.id
  const shouldRedirect = !(loading || error || user)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login')
    }
  }, [shouldRedirect])

  const [createSubreddit] = useCreateSubredditMutation()

  if (user) {
    return (
      <Layout>
        <Wrapper variant="small">
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async values => {
              await createSubreddit({
                variables: {
                  name: values.name
                },
                update: (cache, { data }) => {
                  cache.modify({
                    fields: {
                      posts(existingSubreddits = []) {
                        const newSubredditRef = cache.writeFragment({
                          data: data?.createSubreddit,
                          fragment: gql`
                            fragment postInfo on Subreddit {
                              id
                              name
                            }
                          `
                        })
                        return [...existingSubreddits, newSubredditRef]
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
                <InputField name="name" placeholder="name" label="Name" />
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

export default CreateSubreddit
