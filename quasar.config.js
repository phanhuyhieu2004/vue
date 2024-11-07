const { configure } = require('quasar/wrappers');
const { ModuleFederationPlugin } = require("webpack").container;
// Đây là plugin của Webpack cho phép tải các thành phần, thư viện hoặc cả ứng dụng từ các ứng dụng khác ngay tại thời điểm chạy, giúp hỗ trợ kiến trúc micro-frontend (nhiều ứng dụng con).
module.exports = configure(function (/* ctx */) {
  return {
    boot: [
      'keycloak',
    ],

    build: {
      vueRouterMode: "hash",
      // Chọn chế độ hash cho Vue Router, để các URL có dạng /#/ (ví dụ: http://example.com/#/route), thích hợp cho các ứng dụng không có quyền kiểm soát máy chủ.
      chainWebpack(config) {
        config.optimization.delete("splitChunks");
        // Xóa phần splitChunks để không tách các thành phần ra nhiều file JavaScript nhỏ. Điều này có thể hữu ích khi dùng Module Federation để tránh tách các thành phần trong các ứng dụng liên quan.
        config
          .plugin("module-federation-plugin")
        // thêm plugin này vào cấu hình Webpack
        // muốn cấu hình micro-frontend thông qua ModuleFederationPlugin, giúp tải hoặc chia sẻ các module từ ứng dụng khác.
          .use(ModuleFederationPlugin, [
            {
              name: "commentApp",
              filename: "remoteEntry.js",
              // Đặt tên file entry (điểm vào) của ứng dụng này khi được tải từ một ứng dụng khác
              exposes: {
               './VueAppLoader' : "./src/loader.js",
              }
              ,
              // Phơi bày (expose) module "./src/loader.js" với tên gọi "./VueAppLoader", để có thể được tải từ các ứng dụng khác.
              shared: {
                vue: {
                  singleton: true,
                  eager: true,
                },
                // Chia sẻ thư viện vue với các ứng dụng khác, đảm bảo rằng chỉ có một phiên bản Vue được sử dụng (singleton) và tải ngay lập tức (eager).
              },
            },
          ]);
      },
      transpileDependencies: ["vue"],
      // transpileDependencies: ["vue"],: Yêu cầu Quasar transpile (chuyển mã) thư viện vue để đảm bảo tương thích với mọi trình duyệt.
    },
    devServer: {
      port: 8082,
      open: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
  //     port: 4300,: Đặt máy chủ phát triển chạy ở cổng 4300.
  // open: true,: Tự động mở trình duyệt khi máy chủ phát triển khởi động.
  //   headers: { "Access-Control-Allow-Origin": "*", },: Thêm tiêu đề CORS (Access-Control-Allow-Origin: *) để cho phép tất cả các nguồn truy cập ứng dụng, giúp các ứng dụng micro-frontend khác dễ dàng truy cập vào.
    },
  };
});
