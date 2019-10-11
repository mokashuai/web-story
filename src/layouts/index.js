import './index.less';

function BasicLayout(props) {
  return (
    <div className='html-layout'>
      <h1 className='html-title'>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
