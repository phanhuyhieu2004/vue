const { configure } = require('quasar/wrappers');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = configure(function (/* ctx */) {
  return {
    boot: [
      'keycloak',
    ],

    build: {
      vueRouterMode: "hash",
      chainWebpack(config) {
        config.optimization.delete("splitChunks");
        config
          .plugin("module-federation-plugin")
          .use(ModuleFederationPlugin, [
            {
              name: "commentApp",
              filename: "remoteEntry.js",
              exposes: {
               './VueAppLoader' : "./src/loader.js",
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
      transpileDependencies: ["vue"],
    },
    devServer: {
      port: 4300,
      open: true,
      headers: {
        "Access-Control-Allow-Origin": "*", // Hoặc cụ thể domain của bạn
      },
    },
  };
});
