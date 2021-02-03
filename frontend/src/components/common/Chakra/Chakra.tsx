import theme from "@/styles/theme"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import * as React from "react"

interface ChakraProps {
  cookies?: string
  children: React.ReactNode
}

const Chakra = ({ children }: ChakraProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode="dark" />
      {children}
    </ChakraProvider>
  )
}

export default Chakra
