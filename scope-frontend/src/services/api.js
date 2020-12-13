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
  getBalanceSheet: '/financial/balanceSheet',
  getProfitAndLoss: '/financial/profitAndLoss',
  getSalesOverTime: '/financial/salesOverTime',
  grossProfitMargin: '/financial/grossProfitMargin',
  suppliers: '/purchases/supplier/',
  purchases: '/purchases/all',
  costumers: '/sales/customers/',
  sales: '/sales/all',
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
  }

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
  stockValue: (_cb) => {
    request(routes.stockValue, 'get', null, _cb);
  },
  getBalanceSheet: (_cb) => {
    request(routes.getBalanceSheet, 'get', null, _cb);
  },
  getSuppliers: (_cb) => {
    request(routes.suppliers, 'get', null, _cb);
  },
  purchases: (_cb) => {
    request(routes.purchases, 'get', null, _cb);
  },
  costumers: (_cb) => {
    request(routes.costumers, 'get', null, _cb);
  },
  getAllSales: (_cb) => {
    request(routes.sales, 'get', null, _cb);
  },
  getExample: (example, _cb) => {
    request(routes.getExample(example), 'get', null, _cb);
  },
  getProfitAndLoss: (_cb) => {
    request(routes.getProfitAndLoss, 'get', null, _cb);
  },
  getSalesOverTime: (_cb) => {
    request(routes.getSalesOverTime, 'get', null, _cb);
  },
  grossProfitMargin: (_cb) => {
    request(routes.grossProfitMargin, 'get', null, _cb);
  },
};

export default api;
