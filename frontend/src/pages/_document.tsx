import { ColorModeScript } from "@chakra-ui/core"
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from "next/document"

class Document extends NextDocument {
  static getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
