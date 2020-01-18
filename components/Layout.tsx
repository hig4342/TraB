import * as React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

const { Header, Footer, Content } = Layout;

const AppLayout: React.SFC = ({children}) => {
  return (
    <Layout>
      <Header>
        <p>상단</p>
      </Header>
      <Content>
        {children}
      </Content>
      <Footer>
        <p>하단</p>
      </Footer>
    </Layout>
  )
}

export default AppLayout