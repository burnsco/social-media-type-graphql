import { Box } from '@chakra-ui/core'
import React from 'react'
import App from '../../pages/_app'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <App>
      <Box maxW="1200px" minH="100vh" mx={[2, 4, 6]}>
        {children}
      </Box>
    </App>
  )
}

export default Layout
