const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

module.exports = withPlugins([[withBundleAnalyzer({})]])
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: "graphql-let/loader" }]
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader"
    })

    return config
  }
}
