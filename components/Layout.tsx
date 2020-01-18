import * as React from 'react'
import { Layout } from 'antd'
import Navbar from '@components/Navbar'
import 'antd/dist/antd.css'
import '@assets/Layout.less'

const { Header, Footer, Content } = Layout;

const AppLayout: React.SFC = ({children}) => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content className="container">
        {children}
      </Content>
      <Footer>
        <p>하단</p>
      </Footer>
    </Layout>
  )
}

export default AppLayout