import * as React from 'react'
import { Layout } from 'antd'
import Router from 'next/router'
//import NProgress from 'nprogress'
import Navbar from '@components/Navbar'
import jwtDecode from 'jwt-decode'
import useUser from '@hooks/useUser'
import { User } from '@reducers/userReducer'
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import '@assets/Layout.less'
import Foot from './Foot'

const { Header, Footer, Content } = Layout;

const AppLayout: React.SFC = ({children}) => {
  
  const { onLogin } = useUser()
  const [loading, setLoading] = React.useState(false)

  Router.events.on('routeChangeStart', _url => {
    setLoading(true)
  })
  
  Router.events.on('routeChangeComplete', _url => {
    setLoading(false)
  })

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
      <div className='toolbar-wrapper'>
        <div className='toolbar'>
          <div><img src="/domestic.png" width='60' height='60'/>한국</div>
          <div><img src="/foreign.png" width='60' height='60'/>외쿡</div>
          <div><img style={{padding: 10}}src="/selling.png" width='60' height='60'/>판매</div>
        </div>
      </div>
      {
        loading ?
          <div className='loading-page'><div className='loading-wrapper'><LoadingOutlined /></div></div>
        :
          <Content className="container">
            {children}
          </Content>
      }
      <Footer>
        <Foot />
      </Footer>
    </Layout>
  )
}

export default AppLayout