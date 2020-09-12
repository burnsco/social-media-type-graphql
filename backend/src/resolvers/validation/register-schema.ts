import * as Yup from "yup"
import { RegisterInput } from "../inputs/user-input"

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
})

export async function validateUser(data: RegisterInput) {
  try {
    await RegisterSchema.validate(data)
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
