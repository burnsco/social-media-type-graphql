import { Button } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../components/shared/InputField'
import { Wrapper } from '../../components/Layout/wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'

const ForgotPassword: React.FC = () => {
  const router = useRouter()
  const [forgotPassword] = useForgotPasswordMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async values => {
          await forgotPassword({
            variables: { email: values.email }
          })
          router.push('/')
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
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

export default ForgotPassword
