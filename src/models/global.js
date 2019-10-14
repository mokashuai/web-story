import { router } from 'umi'
import { login, logout, forgetPassword } from 'utils/service'
export default {
  namespace: 'global',

  state: {
    currentPage: 1,
    isLogin: localStorage.getItem('isLogin'),
  },

  reducers: {
    SET_CURRENT_PAGE(state, { payload }){
      return { ...state, currentPage: payload };
    },
  },

  effects: {
    *routerJump({ payload }, { put }){
      yield put(router.push(payload));
    },
    *login({ payload }, { put, call }){
      const data = yield call(login, payload);
      localStorage.setItem('isLogin', '1');
    },
    *logout({ payload }, { call }){
      const data = yield call(logout, payload);
      sessionStorage.clear();
      localStorage.clear();
    },
    *forgetPassword({ payload }, { call }){
      const data = yield call(forgetPassword, payload);
      return data;
    },
  },
};
