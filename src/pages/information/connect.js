import { connect } from 'dva';
import { getDetail } from './service'
const mapStateToProps = ({information}) => ({
  information: information.information,
  pictures: information.pictures,
});

const mapDispatchToProps = dispatch => ({
  getInformation: payload =>  dispatch({type: 'information/getInformation', payload}),
  routerJump: payload =>  dispatch({type: 'global/routerJump', payload}),
  onChangePicture: payload =>  dispatch({type: 'information/ONCHANGE_PICTURE', payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
