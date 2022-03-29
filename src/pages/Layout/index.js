import React from 'react'
import style from './index.module.scss'
import { Layout, Menu, Popconfirm, Button, message } from 'antd'
import {
  DatabaseOutlined,
  FilePptOutlined,
  SendOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { removeToken } from 'utils/storage'

const LayoutComponent = () => {
  const nav = useNavigate()
  const onConfirm = () => {
    removeToken()
    nav('/login')
    message.success('您已退出登陆')
  }

  return (
    <div className={style.layout}>
      <Layout>
        <Layout.Header className="header">
          <div className="logo" />
          <div className="profile">
            <span className="userName">用户名</span>
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item icon={<DatabaseOutlined />} key="1">
                <Link to={'/home'}>数据概览</Link>
              </Menu.Item>
              <Menu.Item icon={<FilePptOutlined />} key="2">
                <Link to={'/home/list'}> 内容管理</Link>
              </Menu.Item>
              <Menu.Item icon={<SendOutlined />} key="3">
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
