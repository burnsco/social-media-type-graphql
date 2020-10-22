import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/core"
import { useField } from "formik"

type ChakraFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  size?: string
}

export const ChakraField: React.FC<ChakraFieldProps> = ({
  label,
  type,
  size,
  ...props
}) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize={`${size}` || "sm"} htmlFor={field.name}>
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
