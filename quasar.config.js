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
                commentApp: "commentApp@http://localhost:8082/remoteEntry.js",
              },
              // Cấu hình ứng dụng con (remote) có tên là commentApp, với file entry là "remoteEntry.js". Khi cần tải module từ commentApp, Webpack sẽ tìm ở địa chỉ http://localhost:4300/remoteEntry.js.
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
