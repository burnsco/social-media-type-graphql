import * as Yup from "yup"

export const CreateCommentSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .trim()
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .trim()
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
})
