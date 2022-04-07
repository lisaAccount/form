import React, { Component } from 'react'
import PageTitle from '@components/page-title'
import Filter from '@pagesComponents/filter/index'
import TableList from '@pagesComponents/tableList/index'
import Pagination from '@pagesComponents/pagination/index'
import Product from '../../../service/product-service';


const productAPI = new Product();
export default class index extends Component {

  state = {
   params: {
      searchType: '',
      searchKeyword: '',
      pageNum: 1,
      pageSize: 10,
      total: '',
      listType: 'list',
   },
    tableData: [],
  }

  getTableData = (data) => {
    this.setState({
      tableData: data
    })
  }

  componentDidMount() {
    this.initTableData()
  }

  initTableData = () => {
    // const { params: { listType, pageNum } } = this.state;
    // const param = {
    //   listType,
    //   pageNum,
    // }
    const param = {
      ...this.state.params
    }
    this.getTableList(param)
  }

  getTableList = (param) => {
    try {
      const {params} = this.state
      productAPI.getProductList({
        ...param
      }).then((res) => {
        const tableList = res?.list || [];
        this.setState({
          tableData: tableList,
          params: {
            ...params,
            pageNum: res?.pageNum || '',
            pageSize: res?.pageSize || '',
            total: res?.total || '',
          }
        })
      })
    } catch {
      console.log('请求出错了')
    }
  }

  render() {
   const { 
     tableData,
     params
    } = this.state
    console.log('total', this.state.params.total, params)
    return (
      <div className='container'>
        <PageTitle title='商品管理复制版本'/>

        <div className='content'>
          <Filter 
            getTableList={this.getTableList}
          />
          <TableList 
            tableData={tableData}
          />
          <Pagination
            params={params}
            getTableList={this.getTableList}
          />
        </div>
      </div>
    )
  }
}
