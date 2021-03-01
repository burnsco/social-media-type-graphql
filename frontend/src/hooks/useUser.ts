import { useMeLazyQuery } from "@/generated/graphql"

export const useUser = () => {
  const [fetchUser, { data, loading, error, client }] = useMeLazyQuery()

  return [fetchUser, client, data, loading, error]
}
