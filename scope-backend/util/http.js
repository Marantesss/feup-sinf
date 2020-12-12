const axios = require("axios");
const FormData = require('form-data');


const getBodyData = (formObj) => {
  const bodyData = new FormData();
  for (const key in formObj) {
    bodyData.append(key, formObj[key]);
  }
  return bodyData;
};


const http = (method, url, data) => {

  const bodyData = getBodyData(data);

  return axios({
    baseURL: url,
    method: method,
    data: bodyData,
    headers: { ...bodyData.getHeaders() }
  });
};






const setToken = (token) => {
  axios.defaults.headers.common = { "Authorization": `bearer ${token}` };
};

module.exports = {
  http, setToken
};