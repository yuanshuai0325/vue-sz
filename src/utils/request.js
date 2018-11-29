import axios from 'axios'
import store from '@/store'

var instance = axios.create({
  baseURL: '/api/stage',
  timeout: 10000,
});

instance.interceptors.request.use(config => {
// config.headers.Authorization = store.getters.token.token
var token = sessionStorage.getItem("token");
config.headers.Authorization = token;
 return config
}, error => {
 console.log(error)
 Promise.reject(error)
})



// axios.interceptors.request.use(function (config) {
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });
// axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     return Promise.reject(error);
//   });

export default instance