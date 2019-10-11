import { connect } from 'dva';

const mapStateToProps = ({mainPage}) => ({
  list: mainPage.list
});

const mapDispatchToProps = dispatch => ({
  getList: payload =>  dispatch({type: 'mainPage/getList', payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
