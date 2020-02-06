import * as React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import useUser from '@hooks/useUser'
import PopupWrapper from '@components/PopupWrapper'
import '@assets/Navbar.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Menu, Button, Row, Col } from 'antd'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const Navbar: React.SFC = () => {

  const {user, isLogin, onLogout} = useUser()
  const [visible, setVisible] = React.useState(false)
  
  const handleLogout = () => {
    onLogout()
    sessionStorage.removeItem('usertoken')
    localStorage.removeItem('usertoken')
    Router.push(baseUrl +'/api/auth/signout')
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
                  <Link href='/auth/signin'><Button onClick={onClose}>로그인</Button></Link>
                  <Link href='/auth/signup'><Button onClick={onClose}>회원가입</Button></Link>
                </div>
              : 
                <div>
                  <div><span>{user.nickname}</span></div>
                  <Row style={{marginTop: 5}}>
                    <Col><Link href='/auth/mypage'><Button>마이페이지</Button></Link></Col>
                    <Col offset={1}><Button onClick={handleLogout}>로그아웃</Button></Col>
                  </Row>
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
                <Menu.Item key='domestic'><Link href='/planner/domestic'><a onClick={onClose}>국내 여행계획</a></Link></Menu.Item>
                <Menu.Item key='foreign'><Link href='/planner/foreign'><a onClick={onClose}>해외 여행계획</a></Link></Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key='designer'><Link href='/designer'><a onClick={onClose}>TraB 설계자</a></Link></Menu.Item>
              { user.state_id !== 4 ? <Menu.Item onClick={onClose} key='designer_register'><PopupWrapper signin email pending callback='/designer/register'>설계자 등록하기</PopupWrapper></Menu.Item> : null}
              <Menu.Item key='board'><Link href='/board'><a onClick={onClose}>TraB 게시판</a></Link></Menu.Item>
              <Menu.Item onClick={onClose} key='planner'><PopupWrapper signin email enroll pending callback='/planner/write'>여행계획 판매하기</PopupWrapper></Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </div>
    </nav>
  )
}

export default Navbar