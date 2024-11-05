import { boot } from 'quasar/wrappers'
import Keycloak from 'keycloak-js'
import axios from "axios";

export default boot(({ app /* , store } */ }) => {
  async function updateKeycloakTokenToAxiosConfig(keycloak) {
    // hàm này thực hiện cấu hình global axios, gán sẵn token vào header config của axios
    // sau đó chỉ cần gọi các api là được k cần thêm phần gán token nữa
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${app.config.globalProperties.$keycloak.token}`;
      return config;
    }, null, {synchronous: true})
    localStorage.setItem('token', app.config.globalProperties.$keycloak.token)
  }

  return new Promise(resolve => {
    const keycloak = new Keycloak({
      url: "https://sso.htc-itc.vn/auth",
      realm: "wifi",
      clientId: "wifimnt",
    })
    // ứng dụng chạy vào đây đầu tiên khi khởi động, chưa login thì login r no trả về keycloak
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        enableLogging: true,
        flow: "implicit"
      })
      .then(async (authenticated) => {
        if (authenticated) {
          // có keycloak kèm token thì chạy vào hàm này
          await updateKeycloakTokenToAxiosConfig(keycloak);
          resolve()
        } else {
          console.log("Not authenticated")
        }
      }).catch((error) => {
      console.log("Authentication failure", error)
    })
    // keycloak trả về có token bên trong nó sẽ được add vào global configuration của thằng app vue
    app.config.globalProperties.$keycloak = keycloak
    app.use(keycloak)

  })
})
