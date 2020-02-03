import * as React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import useUser from '@hooks/useUser'
import PopupWrapper from '@components/PopupWrapper'
import '@assets/Navbar.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Menu, Button } from 'antd'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const Navbar: React.SFC = () => {

  const {user, isLogin, onLogout} = useUser()
  const [visible, setVisible] = React.useState(false)
  
  const handleLogout = () => {
    onLogout()
    sessionStorage.removeItem('usertoken')
    localStorage.removeItem('usertoken')
    axios.get(baseUrl + 'api/auth/signout').then(() => {
      Router.push('/')
    })
  }

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className='header'>
      <div className='logo'>
        <Link href='/'><img height={44} src='/logo.png'/></Link>
      </div>
      <div className='main-menu'>
        <ul className='mainmenu'>
          <li className='menu-item'>
          <a className='main-item'>여행계획표 열람하기</a>
            <ul className='submenu'>
              <Link href='/planner/domestic'><a className='sub-item'>국내 여행계획</a></Link>
              <Link href='/planner/foreign'><a className='sub-item'>해외 여행계획</a></Link>
            </ul>
          </li>
          <li className='menu-item'>
            <Link href='/designer'><a className='main-item'>TraB 설계자</a></Link>
          </li>
          { user.state_id !== 4 ?
            <li className='menu-item'>
              <PopupWrapper signin email pending callback='/designer/register'>설계자 등록하기</PopupWrapper>
            </li>
            : null }
          <li className='menu-item'>
            <Link href='/board'><a className='main-item'>트래비 게시판</a></Link>
          </li>
          <li className='menu-item'>
            <PopupWrapper signin email enroll pending callback='/planner/write'>여행계획 판매하기</PopupWrapper>
          </li>
          {
            !isLogin ?
              <li className='menu-item'>
                <a className='main-item'>로그인 / 회원가입</a>
                <ul className='submenu'>
                  <Link href='/auth/signin'><a className='sub-item'>로그인</a></Link>
                  <Link href='/auth/signup'><a className='sub-item'>회원가입</a></Link>
                </ul>
              </li>
            :
            <li className='menu-item'>
              <a className='main-item'>{user.nickname}</a>
              <ul className='submenu'>
                <Link href='/auth/mypage'><a className='sub-item'>마이페이지</a></Link>
                <a onClick={handleLogout} className='sub-item'>로그아웃</a>
                {user.state_id === 9999 ? <Link href='/admin'><a className='sub-item'>관리자 페이지</a></Link> : null}
              </ul>
            </li>
          }
        </ul>
        <div className='mobile-menu'>
          <div className='menu-button'><FontAwesomeIcon onClick={showDrawer} icon={faBars} /></div>
          <Drawer
            title={
              !isLogin ?
                <div>
                  <Button>로그인</Button>
                  <Button>회원가입</Button>
                </div>
              : 
                <div>
                  <p></p>
                </div>
            }
            onClose={onClose}
            visible={visible}
            className='menu-drawer'
          >
            <Menu
              mode="inline"
              className='menu-list'
            >
              <Menu.SubMenu title='여행계획표 열람하기'>
                <Menu.Item key='domestic'><Link href='/planner/domestic'><a>국내 여행계획</a></Link></Menu.Item>
                <Menu.Item key='foreign'><Link href='/planner/foreign'><a>해외 여행계획</a></Link></Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key='designer'><Link href='/designer'><a>TraB 설계자</a></Link></Menu.Item>
              { user.state_id !== 4 ? <Menu.Item key='designer_register'><PopupWrapper signin email pending callback='/designer/register'>설계자 등록하기</PopupWrapper></Menu.Item> : null}
              <Menu.Item key='board'><Link href='/board'><a>TraB 게시판</a></Link></Menu.Item>
              <Menu.Item key='planner'><PopupWrapper signin email enroll pending callback='/planner/write'>여행계획 판매하기</PopupWrapper></Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

        {/* <Menu
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
        </Menu> */}