import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import style from './index.module.scss'
import { login } from 'api/user'
import { useNavigate } from 'react-router'
import { setToken } from 'utils/storage'
import { useAuth } from 'components/AuthRoute/AuthProvider'

export const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    console.log('Success:', values)
    setLoading(true)
    const { mobile, code } = values
    try {
      const { data } = await login(mobile, code)
      auth.signin(data.token, () => navigate('/home', { replace: true }))
      message.success('登陆成功', 1, () => {
        setLoading(false)
      })
    } catch (err) {
      message.error(err.response.data.message, 1, () => {
        setLoading(false)
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={style.login}>
      <Card className={style['login-container']}>
        <img
          className={style['login-logo']}
          src={'https://www.valzt.cn/media/avatar_me.png'}
          alt=""
        />
        {/* form */}
        <Form
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
              { pattern: /^\d{6}$/, message: '验证码格式错误' }
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
                  return Promise.reject(new Error('请阅读并同意我们的用户协议'))
                }
              }
            ]}
          >
            <Checkbox>我已阅读并同意[隐私条框][用户协议]</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" block>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
