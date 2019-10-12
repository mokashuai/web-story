import { connect } from 'dva';
import { getDetail } from './service'
const mapStateToProps = ({mainPage}) => ({
  total: mainPage.total,
  list: mainPage.list.concat(mainPage.list),
});

const mapDispatchToProps = dispatch => ({
  getList: payload =>  dispatch({type: 'mainPage/getList', payload}),
  routerJump: payload =>  dispatch({type: 'global/routerJump', payload}),
  getDetail,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
