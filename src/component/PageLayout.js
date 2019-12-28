import React from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'

import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import './style.scss'
import routes from '@/router'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

class PageLayout extends React.Component {
  state = {
    defaultSelectedKeys:null,
    defaultOpenKeys:null,
    breadList:[]
  }
  // 生成面包屑导航
  createBread(breadList){
    return (
      <Breadcrumb>
        {
          breadList.map((item,index) => {
            if(item.path){
              return (
                <Breadcrumb.Item key={index}>
                  <a href={item.path}>{item.breadText}</a>
                </Breadcrumb.Item>
              )
            }else{
              return (
                <Breadcrumb.Item key={index}>
                  {item.breadText}
                </Breadcrumb.Item>
              )
            }
          })
        }
      </Breadcrumb>
    )
  }
  // 生成左侧导航栏
  createNavBar(routes){
    let navbarArr = []
    routes.map(item => {
      if(item.sub && item.sub.length > 0){
        navbarArr.push(<SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon}/>
              <span>{item.text}</span>
            </span>
          }
        >
          {
            item.sub.map(item2 => {
              return (
                <Menu.Item key={item2.key} onClick={()=>{
                  this.setState({
                    breadList:[
                      {
                        breadText:'首页',
                        path:'/'
                      },
                      {
                        breadText:item.text,
                        path:'#' + item2.path + '?' + item.key + '/'+ item2.key
                      },
                      {
                        breadText:item2.text,
                        path:'#' + item2.path + '?' + item.key + '/' + item2.key
                      }
                    ]
                  })
                }}>
                  <Link to={{pathname:item2.path,search:item.key +'/'+ item2.key}} exac="true">{item2.text}</Link>
                </Menu.Item>
              )
            })
          }
      </SubMenu>)
      }else{
        navbarArr.push(
          <Menu.Item key={item.key} onClick={()=>{
            this.setState({
              breadList:[
                {
                  breadText:item.text
                }
              ]
            })
          }}>
            <Icon type={item.icon} />
            <span>{item.text}</span>
            <Link to={{pathname:item.path,search:item.key}} exac="true"></Link>
          </Menu.Item>
        )
      }
      return ''
    })
    return navbarArr
  }
  // 生成页面路由
  createRoute(routes){
    let routeArr = []
    routes.map(item => {
      if(item.sub && item.sub.length > 0){
        item.sub.map(item2 => {
          routeArr.push(
            <Route path={item2.path} component={item2.component} exact={true} key={item2.key}></Route>
          )
          return ''
        })
      }else{
        if(item.component && item.path){
          routeArr.push(
            <Route path={item.path} component={item.component} exact={true} key={item.key}></Route>
          )
        }
      }
      return ''
    })
    return routeArr
  }
  // 刷新获取当前页面默认key值
  static getDerivedStateFromProps(props,state){
    let { location } = props
    let index = location.search.indexOf('sub')
    let key = index > -1 ? location.search.replace(/^\?sub.*\//,'') : location.search.replace(/\?/,'')
    let openSub = index > -1 ? location.search.replace(/\/.*/,'').replace(/\?/,'') : null
    let breadArr = JSON.parse(localStorage.getItem('breadList'))
    let mbxArr = state.breadList.length > 0 ? state.breadList : breadArr
    if(props.location.pathname === '/home'){
      mbxArr = [{breadText:'首页',path:'/'}]
    }
    localStorage.setItem('breadList',JSON.stringify(mbxArr))
    return {
      defaultSelectedKeys:key,
      defaultOpenKeys:openSub
    } 
  }
  render () {
    let { defaultSelectedKeys,defaultOpenKeys } = this.state
    let localBreadList = JSON.parse(localStorage.getItem('breadList'))
    return (
      <Layout className="base-layout">
        <Sider>
          <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKeys||'1']} defaultOpenKeys={[defaultOpenKeys]} mode="inline">
            {
              this.createNavBar(routes)
            }
          </Menu>
        </Sider>

        <Layout>
          <Header className="header">
            {/* 面包屑导航 */}
            <div className='bread_header'>
              {
                this.createBread(localBreadList)
              }
            </div>
          </Header>
          {/* 内容主体及路由 */}
          <Content className="content">
            <Switch>
              {
                this.createRoute(routes)
              }
              <Redirect from='/' to='/home?1'></Redirect>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default PageLayout