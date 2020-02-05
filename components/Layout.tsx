import * as React from 'react'
import { Layout, Divider, BackTop } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import Navbar from '@components/Navbar'
import jwtDecode from 'jwt-decode'
import useUser from '@hooks/useUser'
import { User } from '@reducers/userReducer'
import { LoadingOutlined } from '@ant-design/icons';
import Popup from '@components/Popup'
import PopupWrapper from './PopupWrapper'
import Foot from './Foot'
import 'antd/dist/antd.css'
import '@assets/Layout.less'

const { Header, Footer, Content } = Layout;

const AppLayout: React.SFC = ({children}) => {
  
  const { onLogin } = useUser()
  const [loading, setLoading] = React.useState(false)
  const [toolbarClass, setToolbarClass] = React.useState('toolbar-wrapper')

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

  const onSlide: React.MouseEventHandler = () => {
    if(toolbarClass === 'toolbar-wrapper') {
      setToolbarClass('toolbar-wrapper clicked')
    } else {
      setToolbarClass('toolbar-wrapper')
    }
  }

  const onHover: React.MouseEventHandler = () => {
    if(toolbarClass === 'toolbar-wrapper clicked') {
      setToolbarClass('toolbar-wrapper')
    }
  }

  const onMouseOut: React.MouseEventHandler = () => {
    if(toolbarClass === 'toolbar-wrapper clicked') {
      setToolbarClass('toolbar-wrapper')
    }
  }

  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Popup />
      <div className={toolbarClass} onClick={onSlide} onMouseEnter={onHover} onMouseOut={onMouseOut}>
        <div className='toolbar'>
          <Link href='/planner/domestic'><div><img src="/domestic.png" width='60' height='60'/>한국</div></Link>
          <Divider/>
          <Link href='/planner/foreign'><div><img src="/foreign.png" width='60' height='60'/>외쿡</div></Link>
          <Divider/>
          <PopupWrapper signin email enroll pending callback='/planner/write'><div><img style={{padding: 10}}src="/selling.png" width='60' height='60'/>판매</div></PopupWrapper>
        </div>
      </div>
      <BackTop />
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