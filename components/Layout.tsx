import * as React from 'react'
import { Layout } from 'antd'
import Navbar from '@components/Navbar'
import jwtDecode from 'jwt-decode'
import useUser from '@hooks/useUser'
import { User } from '@reducers/userReducer'
import 'antd/dist/antd.css'
import '@assets/Layout.less'

const { Header, Footer, Content } = Layout;

const AppLayout: React.SFC = ({children}) => {
  
  const { onLogin } = useUser()

  React.useEffect(() => {
    const usertoken = sessionStorage.getItem('usertoken')
    const remembertoken = localStorage.getItem('usertoken')
    if(usertoken) {
      const user: User = jwtDecode(usertoken)
      onLogin(user)
    }
    if(remembertoken) {
      const user: User = jwtDecode(remembertoken)
      onLogin(user)
    }
  }, [])

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