import { boot } from 'quasar/wrappers';
import Keycloak from 'keycloak-js';
import axios from 'axios';

export default boot(({ app }) => {
  async function updateKeycloakTokenToAxiosConfig(keycloak) {
    const token = keycloak.token;

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    localStorage.setItem('token', token);
    window.location.replace('/#');
    setInterval(async () => {
      if (keycloak.isTokenExpired()) {
        try {
          const refreshed = await keycloak.updateToken(30); // Làm mới token trước khi hết hạn 30 giây
          if (refreshed) {
            localStorage.setItem('token', keycloak.token); // Lưu token mới
          }
        } catch (error) {
          console.error('Failed to refresh token', error);
        }
      }
    }, 30000); // Kiểm tra và cập nhật token mỗi 30 giây
  }

  return new Promise((resolve, reject) => {
    const keycloak = new Keycloak({
      url: 'https://sso.htc-itc.vn/auth',
      realm: 'vtqt',
      clientId: 'vtqt',
    });

    // Khởi tạo Keycloak
    keycloak
      .init({
        onLoad: 'login-required', // Yêu cầu đăng nhập
        checkLoginIframe: false, // Tắt kiểm tra iframe để giảm tải
        flow: 'implicit', // Sử dụng implicit flow
      })
      .then(async (authenticated) => {
        if (authenticated) {
          // Người dùng đã đăng nhập, xử lý token
          app.config.globalProperties.$keycloak = keycloak;
          await updateKeycloakTokenToAxiosConfig(keycloak);

          // Đánh dấu ứng dụng đã sẵn sàng
          resolve();
        } else {
          console.error('User is not authenticated');
          reject(new Error('Not authenticated'));
        }
      })
      .catch((error) => {
        console.error('Authentication failure', error);
        reject(error);
      });

    // Thêm Keycloak vào Vue instance để truy cập toàn cục
    app.use({
      install(Vue) {
        Vue.config.globalProperties.$keycloak = keycloak;
      },
    });
  });
});
