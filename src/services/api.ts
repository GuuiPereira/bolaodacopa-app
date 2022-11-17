import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  // baseURL: "https://bolao-da-copa-2022.herokuapp.com/"
  baseURL: 'http://192.168.15.14:3333',
})

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('TOKEN')
    config.headers = { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

api.interceptors.response.use(response => {
  return response
}, async function (err) {

  const originalRequest = err.config;
  if (err.response.status === 401 && err.config && !originalRequest._retry) {

    originalRequest._retry = true;
    const rtoken = await AsyncStorage.getItem('RTOKEN')
    const resp = await api.post('/refreshToken', { refresh_token: rtoken });
    const { token, refreshToken } = resp.data;

    AsyncStorage.setItem('TOKEN', token);
    if (refreshToken) AsyncStorage.setItem('RTOKEN', refreshToken.id)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return api(originalRequest);

  }

  return Promise.reject(err);
})

export { api };









