import S from './service'
export default {
  namespace: 'mainPage',
  state: {
    total: 100,
    list: [],
  },
  reducers: {
    SET_LIST(state, { data={} }) {
      const { list=[], total=0 } = data;
      return { ...state, list, total };
    },
  },
  effects: {
    // *获得列表
    *getList({ payload }, { call, put }) {
      const data = yield call(S.getList, payload);
      yield put({
        type: 'SET_LIST',
        data
      });
    },
  }
};
