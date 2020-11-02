import * as Yup from "yup"

export const CreateCommentSchema = Yup.object().shape({
  body: Yup.string()
    .min(5, "Must be at least 5 characters.")
    .max(500, "Must be 500 characters or less.")
    .trim()
    .required("Comment is empty")
})
