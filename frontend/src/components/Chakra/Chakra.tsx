import theme from "@/styles/theme"
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from "@chakra-ui/core"
import * as React from "react"

interface ChakraProps {
  cookies?: string
  children: React.ReactNode
}

export const Chakra = ({ children, cookies }: ChakraProps) => {
  return (
    <ChakraProvider
      resetCSS
      theme={theme}
      colorModeManager={
        cookies ? cookieStorageManager(cookies) : localStorageManager
      }
    >
      {children}
    </ChakraProvider>
  )
}
