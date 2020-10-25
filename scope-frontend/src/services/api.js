import axios from 'axios'

const api = () => {
  let baseUrl = process.env.VUE_APP_ROOT_API;
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