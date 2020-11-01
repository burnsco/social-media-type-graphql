import { Flex, useColorModeValue } from "@chakra-ui/core"
import dynamic from "next/dynamic"
import AuthMenu from "./Menu"

const CategoriesMenu = dynamic(() => import("./Center"))
const LogoSection = dynamic(() => import("./LogoSection"))

const Header = (props: any) => {
  const bg = useColorModeValue("white", "#202020")
  return (
    <Flex
      top="0"
      pos="fixed"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      boxShadow="base"
      width="full"
      as="header"
      p={2}
      align="center"
      {...props}
    >
      <Flex justify="space-between" width="98%">
        <LogoSection />
        <CategoriesMenu />
        <Flex flexGrow={1} maxW="720px" as="nav" justify="flex-end">
          <AuthMenu />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
