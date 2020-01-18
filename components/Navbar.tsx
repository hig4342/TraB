import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import useUser from '@hooks/useUser'
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
            <Menu.Item key='domestic'>국내 여행계획</Menu.Item>
            <Menu.Item key='foreign'>해외 여행계획</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='designer'>TraB 설계자</Menu.Item>
          <Menu.Item key='designer_register'>설계자 등록하기</Menu.Item>
          <Menu.Item key='planner'>여행계획 판매하기</Menu.Item>
          <Menu.Item key='board'>TraB 게시판</Menu.Item>
          {
            !isLogin ?
            <Menu.SubMenu title='로그인 / 회원가입'>
              <Menu.Item key='signin'>로그인</Menu.Item>
              <Menu.Item key='signup'>회원가입</Menu.Item>
            </Menu.SubMenu>
            :
            <Menu.SubMenu title={user.email}>
              <Menu.Item key='adminpage'>관리자 페이지</Menu.Item>
              <Menu.Item key='mypage'>마이 페이지</Menu.Item>
              <Menu.Item key='logout'><a onClick={onLogout}>로그아웃</a></Menu.Item>
            </Menu.SubMenu>
          }
        </Menu>
      </div>
    </div>
  )
}

export default Navbar