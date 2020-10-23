import { Alert, AlertIcon } from "@chakra-ui/core"
import React from "react"

export const AlertError: React.FC<{ error: string }> = ({ error }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  )
}
