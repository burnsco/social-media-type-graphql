import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Select
} from "@chakra-ui/react"
import { useField } from "formik"

type ChakraFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  label: string
  helperText?: string
  size?: string
}

const ChakraSelect: React.FC<ChakraFieldProps> = ({
  label,
  size,
  helperText,
  ...props
}) => {
  const [field, { error }] = useField(props)

  return (
    <FormControl id={props.id} isInvalid={!!error}>
      <Select
        {...field}
        {...props}
        aria-label={label ? label : `${props.id}-feedback ${props.id}-help`}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        id={field.name}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default ChakraSelect
