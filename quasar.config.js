const { configure } = require('quasar/wrappers');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = configure(function (/* ctx */) {
  return {
    boot: [
      'keycloak',
    ],
    build: {
      chainWebpack(config) {
        config
          .plugin("module-federation-plugin")
          .use(ModuleFederationPlugin, [
            {
              name: "masterApp",
              remotes: {
                commentApp: "commentApp@http://localhost:4300/remoteEntry.js", // Kết nối với comment module
              },
              shared: {
                vue: {
                  singleton: true,
                  eager: true,
                },
              },
            },
          ]);
      },
    },

  };
});
