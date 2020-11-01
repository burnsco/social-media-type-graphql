import { Flex, Heading, useColorModeValue } from "@chakra-ui/core"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import Logo from "./Logo"
import AuthMenu from "./Menu"

const CategoriesMenu = dynamic(() => import("./Center"))

const LogoSection = () => {
  const router = useRouter()

  return (
    <Flex cursor="pointer" flexGrow={1} onClick={() => router.push("/")}>
      <Flex
        onClick={() => router.push("/")}
        aria-label="Home"
        align="center"
        mx="1em"
        p={1}
      >
        <Logo mr={2} />{" "}
        <Heading
          mr={4}
          display={{ base: "none", md: "flex" }}
          size="md"
          fontWeight="bold"
        >
          reddit
        </Heading>
      </Flex>
    </Flex>
  )
}

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
      borderBottomWidth="1px"
      width="full"
      as="header"
      p={1}
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
