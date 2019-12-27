import Home from '../views/Home'
import UserInfo from '../views/user/UserInfo'
import UserList from '../views/user/UserList'
// import { Route } from 'react-router-dom'

const routes = [
  {
    id:1,
    path:'/home',
    component:Home,
    key:'1',
    icon:'pie-chart',
    text:'主页',
    sub:[]
  },
  {
    id:2,
    path:null,
    component:null,
    key:'sub1',
    icon:'user',
    text:'用户中心',
    sub:[
      {
        id:201,
        key:'2-1',
        text:'用户列表',
        path:'/userlist',
        component:UserList
      },
      {
        id:202,
        key:'2-2',
        text:'用户信息',
        path:'/userinfo',
        component:UserInfo
      }
    ]
  },
  {
    id:3,
    path:'/aaa',
    component:null,
    key:'3',
    icon:'pie-chart',
    text:'测试导航A',
    sub:[]
  },
  {
    id:4,
    path:'/bbb',
    component:null,
    key:'sub2',
    icon:'pie-chart',
    text:'测试导航B',
    sub:[
      {
        id:202,
        key:'4-2',
        text:'测试导航B1',
        path:'/ccc',
        component:UserInfo
      }
    ]
  }
]
export default routes