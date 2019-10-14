import { Component } from 'react';
import { Form, Button, Icon, Input, Carousel, message } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'dva';
import { Base64 } from 'js-base64';
import './login.less'
import ico from 'assets/favico32.ico';

@connect(() => ({}), dispatch => ({
  login: payload => dispatch({type: 'global/login', payload}),
  forgetPassword: payload => dispatch({type: 'global/forgetPassword', payload}),
  routerJump: payload => dispatch({type: 'global/routerJump', payload}),
}))
class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      findPw2: {
        sended: false,
        usermail: ``,
      },
    };
    this.carousel = React.createRef();
  }
  next = () => {
    this.setState({
      page: 2,
    });
    this.carousel.next();
  };
  previous = () => {
    this.setState({
      page: 1,
    });
    this.props.form.setFields({ userName2: '' });
    this.carousel.prev();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({
          email: values.userName,
          password: Base64.encode(values.password),
        }).then(() => {
          this.props.routerJump('/');
        });
      }
    });
  };

  handleSubmit2 = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.forgetPassword(values.userName2)
        .then(() => message.success('发送成功'))
        .catch(err => message.error('发送失败'));
      }
    });
  };

  render() {
    const { form: {getFieldDecorator}, isRegist } = this.props;
    const { findPw2, page } = this.state;
    return (
      <div className='login'>
        <Helmet>
          <title>Moka HCM</title>
          <link rel="shortcut icon" href={ico} type="image/vnd.microsoft.icon" />
          <link rel="icon" href={ico} type="image/vnd.microsoft.icon" />
        </Helmet>
        {page == 2 ? (
          <div className='arrow' onClick={this.previous}>
            <div></div>
          </div>
        ) : null}
        <div className='loginForm'>
          <Carousel ref={node => (this.carousel = node)} dots={false}>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <div className='formArea'>
                  <h1>美丽传说</h1>
                  <Form.Item>
                    {getFieldDecorator('userName', {
                      rules: [
                        {
                          type: 'email',
                          message: '请输入正确的邮箱',
                        },
                        { required: page == 1, message: '请输入邮箱' },
                      ],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: '#0C8CF6' }} />}
                        placeholder="请输入邮箱"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: page == 1, message: '请输入密码' }],
                    })(
                      <Input.Password
                        prefix={<Icon type="lock" style={{ color: '#0C8CF6' }} />}
                        type="password"
                        placeholder="请输入密码"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {
                      !isRegist &&<p className='findPw'>
                        <span style={{float:'left'}} onClick={e => this.props.routerJump('/login/regist')}>注册</span>
                        <span onClick={this.next} style={{float:'right'}}>找回密码</span>
                      </p>
                    }
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className='loginFormButton'>
                      {isRegist && '注册并'}登录
                    </Button>
                    {
                      isRegist && <a className='findPw login-redirect' onClick={e => this.props.routerJump('/login')} >已有账号? 直接登录</a>
                    }
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div>
              <Form onSubmit={this.handleSubmit2}>
                <div className='formArea'>
                  <h1>找回密码</h1>
                  {findPw2.sended ? (
                    <div>
                      <p>已发送邮件至{findPw2.usermail}邮箱</p>
                      <p>请查看邮件并点击邮件内的链接</p>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '40px' }}>
                      <p>请输入您账号的邮箱地址</p>
                      <p>我们将会给您的邮箱发送重置密码的邮件</p>
                    </div>
                  )}
                  {findPw2.sended ? null : (
                    <Form.Item>
                      {getFieldDecorator('userName2', {
                        rules: [
                          {
                            type: 'email',
                            message: '请输入正确的邮箱',
                          },
                          { required: page == 2, message: '请输入邮箱' },
                        ],
                      })(
                        <Input
                          prefix={<Icon type="mail" style={{ color: '#0C8CF6' }} />}
                          placeholder="请输入邮箱"
                        />
                      )}
                    </Form.Item>
                  )}
                  <Form.Item>
                    {findPw2.sended ? (
                      <Button
                        type="primary"
                        className='loginFormButton'
                        onClick={this.previous}
                        style={{ marginTop: `145px` }}
                      >
                        返回登录
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        htmlType="submit"
                        className='loginFormButton'
                        style={{ marginTop: '60px' }}
                      >
                        发送邮件
                      </Button>
                    )}
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm)
