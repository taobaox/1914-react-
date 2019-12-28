import React from 'react'
import { 
  Form, 
  Icon, 
  Input, 
  Button, 
  Row,
  Col 
} from 'antd'
import './style.scss'
import { connect } from 'react-redux'
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render(){
    let { handleLogin } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login_page'>
        <Row type='flex' align='middle' justify='center'>
          <Col span={8}  className='login_page_col'>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLogin}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(
  (state,ownProps) => {
    return {
      isLogin:state.isLogin
    }
  },
  (dispatch,ownProps) => {
    return {
      handleLogin(){
        localStorage.setItem('isLogin','true')
        dispatch({
          type:'LOGIN_IN',
        })
        ownProps.history.replace('/')
      }
    }
  }
)(Form.create({ name: 'normal_login' })(Login))