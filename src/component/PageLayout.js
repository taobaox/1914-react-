import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import { Layout, Menu, Icon } from 'antd'
import './pagelayout.scss'
import routes from '@/router'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

class PageLayout extends React.Component {
  state = {
    defaultSelectedKeys:null,
    defaultOpenKeys:null
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
                <Menu.Item key={item2.key}>
                  <Link to={{pathname:item2.path,search:item.key +'/'+ item2.key}} exac="true">{item2.text}</Link>
                </Menu.Item>
              )
            })
          }
      </SubMenu>)
      }else{
        navbarArr.push(
          <Menu.Item key={item.key}>
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
    return {
      defaultSelectedKeys:key,
      defaultOpenKeys:openSub
    }  
  }

  render () {
    let { defaultSelectedKeys,defaultOpenKeys } = this.state
    return (
      <Layout className="base-layout">
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={[defaultOpenKeys]} mode="inline">
            {
              this.createNavBar(routes)
            }
          </Menu>
        </Sider>

        <Layout>
          <Header className="header"/>
          <Content className="content">
            <Switch>
              {
                this.createRoute(routes)
              }
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default PageLayout