import { useCategoriesLazyQuery } from "@/generated/graphql"
import { useEffect } from "react"

export const useGetSubreddits = () => {
  const [getSubreddits, { data }] = useCategoriesLazyQuery()

  useEffect(() => {
    getSubreddits()
  }, [getSubreddits])
  if (data && data.categories) {
    return data.categories
  }
  return null
}
