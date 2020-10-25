import axios from 'axios'

const api = () => {
  let baseUrl = process.env.VUE_APP_BACKEND_DOMAIN;
  if (process.env.VUE_APP_BACKEND_PORT != null) {
    baseUrl += `:${process.env.VUE_APP_BACKEND_PORT}`;
  }

  return axios.create({
    baseURL: baseUrl,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
};

export default api;