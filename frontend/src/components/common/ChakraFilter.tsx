import { Input } from "@chakra-ui/core"
import { ChangeEvent, useState } from "react"
import { useCategoriesQuery } from "../../generated/graphql"

const ChakraFilter = () => {
  const [filter, setFilter] = useState("")
  const { loading, error, data, refetch } = useCategoriesQuery({
    variables: { name: filter }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
    refetch()
  }

  if (loading) return null
  if (error) {
    console.log(error)
  }

  return (
    <>
      <Input onChange={handleChange} placeholder="Filter" size="sm" />
    </>
  )
}

export default ChakraFilter
