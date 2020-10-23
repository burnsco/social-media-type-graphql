import { useEffect } from "react"
import { useIsUserOrEmailTakenLazyQuery } from "../generated/graphql"

type UserEmailProps = {
  username?: string
  email?: string
}

export const useIsAvailable = ({ username, email }: UserEmailProps) => {
  const [checkAvail] = useIsUserOrEmailTakenLazyQuery()

  useEffect(() => {
    checkAvail()
  }, [username, email, checkAvail])
}
