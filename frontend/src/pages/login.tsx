import { Box, Button, Link } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../components/shared/InputField'
import { Wrapper } from '../../components/Layout/wrapper'
import { toErrorMap } from '../../utils/toErrorMap'
import {
  MeDocument,
  MeQuery,
  useLogin_UserMutation
} from '../generated/graphql'

const Login: React.FC = () => {
  const router = useRouter()
  const [login, { error }] = useLogin_UserMutation()

  if (error) {
    console.log(error)
  }

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { email: values.email, password: values.password },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user
                }
              })
              cache.evict({ fieldName: 'posts:{}' })
            }
          })
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Box my="4">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Link href="/forgot-password">Forgot Password ?</Link>
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

export default Login
