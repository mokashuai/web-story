import axios from 'axios';


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
      return response.data;
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

export default instance;
