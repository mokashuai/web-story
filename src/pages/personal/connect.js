import { connect } from 'dva';
const mapStateToProps = ({personal}) => ({
  detail: personal.detail
});

const mapDispatchToProps = dispatch => ({
  getDetail: payload =>  dispatch({type: 'personal/getDetail', payload}),
  routerJump: payload =>  dispatch({type: 'global/routerJump', payload}),
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
