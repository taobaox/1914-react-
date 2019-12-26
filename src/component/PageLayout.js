import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import './pagelayout.scss'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu
class PageLayout extends React.Component {
  render () {
    return (
      <Layout className="base-layout">
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Welcome</span>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="3">用户列表</Menu.Item>
              <Menu.Item key="4">权限设置</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout>
          <Header className="header"/>

          <Content className="content">
            <div style={{height:'2000px'}}>
              内容
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default PageLayout