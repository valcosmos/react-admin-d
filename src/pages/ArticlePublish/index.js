import React, { useState } from 'react'
import style from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Channel } from 'components/Channels'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'

export const ArticlePublish = () => {
  const [type, setType] = useState(1)
  // 用于控制上传的额图片以及图片的显示
  const [fileList, setFileList] = useState([])

  const onFinish = (values) => {
    console.log(values)
  }
  const [value, setValue] = useState('')

  const changeType = (e) => {
    // setType()
    const value = e.target.value
    setType(value)
  }

  const uploadOnChange = ({ fileList }) => {
    console.log(fileList)
    setFileList(fileList)
  }
  return (
    <div className={style.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={'/home'}>首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          size="large"
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{ title: '', channel_id: '', content: '', type }}
        >
          <Form.Item
            label={'标题'}
            name="title"
            rules={[{ required: true, message: '文章标题不能为空' }]}
          >
            <Input style={{ width: '400px' }} placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item
            label={'频道'}
            name="channel_id"
            rules={[{ required: true, message: '清选择频道' }]}
          >
            <Channel></Channel>
          </Form.Item>
          <Form.Item label={'封面'} name="type">
            <Radio.Group onChange={changeType}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            {type !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                action={`${baseURL}/upload`}
                onChange={uploadOnChange}
              >
                <PlusOutlined />
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label={'内容'}
            name="content"
            rules={[{ required: true, message: '文章内容不能为空' }]}
          >
            <ReactQuill theme="snow" placeholder="请输入文章的内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
              <Button size="large" htmlType="submit">
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
