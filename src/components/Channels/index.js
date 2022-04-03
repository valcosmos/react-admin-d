import React, { useEffect } from 'react'
import { useState } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'
export const Channel = (props) => {
  const [channels, setChannels] = useState([])
  const _getChannel = async () => {
    const res = await getChannels()
    setChannels(res.data.channels)
  }
  useEffect(() => {
    _getChannel()
  }, [])
  return (
    <Select style={{ width: 400 }} value={props.value} onChange={props.onChange} placeholder="请选择频道">
      {channels.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
}
