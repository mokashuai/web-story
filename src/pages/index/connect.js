import { connect } from 'dva';
import { getDetail } from './service'
const mapStateToProps = ({mainPage, global}) => ({
  total: mainPage.total,
  list: mainPage.list.concat(mainPage.list),
  currentPage: global.currentPage
});

const mapDispatchToProps = dispatch => ({
  getList: payload =>  dispatch({type: 'mainPage/getList', payload}),
  routerJump: payload =>  dispatch({type: 'global/routerJump', payload}),
  getDetail,
  setCurrentPage: payload =>  dispatch({type: 'global/SET_CURRENT_PAGE', payload}),
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
