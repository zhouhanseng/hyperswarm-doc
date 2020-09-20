const path = require("path");

module.exports = {
  publicRuntimeConfig: {
    localeSubpaths: {},
  },
  webpack(config, options) {
    if (!options.isServer && config.mode === "development") {
      const { I18NextHMRPlugin } = require("i18next-hmr/plugin");
      config.plugins.push(
        new I18NextHMRPlugin({
          localesDir: path.resolve(__dirname, "public/locales"),
        })
      );
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/useMemo",
        permanent: false,
      },
    ];
  },
};
