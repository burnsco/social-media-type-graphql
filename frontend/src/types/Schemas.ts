import * as Yup from "yup"

export const RegisterSchema = Yup.object({
  username: Yup.string()
    .min(2, "Must be at least 5 characters long")
    .max(15, "Must be 20 characters or less")
    .required("Required")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(4, "Must be at least 5 characters long")
    .max(15, "Must be 20 characters or less")
    .required("Required")
})

export const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email().required("Required")
})

export const CreatePostSchema = Yup.object().shape({
  categoryId: Yup.number().required("Required"),
  title: Yup.string().min(5).required("Required"),
  link: Yup.string().notRequired(),
  text: Yup.string().notRequired()
})

export const CreateSubredditSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
})

export const CreateCommentSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
})
