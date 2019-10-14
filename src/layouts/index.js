import './index.less';
import Header from './Header'
function BasicLayout(props) {
  return (
    <div className='html-layout'>
      <Header title='Welcome to beautiful girl !' />
      {props.children}
    </div>
  );
}

export default BasicLayout;
