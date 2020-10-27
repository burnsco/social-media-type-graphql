import * as Yup from "yup"

export const RegisterSchema = Yup.object({
  username: Yup.string()
    .min(2, "Must be at least 5 characters long")
    .max(15, "Must be 20 characters or less")
    .trim()
    .required("Required")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

  email: Yup.string().email().trim().required("Required"),
  password: Yup.string()
    .min(4, "Must be at least 5 characters long")
    .max(15, "Must be 20 characters or less")
    .trim()
    .required("Required")
})

export const LoginSchema = Yup.object().shape({
  password: Yup.string().trim().required("Required"),
  email: Yup.string().email().trim().required("Required")
})

export const CreatePostSchema = Yup.object().shape({
  categoryId: Yup.string().required(),
  title: Yup.string().min(5).trim().required("Required"),
  link: Yup.string().url().trim().notRequired(),
  text: Yup.string().min(5).trim().max(150).notRequired()
})

export const CreateSubredditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .trim()
    .required("Required")
})

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
