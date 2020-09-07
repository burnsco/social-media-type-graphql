import { Box } from "@chakra-ui/core"
import * as React from "react"
interface Props {
  variant: "small" | "regular"
  children: React.ReactNode
}

export const Wrapper: React.FC<Props> = ({ children, variant = "regular" }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  )
}
