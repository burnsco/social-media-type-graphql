import { ApolloError } from "@apollo/client"
import { Alert, AlertIcon } from "@chakra-ui/core"

const AlertError: React.FC<{ error: ApolloError | undefined }> = ({
  error
}) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {error?.message}
    </Alert>
  )
}

export default AlertError
