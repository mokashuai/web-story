import S from './service'
export default {
  namespace: 'personal',
  state: {
    profile: {},

  },
  reducers: {
    setUserList(state, { payload: res }) {
      return {
        ...state,
        title: res
      };
    },

  },
  effects: {
    // *获得员工列表
    *getUserList({ payload }, { call, put }) {
      const data = yield call(S.getUserList, payload);
      yield put({
        type: 'setUserList',
        payload: data
      });
    },
  }
};
