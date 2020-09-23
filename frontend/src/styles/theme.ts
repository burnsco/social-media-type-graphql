import { theme as chakraTheme } from "@chakra-ui/theme"

const theme = {
  ...chakraTheme,
  styles: {
    global: {
      html: {
        backgroundColor: "gray.200"
      }
    }
  }
}

export default theme
