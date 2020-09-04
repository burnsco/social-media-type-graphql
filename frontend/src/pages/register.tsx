import { Box, Button, useToast } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { Wrapper } from '../components/Layout/Wrapper'
import { InputField } from '../components/shared/InputField'
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'

const Register: React.FC = () => {
  const toast = useToast()
  const router = useRouter()
  const [register] = useRegisterMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async values => {
          const response = await register({
            variables: {
              data: {
                username: values.username,
                password: values.password,
                email: values.email
              }
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register?.username
                }
              })
            }
          })

          if (response.data?.register?.username) {
            toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true
            })
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Box my="2">
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box my="4">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
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
  )
}

export default Register
