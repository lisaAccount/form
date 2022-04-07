import React, { Component } from 'react'
import { Table, Button } from 'antd'
import './index.less'

export default class index extends Component {

  constructor(props) {
    super(props)
  }
  
  columns = [
    {
      title: '商品ID',
      key: 'shopid',
      dataIndex: 'id'
    },
    {
      title: '信息',
      key: 'info',
      // dataIndex: 'name'
      render: (text, record, index) => {
        return (
          <div>
            <div>{record.name}</div>
            <div>{record.subtitle}</div>
          </div>
        )
      }
    },
    {
      title: '价格',
      key: 'price',
      dataIndex: 'price'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text, record, index) => {
        console.log('text', text, record, index)
        let status = '', buttonText = '';
        if(text === 1) {
          status = '在售';
          buttonText = '下架'
        } else if(text === 2) {
          status = '已下架';
          buttonText = '上架'
        }
        return (
         <>
            <div className='tableListData'>{status}</div>
            <div><Button type="primary" value='small' size='small'>{buttonText}</Button></div>
         </>
        )
      }
    },
    {
      title: '操作',
      key: 'operate',
      dataIndex: 'id',
      render: () => {
        return (
          <div>
            <Button type="link" className='viewButton' ><span className='viewButton'>查看</span></Button>
            <Button type="link" className='editButton' ><span className='editButton'>编辑</span></Button>
          </div>
        )
      }
    }
  ]

  render() {
    const {tableData} = this.props;
    console.log('tableData', tableData)
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={tableData}
        />
      </div>
    )
  }
}
