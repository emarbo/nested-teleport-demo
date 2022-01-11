const { defineConfig } = require("@vue/cli-service");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = defineConfig({
  chainWebpack: (webpackConfig) => {
    // We need to disable cache loader, otherwise the client build
    // will used cached components from the server build.
    // XXX: cache-loader is deprected in Webpack 5. So this should be useless once they fix the issue:
    // https://github.com/vuejs/vue-cli/issues/6350
    webpackConfig.module.rule("vue").uses.delete("cache-loader");
    webpackConfig.module.rule("js").uses.delete("cache-loader");
    webpackConfig.module.rule("ts").uses.delete("cache-loader");
    webpackConfig.module.rule("tsx").uses.delete("cache-loader");

    if (!process.env.SSR) {
      // Point entry to your app's client entry file
      webpackConfig.entry("app").clear().add("./src/client-entry.ts");
      return;
    }

    // Point entry to your app's server entry file
    webpackConfig.entry("app").clear().add("./src/server-entry.ts");

    // This allows webpack to handle dynamic imports in a Node-appropriate
    // fashion, and also tells `vue-loader` to emit server-oriented code when
    // compiling Vue components.
    webpackConfig.target("node");
    // This tells the server bundle to use Node-style exports
    webpackConfig.output.libraryTarget("commonjs2");

    webpackConfig
      .plugin("manifest")
      .use(new WebpackManifestPlugin({ fileName: "ssr-manifest.json" }));

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // Externalize app dependencies. This makes the server build much faster
    // and generates a smaller bundle file.

    // Do not externalize dependencies that need to be processed by webpack.
    // You should also whitelist deps that modify `global` (e.g. polyfills)
    webpackConfig.externals(
      nodeExternals({ allowlist: /\.(css|vue|ts|json5?|ya?ml)$/ })
    );

    webpackConfig.optimization.splitChunks(false).minimize(false);

    webpackConfig.plugins.delete("preload");
    webpackConfig.plugins.delete("prefetch");
    webpackConfig.plugins.delete("progress");
    webpackConfig.plugins.delete("friendly-errors");

    webpackConfig.plugin("limit").use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    );
  },
});
