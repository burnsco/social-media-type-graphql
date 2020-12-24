import {
  chakra,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/core"
import { FaMoon, FaSun } from "react-icons/fa"
import NavSection from "./Center"
import LogoSection from "./Left"
import MenuIconsSection from "./Right"

const HeaderContent = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  return (
    <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
      <LogoSection />
      <NavSection />
      <MenuIconsSection />

      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        ml="3"
        onClick={toggleMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}

const Header = () => {
  const bg = useColorModeValue("white", "#202020")
  return (
    <chakra.header
      pos="fixed"
      top="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      boxShadow="base"
      width="full"
    >
      <chakra.div height="3.5rem" mx="auto" maxW="1200px">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header
