import { theme as chakraTheme } from "@chakra-ui/theme"

const theme = {
  ...chakraTheme,
  styles: {
    global: (props: any) => ({
      "html, body": {
        fontSize: "sm",
        color: props.colorMode === "dark" ? "white" : "gray.600",
        lineHeight: "tall"
      },
      a: {
        color: props.colorMode === "dark" ? "teal.300" : "teal.500"
      }
    })
  }
}

export default theme
