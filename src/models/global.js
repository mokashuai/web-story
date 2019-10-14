import { router } from 'umi'

export default {
  namespace: 'global',

  state: {
    currentPage: 1,
  },

  reducers: {
    SET_CURRENT_PAGE(state, { payload }){
      return { ...state, currentPage: payload };
    }
  },

  effects: {
    *routerJump({ payload }, { put }){
      yield put(router.push(payload));
    }
  },
};
