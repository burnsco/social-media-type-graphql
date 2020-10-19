import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/core"
import { useField } from "formik"

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  ...props
}) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize="sm" htmlFor={field.name}>
        {label}
      </FormLabel>
      <Input
        {...field}
        type={type}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}
