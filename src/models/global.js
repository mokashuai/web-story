import { router } from 'umi'

export default {
  namespace: 'global',

  state: {

  },

  reducers: {
    
  },

  effects: {
    *routerJump({ payload }, { put }){
      yield put(router.push(payload));
    }
  },
};
