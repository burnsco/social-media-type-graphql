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
  const [field, { error, touched }] = useField(props)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize={`${size}` || "sm"} htmlFor={props.name || props.id}>
        {label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        type={type}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}
