import React, { Component } from 'react';
import { Row, Col, Button, Select, Input } from 'antd';

const { Option } = Select;

export default class Filter extends Component {

  state = {
    searchKeyword: '',
    pageNum: 1,
  }

  handleChange = (key, value) => {
    const { searchType, searchKeyword } = this.state
    let selectChangeValue = searchType, inputChangeValue = searchKeyword ;
    if (key === 'select') {
      selectChangeValue = value;
    } else if (key === 'input') {
      inputChangeValue = value
    }

    this.setState({
      searchType: selectChangeValue,
      searchKeyword: inputChangeValue,
    })
  }

  Search = () => {
    console.log('我点击了按钮吗')
    let listType = 'list';
    let params = {};
    const { searchType, searchKeyword, pageNum } = this.state
    if (searchKeyword) {
      listType = 'search';
      params = {
        ...this.state,
        listType,
      }
    } else {
      listType = 'list';
      params = {
        listType,
        pageNum
      };
    }
    console.log('params',params)
    this.props.getTableList(params)
  }

  render() {
    return (
      <Row gutter={32}>
        <Col span={4}>
          <Select defaultValue='productId' style={{ width: '100%' }} onChange={(value) => { this.handleChange('select', value) }}>
            <Option value='productId'>
              按商品ID查询
            </Option>
            <Option value='productName'>
              按商品名称查询
            </Option>
          </Select>
        </Col>
        <Col span={4}>
          <Input onChange={(e) => { this.handleChange('input', e.target.value) }} />
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={this.Search}>查询</Button>
        </Col>
      </Row>
    )
  }
}
