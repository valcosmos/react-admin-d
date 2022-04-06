import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import { Layout, Menu, Popconfirm, Button, message } from 'antd'
import {
  DatabaseOutlined,
  FilePptOutlined,
  SendOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'

const LayoutComponent = (props) => {
  const use = useLocation()
  const [selectKey, setSelectKey] = useState(use.pathname)
  useEffect(() => {
    if (use.pathname && use.pathname !== selectKey) {
      setSelectKey(
        use.pathname.startsWith('/home/publish')
          ? '/home/publish'
          : use.pathname
      )
    }
  }, [use.pathname])
  const [state, setState] = useState({
    profile: {}
  })

  const nav = useNavigate()
  const onConfirm = () => {
    removeToken()
    nav('/login')
    message.success('您已退出登陆')
  }
  const getFile = async () => {
    const res = await getUserProfile()
    setState({
      profile: res.data
    })
  }
  useEffect(() => {
    getFile()
  }, [])

  return (
    <div className={style.layout}>
      <Layout>
        <Layout.Header className="header">
          <div className="logo" />
          <div className="profile">
            <span className="userName">{state.profile.name}</span>
            <Popconfirm
              title="您确认退出登陆吗？"
              onConfirm={onConfirm}
              okText="退出"
              cancelText="取消"
            >
              <Button type="primary" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[selectKey]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item icon={<DatabaseOutlined />} key="/home">
                <Link to={'/home'}>数据概览</Link>
              </Menu.Item>
              <Menu.Item icon={<FilePptOutlined />} key="/home/list">
                <Link to={'/home/list'}> 内容管理</Link>
              </Menu.Item>
              <Menu.Item icon={<SendOutlined />} key="/home/publish">
                <Link to={'/home/publish'}> 发布文章</Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: '24px' }}>
            <Layout.Content className="content">
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
