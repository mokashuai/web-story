import S from './service'
export default {
  namespace: 'information',
  state: {
    information: {
    },
    pictures: []
  },
  reducers: {
    SET_INFORMATION(state, { payload }) {
      const { information={}, pictures=[] } = payload;
      return { ...state, information, pictures }
    },
    ONCHANGE_PICTURE(state, { payload }){
      const { id, type, url } = payload;
      
      if(type === 'collect'){
        const collect = state.information.collect;
        collect.push(id);
        const information = {...state.information, collect};
        return { ...state, information };
      }
      
      let pictures;
      if(type === 'remove'){
        pictures = state.pictures.filter(({id: ID}) => ID !== id);
      }
      if(type === 'edit'){
        pictures = state.pictures.map(each => each.id === id ? {...each, url} : each);
      }
      
      return { ...state, pictures };
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
