import * as React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import useUser from '@hooks/useUser'
import PopupWrapper from '@components/PopupWrapper'
import '@assets/Navbar.less'

const Navbar: React.SFC = () => {

  const {user, isLogin, onLogout} = useUser()
  const [current, setCurrent] = React.useState('')

  const handleClick = (e: ClickParam) => {
    setCurrent(e.key)
  }

  const HomeClick = () => {
    setCurrent('')
  }

  const handleLogout = () => {
    onLogout()
    sessionStorage.removeItem('usertoken')
    localStorage.removeItem('usertoken')
    Router.push('/')
  }

  return (
    <div className='nav-bar'>
      <div className='logo'><Link href='/'><a onClick={HomeClick}>로고</a></Link></div>
      <div className='main-menu'>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.SubMenu title='여행계획표 열람하기'>
            <Menu.Item key='domestic'><Link href='/planner/domestic'><a>국내 여행계획</a></Link></Menu.Item>
            <Menu.Item key='foreign'><Link href='/planner/foreign'><a>해외 여행계획</a></Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='designer'><Link href='/designer'><a>TraB 설계자</a></Link></Menu.Item>
          { user.state_id !== 4 ? <Menu.Item key='designer_register'><PopupWrapper signin email pending callback='/designer/register'>설계자 등록하기</PopupWrapper></Menu.Item> : null}
          <Menu.Item key='planner'><PopupWrapper signin email enroll pending callback='/planner/write'>여행계획 판매하기</PopupWrapper></Menu.Item>
          <Menu.Item key='board'><Link href='/board'><a>TraB 게시판</a></Link></Menu.Item>
          {
            !isLogin ?
            <Menu.SubMenu title='로그인 / 회원가입'>
              <Menu.Item key='signin'><Link href='/auth/signin'><a>로그인</a></Link></Menu.Item>
              <Menu.Item key='signup'><Link href='/auth/signup'><a>회원가입</a></Link></Menu.Item>
            </Menu.SubMenu>
            :
            <Menu.SubMenu title={user.email}>
              { user.state_id === 9999 ? <Menu.Item key='adminpage'><Link href='/admin'><a>관리자 페이지</a></Link></Menu.Item> : null }
              <Menu.Item key='mypage'><Link href='/auth/mypage'><a>마이 페이지</a></Link></Menu.Item>
              <Menu.Item key='logout'><a onClick={handleLogout}>로그아웃</a></Menu.Item>
            </Menu.SubMenu>
          }
        </Menu>
      </div>
    </div>
  )
}

export default Navbar