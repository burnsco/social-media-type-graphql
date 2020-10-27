import { Alert, AlertIcon } from "@chakra-ui/core"

export const AlertError: React.FC<{ error: string }> = ({ error }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  )
}
