import * as React from 'react'
import Link from 'next/link'  
import { Modal, Button, Row, Col } from 'antd'
import '@assets/PopupStyle.less'
import useUser from '@hooks/useUser'

type Props = {
  signin?: boolean
  email?: boolean
  enroll?: boolean
  pending?: boolean
  callback: string
}

const PopupWrapper: React.SFC<Props> = ({signin=false, email=false, enroll=false, pending=false, callback, children})=> {
  
  const [visible, setVisible] = React.useState(false)
  const {user, isLogin} = useUser()

  const handleShow = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const loginCheck = (!isLogin && signin)
  const emailCheck = (user.state_id === 1 && email)
  const enrollCheck = (user.state_id === 2 && enroll)
  const pendingCheck = (user.state_id === 3 && pending)

  if(!loginCheck && !emailCheck && !enrollCheck && !pendingCheck){
    return (
      <Link href={callback}><a className='main-item'>{children}</a></Link>
    )
  } else if (loginCheck) {
    return (
      <>
        <span onClick={handleShow}>{children}</span>
        <Modal
          className='popup'
          visible={visible}
          onCancel={handleCancel}
          closable={false}
          centered
          footer={null}
        >
          <div className='popup-title'><h2>로그인 / 회원가입을 부탁드립니다</h2></div>
          <div className='popup-contents'>
            <p>아이디가 있으시다면 로그인을</p>
            <p>아이디가 없으시다면 회원가입을</p>
            <p>먼저 진행해 주세요.</p>
          </div>
          <Row justify="center" className='popup-action'>
            <Col span={8}><Link href='/auth/signin'><Button className='ok-button'>확인</Button></Link></Col>
            <Col span={8}><Button className='cancel-button' onClick={handleCancel}>취소</Button></Col>
          </Row>
          <p>* 확인 버튼을 누르면 로그인 화면으로 이동합니다.</p>
        </Modal>
      </>
    )
  } else if (emailCheck) {
    return (
      <>
        <span onClick={handleShow}>{children}</span>
        <Modal
          className='popup'
          visible={visible}
          onCancel={handleCancel}
          closable={false}
          centered
          footer={null}
        >
          <div className='popup-title'><h2>이메일 인증을 부탁드립니다.</h2></div>
          <div className='popup-contents'>
            <p>아직 이메일 인증을 받지 않으셨군요.</p>
            <p>이메일 인증이 되어야 활동을 할 수 있습니다.</p>
            <p>이메일 인증을 완료해주세요!</p>
          </div>
          <Row justify="center" className='popup-action'>
            <Col span={8}><Link href='/'><Button className='ok-button'>확인</Button></Link></Col>
            <Col span={8}><Button className='cancel-button' onClick={handleCancel}>취소</Button></Col>
          </Row>
          <p>* 확인 버튼을 누르면 메인 화면으로 이동합니다.</p>
        </Modal>
      </>
    )
  } else if (enrollCheck) {
    return (
      <>
        <span onClick={handleShow}>{children}</span>
        <Modal
          className='popup'
          visible={visible}
          onCancel={handleCancel}
          closable={false}
          centered
          footer={null}
        >
          <div className='popup-title'><h2>계획표 설계자 등록하기</h2></div>
          <div className='popup-contents'>
            <p>아직 계획표 설계자로 등록하지 않으셨군요.</p>
            <p>설계자 등록이 되어야 계획표를 판매 하실 수 있습니다.</p>
            <p>설계자 등록을 완료해주세요!</p>
          </div>
          <Row justify="center" className='popup-action'>
            <Col span={8}><Link href='/designer/register'><Button className='ok-button'>확인</Button></Link></Col>
            <Col span={8}><Button className='cancel-button' onClick={handleCancel}>취소</Button></Col>
          </Row>
          <p>* 확인 버튼을 누르면 설계자 등록 화면으로 이동합니다.</p>
        </Modal>
      </>
    )
  } else {
    return (
      <>
        <span onClick={handleShow}>{children}</span>
        <Modal
          className='popup'
          visible={visible}
          onCancel={handleCancel}
          closable={false}
          centered
          footer={null}
        >
          <div className='popup-title'><h2>설계자 등록 대기중</h2></div>
          <div className='popup-contents'>
            <p>설계자 신청이 완료되었습니다.</p>
            <p>관리자가 설계자 등록을 수락해야 게획표를 쓰실 수 있습니다.</p>
            <p>설계자 등록을 기다려 주세요.</p>
          </div>
          <Row justify="center" className='popup-action'>
            <Col span={8}><Link href='/'><Button className='ok-button'>확인</Button></Link></Col>
            <Col span={8}><Button className='cancel-button' onClick={handleCancel}>취소</Button></Col>
          </Row>
          <p>* 확인 버튼을 누르면 메인 화면으로 이동합니다.</p>
        </Modal>
      </>
    )
  }
}

export default PopupWrapper