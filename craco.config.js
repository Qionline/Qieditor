const path = require("path")

const CracoAlias = require("craco-alias")
const CracoAntDesignPlugin = require("craco-antd")
const WebpackBar = require("webpackbar")

// dev
process.env.BROWSER = "none"
process.env.PORT = 4399
// prod
process.env.GENERATE_SOURCEMAP = false

module.exports = {
  webpack: {
    plugins: [new WebpackBar({ name: "Qieditor", profile: true })],
  },
  // jest: {
  //   configure: {
  //     moduleNameMapper: {
  //       "^@(.*)$": "<rootDir>/src$1",
  //     },
  //   },
  // },
  plugins: [
    { plugin: CracoAntDesignPlugin },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./config/tsconfig.path.json",
      },
    },
  ],
}
