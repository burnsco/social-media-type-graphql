import { Flex, Heading } from "@chakra-ui/core"
import { useRouter } from "next/router"
import Logo from "./Logo"

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

export default LogoSection
