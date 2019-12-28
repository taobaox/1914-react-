import React from 'react'
import { Table, Button ,Row ,Col} from 'antd'
import axios from 'axios'
export default class UserList extends React.Component {
constructor(props){
  super(props)
  console.log(props)
  this.state={
    dataSource:[]
  }

  this.columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title:'操作',
      render(col,row,index){
        return (
          <div span={4}>
            <Button type="primary" onClick={
              () => {console.log(col,row,index)}
            }>编辑</Button>
  
            <Button type="danger" onClick={
              (e)=> {
                // let newDateSource = this.state.dataSource
                console.log(e)
                // let index = newDateSource.findIndex(item => item.id === row.id)
                console.log(index)
              }
            }>删除</Button>
          </div>
        )
      }
    }
  ]
}
  componentDidMount(){
    axios.get('http://localhost:9090/userList').then(res => {
      this.setState({
        dataSource:res.data.data
      })
    })
  }
  render(){
    let { dataSource } = this.state
    return(
      <div>
        <Table dataSource={dataSource} columns={this.columns}></Table>
      </div>
    )
  }
}