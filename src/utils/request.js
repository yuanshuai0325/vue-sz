import axios from 'axios'
var instance = axios.create({
  baseURL: '/api/stage',
  timeout: 10000,
});

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance