import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0'
})

instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('user')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
