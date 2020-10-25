const baseUrl = "https://github.com/burnsco/reddit-clone-type-graphql"

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} Corey Burns. All Rights Reserved.`,
  algolia: {
    apiKey: "936c5812ba626ab68c51b35b827c01a7",
    indexName: "reddit-clone",
    inputSelector: "#algolia-search"
  },
  author: {
    name: "Corey Burns",
    github: "https://github.com/burnsco",
    email: "coreymburns@gmail.com"
  },
  repo: {
    url: baseUrl
  },
  seo: {
    title: "Reddit Clone",
    titleTemplate: "%s - Reddit Clone",
    description:
      "A reddit clone using react, typescript, apollo, postgres and more!",
    siteUrl: "https://reddit-clone.com"
  }
}

export default siteConfig
