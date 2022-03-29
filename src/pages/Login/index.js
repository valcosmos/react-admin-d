import React, { Component } from 'react'
import { Card, Form, Input, Checkbox, Button } from 'antd'
import './index.scss'
export default class Login extends Component {
  onFinish = (values) => {
    console.log('Success:', values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img
            className="login-logo"
            src={'https://www.valzt.cn/media/avatar_me.png'}
            alt=""
          />
          {/* form */}
          <Form
            size="large"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true
            }}
          >
            <Form.Item
              name="mobile"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: '手机号不能为空' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                  validateTrigger: 'onChange'
                }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: '验证码不能为空' },
                { pattern: /^\d{6}/, message: '验证码格式错误' }
              ]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name={'agree'}
              rules={[
                {
                  validator: (rules, value) => {
                    if (value) return Promise.resolve()
                    return Promise.reject(
                      new Error('请阅读并同意我们的用户协议')
                    )
                  }
                }
              ]}
            >
              <Checkbox>我已阅读并同意[隐私条框][用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登陆
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
