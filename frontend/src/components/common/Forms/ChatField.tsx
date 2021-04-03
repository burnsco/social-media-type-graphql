import { FormControl, FormLabel, Input, InputGroup } from "@chakra-ui/react"
import { useField } from "formik"

type ChakraFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  helperText?: string
  size?: string
}

const ChatField: React.FC<ChakraFieldProps> = ({
  label,
  type,
  size,
  helperText,
  ...props
}) => {
  const [field] = useField(props)

  return (
    <FormControl>
      <FormLabel fontSize={`${size}` || "sm"} htmlFor={props.name || props.id}>
        {label}
      </FormLabel>
      <InputGroup size="sm">
        <Input
          {...field}
          {...props}
          variant="unstyled"
          focusBorderColor="red.300"
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          id={field.name}
          placeholder={props.placeholder}
        />
      </InputGroup>
    </FormControl>
  )
}

export default ChatField
