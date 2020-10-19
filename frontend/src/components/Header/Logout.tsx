import { useLogoutMutation } from "@/generated/graphql"
import { useApolloClient } from "@apollo/client"
import { Spinner } from "@chakra-ui/core"
import { useRouter } from "next/router"
import { useEffect } from "react"

function LogoutUser() {
  const client = useApolloClient()
  const router = useRouter()
  const [logout] = useLogoutMutation()

  useEffect(() => {
    logout().then(() => {
      client.resetStore().then(() => {
        router.push("/register")
      })
    })
  }, [logout, router, client])

  return <Spinner />
}

export default LogoutUser
