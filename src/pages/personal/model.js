import S from './service'
export default {
  namespace: 'personal',
  state: {
    profile: {},

  },
  reducers: {
    setTitle(state, { payload: res }) {
      return {
        ...state,
        title: res
      };
    },

  },
  effects: {
    // *获得员工列表
    *getUserList({ payload }, { call, put }) {
      try {
        var data = yield call(S.getUserList, payload);
        if (data.code === 200) {
          yield put({
            type: 'setUserList',
            payload: data.data.data
          });
        }
      } catch (error) {}
    },
  }
};
