import { NextSeo } from "next-seo"
import siteConfig from "../../configs/site-config"

interface SEOProps {
  title?: string
  description?: string
}

const SEO: React.FC<SEOProps> = props => {
  if (props) {
    return (
      <NextSeo
        title={props.title}
        description={props.description}
        titleTemplate={siteConfig.seo.titleTemplate}
      />
    )
  }
  return null
}

export default SEO
