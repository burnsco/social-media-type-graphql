import * as Yup from 'yup'
import { LoginInput } from '../inputs/user-input'

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

export async function validateLoginUser(data: LoginInput) {
  try {
    await LoginSchema.validate(data)
    return null
  } catch (err) {
    return [
      {
        field: `${err.path}`,
        message: `${err.message}`,
      },
    ]
  }
}
