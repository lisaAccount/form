import React, { Component } from 'react'
import { Pagination } from 'antd'

export default class index extends Component {

  state = {
    pageNum: 1,
    pageSize: 10,
    total: '',
  }

  componentDidUpdate(prevProps) {
    console.log('first', this.props.params.pageNum, prevProps.params.pageNum)
    if (prevProps.params !== this.props.params) {
      console.log('我进去了')
      this.setState({
        ...this.state,
        ...this.props.params,
      })
    }
  }

  onChange = (pageValue) => {
    console.log('我改变了', pageValue)
    this.setState({
      pageNum: pageValue,
    }, () => {
      console.log('state', this.state)
      this.props.getTableList(this.state)
    })
  }

  render() {
    return (
      <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={(pageValue) => {this.onChange(pageValue)}} 
        showTotal={(total, range) => { 
          console.log('total11', total, range)
          return `共有 ${this.state.total} 条数据`
        }}
      />
    )
  }
}
