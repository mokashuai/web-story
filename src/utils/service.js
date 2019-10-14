import R from './axios'
export const login = body => R({method: 'post', body, url: '/login'});
export const logout = body => R({method: 'post', body, url: '/logout'});
export const forgetPassword = body => R({method: 'post', body, url: '/forgetPassword'});