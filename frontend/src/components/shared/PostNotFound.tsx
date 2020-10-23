import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link
} from "@chakra-ui/core"
import { useRouter } from "next/router"

export const PostNotFound = () => {
  const router = useRouter()
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        There seems to be no post here!
      </AlertTitle>
      <AlertDescription mt={2} color="blue" maxWidth="sm">
        <Link href="#" onClick={() => router.back()}>
          Click here to go back
        </Link>
      </AlertDescription>
    </Alert>
  )
}
