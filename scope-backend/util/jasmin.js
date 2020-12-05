const config = require('../config.js')
const{http, setToken} = require('./http')
const axios = require("axios");

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

axios.interceptors.response.use((response) => (response),
    (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (error.response.status !== 401) {
            return new Promise((_resolve, reject) => {
                reject(error);
            });
        }

        // Try request again with new token
        return requestAccessToken()
            .then((res) => {

                const config = error.config;

                if (res.data.access_token) {
                    setToken(res.data.access_token);
                }

                return new Promise((resolve, reject) => {
                    axios.request(config).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    });
                });

            })
            .catch((error) => {
                Promise.reject(error);
            });
    },
);




module.exports = {
    requestAccessToken
};