import { Box } from "@chakra-ui/core"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box maxW="1200px" minH="100vh" mx={[2, 4, 6]}>
      {children}
    </Box>
  )
}

export default Layout
