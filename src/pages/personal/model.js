import S from './service'
export default {
  namespace: 'personal',
  state: {
    detail: {},

  },
  reducers: {
    SET_DETAIL(state, { payload: detail }) {
      return { ...state, detail };
    },

  },
  effects: {
    // *获得员工列表
    *getDetail({ payload }, { call, put }) {
      const data = yield call(S.getDetail, payload);
      yield put({
        type: 'SET_DETAIL',
        payload: data
      });
    },
  }
};
