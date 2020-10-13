import { FormLabel } from "@chakra-ui/core"
import { ErrorMessage, Field } from "formik"

type FieldSetProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
}

export const FieldSet: React.FC<FieldSetProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field id={name} name={name} {...props} />
      <ErrorMessage name={name} />
    </>
  )
}
