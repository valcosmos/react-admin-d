import React, { useEffect, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  DatePicker,
  Table,
  Tag,
  Space,
  Modal,
  message
} from 'antd'

import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import { Link } from 'react-router-dom'

import { articleStatus } from 'api/constant'

import { delArticle, getArticles } from 'api/articles'

import { Channel } from 'components/Channels'

import history from 'utils/history'

 const ArticleList = () => {
  // const [state, setState] = useState({ status: -1, channels: [], articles: [] })
  const [status, setStatus] = useState(-1)
  const [articles, setArticles] = useState([])

  const state = {
    status
  }
  // 用于存放查询文章列表的所有参数
  const reqParams = {
    page: 1,
    per_page: 10
  }

  const _getArticles = async () => {
    const res = await getArticles(reqParams)
    setArticles(res.data)
  }
  useEffect(() => {
    _getArticles()
  }, [])

  const handleDelete = (id) => {
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '您确认删除这篇文章',
      onOk: async () => {
        // 发送请求 删除文章
        await delArticle(id)
        _getArticles()
        message.success('删除成功')
      },
      onCancel: () => {}
    })
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: (data) => {
        if (data.type === 0) {
          return <span>no cover</span>
        }
        return (
          <img
            src={data.images[0]}
            alt="unknown error"
            style={{ width: '100px', height: '50px', objectFit: 'cover' }}
          />
        )
      }
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (tag) => {
        const { name, color } = articleStatus.find((item) => item.id === tag)
        return <Tag color={color}>{name}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render(data) {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(data.id)}
            ></Button>
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(data.id)}
            ></Button>
          </Space>
        )
      }
    }
  ]

  const handleEdit = (id) => {
    // console.log(id)
    history.push(`/home/publish/${id}`)
  }

  const onFinish = ({ status, channel_id, date }) => {
    if (status !== -1) {
      reqParams.status = status
    } else {
      delete reqParams.status
    }
    if (channel_id !== undefined) {
      reqParams.channel_id = channel_id
    } else {
      delete reqParams.channel_id
    }
    if (date) {
      reqParams.begin_pubdate = date[0]
        .startOf('d')
        .format('YYYY-MM-DD HH:mm:ss')
      reqParams.end_pubdate = date[1].endOf('d').format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete reqParams.begin_pubdate
      delete reqParams.end_pubdate
    }
    // 查询之后 要让页码变成1
    console.log(reqParams)
    reqParams.page = 1
    _getArticles(reqParams)
  }
  // const handleChange = () => {}

  const onChange = (page, pageSize) => {
    reqParams.page = page
    reqParams.per_page = pageSize
    _getArticles()
  }

  const { total_count, results, per_page, page } = articles

  return (
    <div>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={'/home'}>首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form initialValues={state} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              {articleStatus.map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Channel></Channel>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到${total_count}条结`}>
        <Table
          rowKey={'id'}
          columns={columns}
          pagination={{
            total: total_count,
            position: ['bottomCenter'],
            pageSize: per_page,
            current: page,
            onChange
          }}
          dataSource={results}
        ></Table>
      </Card>
    </div>
  )
}

export default ArticleList