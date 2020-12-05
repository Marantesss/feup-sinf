const config = require('../config.js')
const{http, setToken} = require('./http')

const requestAccessToken = () => {
    const client_id = "SCOPEJS";
    const client_secret = config.jasmin.clientSecret

    const bodyData =  {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "client_credentials",
        "scope": "application",
    };

    const url = 'https://identity.primaverabss.com/connect/token';

    return http("post", url, bodyData);

}

module.exports = {
    requestAccessToken
};