import Logo from "@/components/common/Logo"
import { Flex, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"

const LogoSection = () => {
  const router = useRouter()

  return (
    <Flex
      aria-label="Home"
      align="center"
      h="100%"
      px={4}
      flexGrow={1}
      display={{ base: "none", sm: "flex" }}
    >
      <Flex cursor="pointer" align="center" onClick={() => router.push("/")}>
        <Logo mr={2} />{" "}
        <Heading
          mr={4}
          display={{ base: "none", sm: "none", md: "flex" }}
          size="md"
          fontWeight="500"
        >
          reddit
        </Heading>
      </Flex>
    </Flex>
  )
}

export default LogoSection
