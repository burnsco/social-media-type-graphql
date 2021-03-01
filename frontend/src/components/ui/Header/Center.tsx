import { useCategoriesQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BsArrowDown, BsArrowLeft } from "react-icons/bs"
import { FaHome } from "react-icons/fa"

function HeaderNavigation() {
  const router = useRouter()

  const { loading, data } = useCategoriesQuery()

  const bg = useColorModeValue("white", "#202020")

  console.log(router)

  const renderPath = () => {
    if (router && router.pathname) {
      if (router.pathname === "/") {
        return "Home"
      } else {
        return `${router.query.category}`
      }
    }
    return "Home"
  }

  return (
    <Flex flexGrow={2}>
      <Menu closeOnSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              mr={4}
              maxW="280px"
              fontSize="sm"
              textAlign="left"
              w="full"
              leftIcon={<FaHome />}
              rightIcon={isOpen ? <BsArrowDown /> : <BsArrowLeft />}
              variant="outline"
            >
              {renderPath()}
            </MenuButton>
            {data && data.categories && (
              <MenuList minWidth="240px" opacity="0.7" bg={bg}>
                <MenuOptionGroup title="subreddits">
                  {data.categories.map((item, i) => (
                    <MenuItem
                      value={item.name}
                      key={`subreddit-center-menu-${item.id}-${i}`}
                      onClick={() => router.push(`/r/${item.name}`)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            )}
          </>
        )}
      </Menu>
    </Flex>
  )
}

export default HeaderNavigation
