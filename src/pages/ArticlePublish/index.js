import React, { useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import { Channel } from 'components/Channels'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'
import { addArticles, getArticleById, updateArticles } from 'api/articles'
import history from 'utils/history'

const ArticlePublish = () => {
  const [type, setType] = useState(1)
  // 用于控制上传的额图片以及图片的显示
  const [fileList, setFileList] = useState([])
  // 封面预览
  const [previewVisible, setPreviewVisible] = useState(false)
  // 预览地址
  const [previewUrl, setPreviewUrl] = useState('')

  const { id } = useParams()
  console.log(id)

  const getArticle = async () => {
    if (id) {
      const res = await getArticleById(id)

      const values = {
        ...res.data,
        type: res.data.cover.type
      }
      // 表单设置value值
      formRef.current.setFieldsValue(values)
      // 给图片回显
      setFileList(res.data.cover.images.map((item) => ({ url: item })))

      setType(res.data.cover.type)
    }
  }
  useEffect(() => {
    getArticle()
  }, [])

  const formRef = useRef()

  const save = async (values, draft) => {
    if (fileList.length !== type) {
      return message.warning('图片上传数量不正确')
    }
    const images = fileList.map((item) => item.url || item.response.data.url)

    if (id) {
      // 更新
      await updateArticles(
        {
          ...values,
          cover: {
            type,
            images
          },
          id
        },
        draft
      )
    } else {
      // 添加文章

      await addArticles(
        {
          ...values,
          cover: {
            type,
            images
          }
        },
        draft
      )
    }

    message.success(`${id ? '修改' : '添加'}成功`)
    history.push('/home/list')
  }

  const onFinish = async (values) => {
    save(values, false)
  }

  const addDraft = async () => {
    const values = await formRef.current.validateFields()
    save(values, true)
  }

  // 修改封面
  const changeType = (e) => {
    const value = e.target.value
    setType(value)
    setFileList([])
  }

  // 图片上传的回调
  const uploadOnChange = ({ fileList }) => {
    console.log(fileList)
    setFileList(fileList)
  }
  // 图片上传预览
  const uploadOnPreview = (file) => {
    console.log(file)
    setPreviewVisible(true)
    setPreviewUrl(file.url || file.response.data.url)
  }

  // 图片预览modal关闭
  const handleCancel = () => {
    setPreviewVisible(false)
  }

  // 图片上传前校验
  const beforeUpload = (file) => {
    console.log(file)
    // 判断图片不能超过500k
    if (file.size >= 1024 * 500) {
      message.warn('上传文件不能超过500k')
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传png或者jpg格式的图片')
      return Upload.LIST_IGNORE
    }
    return true
  }

  return (
    <div className={style.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={'/home'}>首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          ref={formRef}
          labelCol={{ span: 4 }}
          size="large"
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{ title: '', content: '', type }}
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
                fileList={fileList}
                onChange={uploadOnChange}
                onPreview={uploadOnPreview}
                beforeUpload={beforeUpload}
              >
                {fileList.length < type && <PlusOutlined />}
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
              <Button size="large" onClick={addDraft}>
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      {/* 用于显示预览 */}
      <Modal
        visible={previewVisible}
        title={'图片预览'}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewUrl} />
      </Modal>
    </div>
  )
}

export default ArticlePublish