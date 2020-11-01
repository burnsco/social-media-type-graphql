import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from "@chakra-ui/core"
import { ReactNode } from "react"
import theme from "../../styles/theme"

interface ChakraProps {
  cookies?: string
  children: ReactNode
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
