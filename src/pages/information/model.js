import S from './service'
export default {
  namespace: 'information',
  state: {
    information: {
      name: '小清新',
      gender: 1,
      birthday: '1990-12-11',
      address: {
        provinde: 1,
        city: 1,
        county: 1,
      },
      job: 'IT',
      signature: '虚心使人进步，骄傲使人落后',
      remark: '备注'
    },
    pictures: [{
      id: 1,
      url: 'https://qlogo2.store.qq.com/qzone/1074777053/1074777053/100?1428715949'
    }, {
      id: 2,
      url: 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3353220795,1735262926&fm=85&s=F61014C74A523DDC6C29993C03001048'
    },]
  },
  reducers: {
    SET_INFORMATION(state, { payload }) {
      const { information={}, pictures=[] } = payload;
      return { ...state, information, pictures }
    }
  },
  effects: {
    // *获得员工列表
    *getInformation({ payload }, { call, put }) {
      let data = yield call(S.getInformation, payload);
      yield put({
        type: 'SET_INFORMATION',
        payload: data
      });
    },
  }
};
