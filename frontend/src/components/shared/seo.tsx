import { NextSeo } from "next-seo"
import siteConfig from "../../configs/site-config"

const SEO = (props: { title: string; description: string }) => (
  <NextSeo
    title={props.title}
    description={props.description}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
)

export default SEO
