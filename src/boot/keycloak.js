import { boot } from 'quasar/wrappers'
import Keycloak from 'keycloak-js'
import axios from "axios";

export default boot(({ app /* , store } */ }) => {
  async function updateKeycloakTokenToAxiosConfig(keycloak) {

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${app.config.globalProperties.$keycloak.token}`;
      return config;
    }, null, {synchronous: true})
    localStorage.setItem('token', app.config.globalProperties.$keycloak.token);
    window.location.replace('/#');
  }

  return new Promise(resolve => {
    const keycloak = new Keycloak({
      url: "https://sso.htc-itc.vn/auth",
      realm: "wifi",
      clientId: "wifimnt",
    })
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        enableLogging: true,
        flow: "implicit"
      })
      .then(async (authenticated) => {
        if (authenticated) {
          await updateKeycloakTokenToAxiosConfig(keycloak);
          resolve()
        } else {
          console.log("Not authenticated")
        }
      }).catch((error) => {
      console.log("Authentication failure", error)
    })
    app.config.globalProperties.$keycloak = keycloak
    app.use(keycloak)

  })
})
