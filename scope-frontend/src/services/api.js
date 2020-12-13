import axios from 'axios'

/**
 * Constant variables
 */
const API_URL = process.env.VUE_APP_BACKEND_DOMAIN ?
  process.env.VUE_APP_BACKEND_DOMAIN + (process.env.VUE_APP_BACKEND_PORT ? `:${process.env.VUE_APP_BACKEND_PORT}` : '')
  : 'http://localhost:8000';

/**
 * Gets the user session token
 * from localStorage.
 */
const getToken = () => localStorage.getItem('JWT_TOKEN');


/**
 * All the server API routes.
 */
const routes = {
  login: '/login',
  logout: '/logout',
  stockValue: '/inventory/stock/value',
  getExample: (example) => (`route/${example}/route`)
};

/**
 * Makes an authenticated request
 * to the path specified.
 *
 * In case the user is not authenticated,
 * makes an unauthenticated request.
 */
const request = (path, method, data, _cb) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (!path.endsWith('/')) {
    path = path + '/';
  }

  const headers = {};

  // Add authorization header
  const token = getToken();
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const errorHandler = (err) => {
    if (err.response) { // Server replied with non 2xx
    } else if (err.request) { // Network error / Server did not reply
    } else { // Other error
    }

    const res = { data: { status: 'error' } };
    _cb(res);
  };

  if (method.toLowerCase() === 'get') {
    axios.get(API_URL + path, { headers }).then(_cb).catch(errorHandler);
  } else if (method.toLowerCase() === 'post') {
    axios.post(API_URL + path, data, { headers }).then(_cb).catch(errorHandler);
  }
};


/**
 * Main API controller.
 *
 * Deals with all communication between
 * the app and the server.
 */
const api = {
  login: (data, _cb) => {
    request(routes.login, 'post', data, _cb);
  },
  logout: (_cb) => {
    request(routes.logout, 'post', null, _cb);
  },
  stockValue: (data,_cb) => {
    request(routes.stockValue,'get',data,_cb);
  },
  getExample: (example, _cb) => {
    request(routes.getExample(example), 'get', null, _cb);
  },
};

export default api;
