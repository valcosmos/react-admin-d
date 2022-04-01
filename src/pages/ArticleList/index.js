import React, { useEffect, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Space
} from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { articleStatus } from 'api/constant'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/articles'

export const ArticleList = () => {
  const [state, setState] = useState({ status: -1, channels: [], articles: [] })
  const _getChannel = async () => {
    const res = await getChannels()
    setState({ ...state, channels: res.data.channels })
  }
  const _getArticles = async () => {
    const res = await getArticles()
    console.log(res)
    setState({ ...state, articles: res.data })
  }
  useEffect(() => {
    _getChannel()
    _getArticles()
  }, [])
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
      render() {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
            ></Button>
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        )
      }
    }
  ]

  const onFinish = () => {}
  // const handleChange = () => {}

  const { total_count, results, per_page, page } = state.articles
  
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
            <Select style={{ width: 200 }} placeholder="请选择频道">
              {state.channels.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="">
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
            current: page
          }}
          dataSource={results}
        ></Table>
      </Card>
    </div>
  )
}
