import axios from 'axios';
import { router } from 'umi'

const instance = axios.create({
  baseURL: process.env.apiUrl,
  timeout: 10000,
  withCredentials: true,
  params: {

  },
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

instance.interceptors.request.use(config => {
  const { href } = window.location

  if (href.indexOf('/onboarding/') > -1) {
    let onboarding_token_preview = localStorage.getItem('onboarding_token_preview');
    config.headers.common['hcm-token'] = onboarding_token_preview || localStorage.getItem('onboarding_token');
  } else {
    config.headers.common['hcm-token'] = sessionStorage.getItem('hcm-token');
  }

  return config;
});

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if(response.data.code != 200){
        return router.push('/login');
      }
      return response.data.data;
    } else {
      console.error(response.data.msg);
      return Promise.reject(response);
    }
  },

  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default ({body={}, url, method='get', option={}}) => {
  if(method === 'get'){
    return instance.get(url, {
      params: body
    });
  }
  return instance({
    method, url, data: body, ...option
  })
};
