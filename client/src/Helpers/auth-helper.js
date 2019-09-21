import Axios from "axios";

const TOKEN_KEY = "GROUPCON_TOKEN";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  window.location = "/";
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken(e) {
  e.preventDefault();
  localStorage.removeItem(TOKEN_KEY);
  window.location = "/";
}

export async function getCurrentUser() {
  if (!getToken()) return;
  try {
    // let response = await Axios.get("/api/v1/user/current", {
    //   headers: {
    //     Authorization: getToken()
    //   }
    // });
    let response = await Axios.get("/api/v1/user/current");
    return response.data;
  } catch (error) {
    return false;
  }
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  });

  Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        deleteToken();
        window.location = "/";
      } else {
        return Promise.reject(error);
      }
    }
  );
}
